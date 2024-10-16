import Product from "../models/products.model.js";
import Supermarket from "../models/supermarket.model.js";
import { highlightPrice, deleteFeatured } from '../middlewares/updateFeaturedPrices.js';
import Categories from "../models/categories.model.js";

export const createProduct = async (req, res) => {
    const { name, description, price, supermarket, featured, categoryId } = req.body;
    try {
        // Supermarket
        let supermarketInstance;
        if (supermarket.id) {
            supermarketInstance = await Supermarket.findByPk(supermarket.id);
            if (!supermarketInstance) {
                return res.status(404).json({ message: "Supermercado no encontrado" });
            }
        } else {
            supermarketInstance = await Supermarket.create({
                name: supermarket.name,
                address: supermarket.address
            });
        }

        // Category
        const category = await Categories.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        // Product creation
        const newProduct = await Product.create({
            name,
            description,
            price,
            SupermarketId: supermarketInstance.id
        });

        // Featured
        if (featured) {
            await highlightPrice(newProduct.id);
        }
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductsByCategory = async (req, res) => {
    try {
        const categoryName = req.params.categoryName;
        const category = await Categories.findOne({
            where: { name: categoryName },
            include: [{ model: Product, as: 'products' }]
        });

        if (category) {
            res.status(200).json(category.products);
        } else {
            res.status(404).json("Category not found");
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

export const getProductsBySupermarket = async (req, res) => {
    try {
        const supermarketName = req.params.supermarketName;
        const supermarket = await Supermarket.findOne({
            where: { name: supermarketName },
            include: [{ model: Product, as: 'products' }]
        });

        if (supermarket) {
            res.status(200).json(supermarket.products);
        } else {
            res.status(404).json("Supermarket not found");
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, Supermarket, featured, category } = req.body;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        await product.update({ name, description, price, Supermarket, featured, category });

        if (featured) {
            await highlightPrice(product.id);
        } else {
            await deleteFeatured(product.id);
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.destroy({ where: { id } });
        res.status(204).json({ message: "Producto eliminado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
