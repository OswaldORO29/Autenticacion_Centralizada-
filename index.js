// 1. Importar dependencias
require('dotenv').config(); // Permite leer el archivo .env
const express = require('express');

// 2. Importar tus módulos locales
const connectDB = require('./src/config/database');// Conexión a MongoDB
const verificarAppToken = require('./src/middlewares/appTokenMiddleware'); // Middleware global
const loginRoutes = require('./src/routes/login'); // Rutas de autenticación y usuarios

// 3. Inicializar la aplicación Express
const app = express();

// 4. Conectar a la base de datos
connectDB();

// 5. Middlewares de configuración general
app.use(express.json()); // Fundamental para poder leer req.body en formato JSON

// 6. Middleware Global del App-Token
// Al ponerlo aquí, ABSOLUTAMENTE TODAS las rutas definidas debajo exigirán el "app-token" en los headers
app.use(verificarAppToken);

// 7. Definir las Rutas
// Todas las rutas dentro de loginRoutes estarán bajo el prefijo '/api'
app.use('/api', loginRoutes);

// 8. Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});