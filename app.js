const express = require("express");
const app = express();
const router = require("./router");

// Parse the request to JSON
// Must be used otherwise the request.body will not work
app.use(express.json());

app.use("/", router);

// Initialize the database
const db = require("./database/connection");
db.sequelize.sync().then(()=>{
    console.log("Database has been initialized successfully");
}).catch(()=>{
    console.log("Fail to initialize the database");
});

// Get the port from environment variable
const PORT = process.env.PORT || 8080;
// Start the server
const server = app.listen(PORT, () => {
    const {address, port} = server.address();
    console.log("Server is starting with http://%s:%s", address, port);
});