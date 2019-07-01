# Introduction 
Contains items specific to the Cosmos data store

# Description

# Deployment
Containes the node js script to copy the database schema from a source connection to a destination.
Select the correct source and destination in the config.js. 
Run app.js
This is a non-destructive copy. Only non-existing items will get created. If want to replace an item, delete it in the destination first.

#Schema
Contains only the stored procedure schemas for now. The rest of the items will get generated from a source in the future.




