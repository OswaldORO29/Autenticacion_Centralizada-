// generarAppToken.js
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

// Generamos un token sin expiración (o con una muy larga, ej: '10y')
const appToken = jwt.sign(
    { origin: 'mi_aplicacion_oficial' }, 
    process.env.APP_TOKEN_SECRET
);

console.log("TU APP TOKEN ES:");
console.log(appToken);

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmlnaW4iOiJtaV9hcGxpY2FjaW9uX29maWNpYWwiLCJpYXQiOjE3ODQyMjU3ODJ9.HqJQG7BQvl0uMbk8gdk9-IDV--59exKGQsEEMTOd4z4