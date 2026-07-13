const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/user");

const crearUsuario = async (email, password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nuevoUsuario = new User({
        email,
        password: hashedPassword
    });

    await nuevoUsuario.save();
    return nuevoUsuario;
};

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

        const nuevoUsuario = await crearUsuario(email, password);

        res.status(201).json({
            message: "Usuario creado exitosamente. ¡Ya puedes hacer Login!",
            usuario: {
                id: nuevoUsuario._id,
                email: nuevoUsuario.email
            }
        });

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

        const token = jwt.sign(
            { id: usuario._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '15m' } 
        );

        res.json({
            message: "Login exitoso",
            token,
            usuario: {
                id: usuario._id,
                email: usuario.email
            }
        });

    } catch (error) {
        console.error("Error en login:", error); 
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// --- LISTAR USUARIOS ---
exports.getUsers = async (req, res) => {
    try {
        const usuarios = await User.find({}, '-password');
        res.json(usuarios);
    } catch (error) {
        console.error("Error al listar usuarios:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// --- CREAR USUARIO DESDE EL SISTEMA ---
exports.createUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email y contraseña son requeridos" });
        }

        const usuarioExistente = await User.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        const nuevoUsuario = await crearUsuario(email, password);

        res.status(201).json({
            message: "Usuario creado correctamente",
            usuario: {
                id: nuevoUsuario._id,
                email: nuevoUsuario.email
            }
        });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// --- ELIMINAR USUARIO ---
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await User.findByIdAndDelete(id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({ message: "Usuario eliminado correctamente", id });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};