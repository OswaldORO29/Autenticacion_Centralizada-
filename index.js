require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require('./src/config/database');


connectDB();

app.listen(PORT, () => {
	console.log('Hello World');
	console.log(`Server listening on port ${PORT}`);
});

