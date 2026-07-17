// middlewares/appTokenMiddleware.js
const jwt = require('jsonwebtoken');

const verificarAppToken = (req, res, next) => {
    // Buscar el token exactamente en el header "app-token"
    const appToken = req.header('app-token');

    // Retornar 401 si no existe
    if (!appToken) {
        return res.status(401).json({ 
            message: "Acceso denegado. Falta el app-token en los headers." 
        });
    }

    try {
        // Verificar que el token sea válido usando nuestra llave secreta
        jwt.verify(appToken, process.env.APP_TOKEN_SECRET);
        
        // Si todo está correcto, permite que la petición continúe
        next(); 
    } catch (error) {
        // Retornar 401 si el token es incorrecto o alterado
        return res.status(401).json({ 
            message: "Acceso denegado. El app-token es incorrecto." 
        });
    }
};

module.exports = verificarAppToken;