import User  from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
    const { username, email, password, phoneNumber } = req.body;
    try {
        const emailExists = await User.findOne({ where: { email } });
        if (emailExists) {
            return res.status(400).json({ message: 'El email ya existe' });
        }
        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ 
            username, 
            lastName, 
            email, 
            password: hashedPassword, 
            phoneNumber 
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        if (!user.password) {
            return res.status(500).json({ message: 'Error en la configuración del usuario' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1d' });
        res.json({ token, user: {
            id: user.id,
            name: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber
        } });
        console.log(token);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

