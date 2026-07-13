const express = require("express"); 
const router = express.Router();
const loginController = require("../controllers/loginControllers");
const verificarToken = require("../middlewares/authMiddleware"); // Importamos al guardia

// Rutas públicas
router.post("/register", loginController.register);
router.post("/login", loginController.login);

// Rutas protegidas
router.get("/perfil", verificarToken, (req, res) => {
    res.json({ 
        message: "¡Bienvenido a la zona protegida!", 
        usuarioId: req.user.id 
    });
});

router.get("/users", verificarToken, loginController.getUsers);
router.post("/create", verificarToken, loginController.createUser);
router.delete("/delete/:id", verificarToken, loginController.deleteUser);

module.exports = router;