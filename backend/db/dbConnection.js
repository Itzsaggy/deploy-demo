const mongoose = require('mongoose');
const connectDB = async() =>{
    try{
        await mongoose.connect('mongodb://localhost:27017/mydatabase');
        console.log('Connected to Mong0Db')
    }
    catch(error){
        console.log(error)
    }  
}

module.exports = connectDB;