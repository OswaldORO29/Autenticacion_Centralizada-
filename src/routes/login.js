const express = require("express"); 
const router = express.Router();
const loginController = require("../controllers/loginControllers");
const verificarToken = require("../middlewares/authMiddleware"); // Importamos al guardia

// Rutas públicas
router.post("/register", loginController.register);
router.post("/login", loginController.login);

// Ruta protegida
router.get("/perfil", verificarToken, (req, res) => {
    res.json({ 
        message: "¡Bienvenido a la zona protegida!", 
        usuarioId: req.user.id 
    });
});

module.exports = router;