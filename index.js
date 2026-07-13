require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require('./src/config/database');
const loginRoutes = require('./src/routes/login');

// Inicializar conexión a MongoDB
connectDB();

// Middleware CRÍTICO: Permite leer req.body en formato JSON
app.use(express.json()); 

// Montar las rutas
app.use('/api/auth', loginRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'API de autenticación activa',
        endpoints: [
            'POST /api/auth/register',
            'POST /api/auth/login',
            'GET /api/auth/users',
            'POST /api/auth/create',
            'DELETE /api/auth/delete/:id'
        ]
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});