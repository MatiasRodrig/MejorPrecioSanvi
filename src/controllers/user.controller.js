import User  from "../models/users.model.js";


export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password, phoneNumber } = req.body;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        await user.update({ username, email, password, phoneNumber });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        await user.destroy();
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
