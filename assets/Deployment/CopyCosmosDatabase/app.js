const CosmosClient = require('@azure/cosmos').CosmosClient;

const config = require('./config');

const HttpStatusCodes = { NOTFOUND: 404 };

const databaseId = config.database.id;

const clientSource = new CosmosClient({ endpoint: config.SourceEndpoint, auth: { masterKey: config.SourcePrimaryKey } });
const clientDest = new CosmosClient({ endpoint: config.DestEndpoint, auth: { masterKey: config.DestPrimaryKey } });

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs


async function readSourceDatabase() {
    const { body: databaseDefinition } = await clientSource.database(databaseId).read();
    console.log(`Reading database: ${databaseId}\n${JSON.stringify(databaseDefinition)}`);
}

async function createDatabaseIfNotExists() {
    const { database } = await clientDest.databases.createIfNotExists({ id: databaseId }, { offerThroughput: 400 });
    console.log(`Created database: ${database.id}`);
}

async function readSourceOffers() {
    const { body: offerList } = await clientSource.offers.readAll().toArray();
    console.log(`Offers: ${JSON.stringify(offerList)}`);
}

async function copyAllContainers() {

    const { result: containerList } = await clientSource.database(databaseId).containers.readAll().toArray();
    for (const container of containerList) {

        await copyContainerSchema (container.id, container.id);

        // await clientDest.database(databaseId).containers.createIfNotExists(container);
        // console.log("Created container: " + JSON.stringify(container.id));

        // var srcCollection = clientSource.database(databaseId).container(container.id);
        // var destCollection = clientDest.database(databaseId).container(container.id);

        // const {result: triggerList} = await srcCollection.triggers.readAll().toArray();
        // for (const trigger of triggerList) {
        //     console.log("Creating trigger: " + JSON.stringify(trigger.id));
        //     destCollection.triggers.create(trigger);
        // }

        // const {result: storedProcList} = await srcCollection.storedProcedures.readAll().toArray();
        // for (const storedProc of storedProcList) {
        //     console.log("Creating stored proc: " + JSON.stringify(storedProc.id));
        //     destCollection.storedProcedures.create(storedProc).catch((error) => {console.log(`Error creating stored proc: ${JSON.stringify(error.message)}`)});
        // }

        // const {result: udfList} = await srcCollection.userDefinedFunctions.readAll().toArray();
        // udfList.forEach(function(udf) {
        //     console.log("Creating udf: " + JSON.stringify(udf.id));
        //     destCollection.userDefinedFunctions.create(udf);
        // });

    }
    
}


async function copyContainerSchema (srcContainerId, destContainerId){
    const { body: containerDef } = await clientSource.database(databaseId).container(srcContainerId).read();

    containerDef.id = destContainerId;
    await clientDest.database(databaseId).containers.createIfNotExists(containerDef);
    console.log("Created container: " + JSON.stringify(containerDef.id));

    var srcCollection = clientSource.database(databaseId).container(srcContainerId);
    var destCollection = clientDest.database(databaseId).container(destContainerId);

    const {result: triggerList} = await srcCollection.triggers.readAll().toArray();
    for (const trigger of triggerList) {
        console.log("Creating trigger: " + JSON.stringify(trigger.id));
        destCollection.triggers.create(trigger);
    }

    const {result: storedProcList} = await srcCollection.storedProcedures.readAll().toArray();
    for (const storedProc of storedProcList) {
        console.log("Creating stored proc: " + JSON.stringify(storedProc.id));
        destCollection.storedProcedures.create(storedProc).catch((error) => {console.log(`Error creating stored proc: ${JSON.stringify(error.message)}`)});
    }

    const {result: udfList} = await srcCollection.userDefinedFunctions.readAll().toArray();
    udfList.forEach(function(udf) {
        console.log("Creating udf: " + JSON.stringify(udf.id));
        destCollection.userDefinedFunctions.create(udf);
    });
}

// TODO: Add unique keys and indexes to copy functions
// TODO: Copy and restore items (data)
// TODO: Offers?
    // What else

/**
 * Exit the app with a prompt
 * @param {message} message - The message to display
 */
function exit(message) {
    console.log(message);
}

// readSourceOffers()
// .then(() => { exit(`Completed successfully`); })
// .catch((error) => { exit(`Completed with error ${JSON.stringify(error)}`) });


// copyContainerSchema('BatchAggregateBackup', 'BatchAggregate')
// .then(() => { exit(`Completed successfully`); })
// .catch((error) => { exit(`Completed with error ${JSON.stringify(error.message)} \n${JSON.stringify(error.stack)}`) });


readSourceDatabase()
   .then(() => createDatabaseIfNotExists())
   .then(() => copyAllContainers())
   .then(() => { exit(`Completed successfully`); })
   .catch((error) => { exit(`Completed with error ${JSON.stringify(error.message)} \n${JSON.stringify(error.stack)}`) });