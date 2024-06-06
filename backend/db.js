const mongoose = require('mongoose'); 
 
const mongoURI = "mongodb://localhost:27017/"; 
 
const connectToMongo = () => { 
    return mongoose.connect(mongoURI) 
        .then(() => { 
            console.log("Connected to mongo successfully!"); 
        }) 
        .catch((err) => { 
            console.error("Error connecting to mongo:", err); 
        }); 
}; 
 
module.exports = connectToMongo;