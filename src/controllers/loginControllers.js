const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/user"); // Buenas prácticas: Modelos con mayúscula

exports.login = async (req, res) => { 
    try {
        const { email, password } = req.body;

        // 1. Falta validación inicial
        if (!email || !password) {
            return res.status(400).json({ message: "Email y contraseña son requeridos" });
        }

        const usuario = await User.findOne({ email });
        
        // 2. Vulnerabilidad: Enumeración de usuarios (Unificado en un solo error)
        if (!usuario) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const isMatch = await bcrypt.compare(password, usuario.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const token = jwt.sign(
            { id: usuario._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.json({ token });

    } catch (error) {
        // 3. Vulnerabilidad: Exposición de detalles del sistema
        console.error("Error en login:", error); 
        res.status(500).json({ message: "Error interno del servidor" });
    }
};