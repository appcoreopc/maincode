var config = {}

// Source Database **************************************************************************************************


// Local
config.SourceEndpoint = "https://localhost:8081";
config.SourcePrimaryKey = "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";

// Sandbox
//config.SourceEndpoint = "https://sbcacosmosdomesticpayments.documents.azure.com:443/"
//config.SourcePrimaryKey = "fjEDPUILLbUTumRr7k8T72n8WXGUMr7I2jHwe7qZ72sd9p5rRhe5mwyrR8UTjbVk1MKV91jFPdEf5YeLVZirUA==";

// Prod
//config.SourceEndpoint = "https://cosmosdomesticpayments.documents.azure.com:443/"
//config.SourcePrimaryKey = "ByzJoa9Xwoi0omLJ0HyRsEUJrS4ipPMdcDZhRmNQSjvC4r4nHC0FxdQkMqfhpsqAKMMWe7vNq54IobFu7PokGw==";


//Destination Database **********************************************************************************************

// Local
//config.DestEndpoint = "https://localhost:8081";
//config.DestPrimaryKey = "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";

// Sandbox
//  config.DestEndpoint = "https://sbcacosmosdomesticpayments.documents.azure.com:443/"
//  config.DestPrimaryKey = "fjEDPUILLbUTumRr7k8T72n8WXGUMr7I2jHwe7qZ72sd9p5rRhe5mwyrR8UTjbVk1MKV91jFPdEf5YeLVZirUA==";

// dev
// config.DestEndpoint = "https://devcacosmosdomesticpayments.documents.azure.com:443/";
// config.DestPrimaryKey = "yazmTR3bl9b7n75tSJpsFQBChhDbxKCWWbJc89CfUxhOvwlFxa3Hmzd7lS97vemo2hBODA8smWYKkQ7dmUT65g==";

// qa
config.DestEndpoint = "https://qacacosmosdomesticpayments.documents.azure.com:443/";
config.DestPrimaryKey = "a20Y2zhLUO6gwXd4GFOhRe8lGsX4MALOw7YvMHohQwMw5bYS1k7yud0UGyY3g2LORS5FZN9jnsvX9y1K7KsWdQ==";


config.database = {
    "id": "BatchPayment"
 };
 

module.exports = config;