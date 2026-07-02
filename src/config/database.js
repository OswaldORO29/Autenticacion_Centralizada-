const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        //Connection MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log(' Successful conection to MongoDB ')
    } catch (error) {
        console.error('Error conection MongoDB ', error.message)
        process.exit(1); //Detiene la app
    }
}

module.exports = connectDB;