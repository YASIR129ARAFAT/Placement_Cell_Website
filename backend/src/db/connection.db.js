const mongoose = require('mongoose');

async function dbConnection() {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/placement_cell');
        console.log('database connected...')
    }
    catch (err) {
        console.log("db connection failed", err);
    }
}

exports.dbConnection = dbConnection;

