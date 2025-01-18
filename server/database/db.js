const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()


const mongoDBURL = process.env.MONGODB_URI

const initializeDatabase = async () => {
    try{
        const connection = mongoose.connect(mongoDBURL)
        if(connection){
            console.log("Connected to the database successfully!")
        }
    }catch(error){
        console.log("Can't connect to the database", error)
    }
}

module.exports = {initializeDatabase}