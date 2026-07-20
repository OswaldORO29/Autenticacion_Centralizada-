// 1. Importar dependencias
require('dotenv').config(); 
const express = require('express');
const helmet = require('helmet'); // <-- 1. IMPORTAMOS HELMET AQUÍ

// 2. Importar tus módulos locales
const connectDB = require('./src/config/database');
const verificarAppToken = require('./src/middlewares/appTokenMiddleware'); 
const loginRoutes = require('./src/routes/login'); 

// 3. Inicializar la aplicación Express
const app = express();

// 4. Conectar a la base de datos
connectDB();

// 5. Middlewares de configuración general
app.use(helmet()); // <-- 2. ACTIVAMOS HELMET AQUÍ (Antes que cualquier otra cosa)
app.use(express.json()); 

// 6. Middleware Global del App-Token
app.use(verificarAppToken);

// 7. Definir las Rutas
app.use('/api', loginRoutes);

// 8. Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});