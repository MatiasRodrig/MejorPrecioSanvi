import Supermarket from "../models/supermarket.model.js";

export const createSupermarket = async (req, res) => {
    const { nameSupermarket, address } = req.body;
    try {
        const supermarket = await Supermarket.create({ nameSupermarket, address });
        res.status(201).json(supermarket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getSupermarkets = async (req, res) => {
    try {
        const supermarkets = await Supermarket.findAll();
        res.json(supermarkets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getSupermarketById = async (req, res) => {
    const { id } = req.params;
    try {
        const supermarket = await Supermarket.findByPk(id);
        res.json(supermarket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateSupermarket = async (req, res) => {
    const { id } = req.params;
    const { nameSupermarket, address } = req.body;
    try {
        const supermarket = await Supermarket.update({ nameSupermarket, address }, { where: { id } });
        res.json(supermarket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteSupermarket = async (req, res) => {
    const { id } = req.params;
    try {
        await Supermarket.destroy({ where: { id } });
        res.status(500).json({ message: error.message });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

