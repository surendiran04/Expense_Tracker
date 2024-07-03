const mongoose = require("mongoose");
require('dotenv').config();
async function initiateDBConnection() {
    try{
      const response= await mongoose.connect(`${process.env.DB_URL}`)
      if (response.connections.length > 0) {
        console.log("Database connection successful!");
      }
    }
    catch(error){
      console.error("Error connecting to Database", error);
    };
  }
  
  module.exports = {
    initiateDBConnection,
  }