const { Timestamp } = require("mongodb");

const usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }},
    {
    timestamps: true 
    }
);