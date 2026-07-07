const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/user");

// --- REGISTRO (Para guardar usuarios con contraseña encriptada) ---
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email y contraseña son requeridos" });
        }

        const usuarioExistente = await User.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Encriptación
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const nuevoUsuario = new User({
            email,
            password: hashedPassword
        });

        await nuevoUsuario.save();

        res.status(201).json({ message: "Usuario creado exitosamente. ¡Ya puedes hacer Login!" });

    } catch (error) {
        console.error("Error en registro:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// --- LOGIN (Para generar el Token JWT) ---
exports.login = async (req, res) => { 
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email y contraseña son requeridos" });
        }

        const usuario = await User.findOne({ email });
        
        if (!usuario) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const isMatch = await bcrypt.compare(password, usuario.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        // Generación de Token con expiración de 15 minutos
        const token = jwt.sign(
            { id: usuario._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '15m' } 
        );

        res.json({ token });

    } catch (error) {
        console.error("Error en login:", error); 
        res.status(500).json({ message: "Error interno del servidor" });
    }
};