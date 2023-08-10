const mongoose = require("mongoose");
const constants = require("./constants");
const environment = require("./environment");

const DB = environment.database.uri;

const connection = mongoose.connection;

const connect = () => {
    mongoose.connect(DB, constants.database.options);
}

connection.on("connected", () => {
    console.log("%s Database Connected", '✔');
})
    .on("disconnected", () => {
        console.log("%s Database Disconnected", '✗');
    })
    .on("error", (err) => {
        console.error(err);
        console.log("%s MongoDB connection error. Please make sure MongoDB is running.", '✗');
        process.exit();
    });

process.on("SIGINT", () => {
    connection.close(() => {
        console.log("%s Mongoose default connection is disconnected due to application termination.", '✗');
        process.exit(0);
    })
});

module.exports = { connect }