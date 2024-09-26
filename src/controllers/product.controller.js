import Product from "../models/products.model.js";
import Supermarket from "../models/supermarket.model.js";

export const createProduct = async (req, res) => {
    const { name, description, price, supermarket, imageUrl } = req.body;
    try {
        let supermarketInstance;
        if (supermarket.id) {
            supermarketInstance = await Supermarket.findByPk(supermarket.id);
            if (!supermarketInstance) {
                return res.status(404).json({ message: "Supermercado no encontrado" });
            }
        } else {
            supermarketInstance = await Supermarket.create({
                name: supermarket.nameSupermarket,
                address: supermarket.address
            });
        }

        const newProduct = await Product.create({
            name,
            description,
            price,
            SupermarketId: supermarketInstance.id,
            imageUrl
        });

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, Supermarket } = req.body;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        await product.update({ name, description, price, Supermarket });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.destroy({ where: { id } });
        res.status(204).json({ message: "Producto eliminado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

