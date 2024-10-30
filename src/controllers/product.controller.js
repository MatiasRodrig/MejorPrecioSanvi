import Product from "../models/products.model.js";
import Supermarket from "../models/supermarket.model.js";
import { highlightPrice, deleteFeatured } from '../middlewares/updateFeaturedPrices.js';
import Categories from "../models/categories.model.js";
import FeaturedPrices from "../models/featuredPrices.model.js";


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
            SupermarketId: supermarketInstance.id,
            categoryId
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

// controllers/product.controller.js

export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                { model: Supermarket, as: 'Supermarket', attributes: ['id', 'name'] },
                { model: Categories, as: 'Category' },
                { model: FeaturedPrices, as: 'FeaturedPrice' }
            ],
            distinct: true // Evita duplicados en la consulta
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Otras funciones del controlador...

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id, {
            include: [
                { model: Supermarket, as: 'Supermarket' },
                { model: Categories, as: 'Category' },
                { model: FeaturedPrices, as: 'FeaturedPrice' } // Incluye FeaturedPrices aquí también
            ]
        });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};;

export const getProductsByCategory = async (req, res) => {
    try {
        const categoryName = req.params.categoryName;
        const category = await Categories.findOne({
            where: { name: categoryName },
            include: [{ model: Product, as: 'Products', include: [{ model: Supermarket, as: 'Supermarket' }] }]
        });

        if (category) {
            res.status(200).json(category.Products);
        } else {
            res.status(404).json({ message: "Categoría no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

export const getProductsBySupermarket = async (req, res) => {
    try {
        const supermarketId = req.params.supermarketId; // Cambia esto para usar el id
        const supermarket = await Supermarket.findByPk(supermarketId, {
            include: [{ model: Product, as: 'Products', include: [{ model: Categories, as: 'Category' }, {model: Supermarket, as: 'Supermarket'}] }]
        });

        if (supermarket) {
            res.status(200).json(supermarket.Products);
        } else {
            res.status(404).json("Supermercado no encontrado");
        }
    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error', error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, supermarket, featured, categoryId } = req.body;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        // Verifica si existe el supermercado y la categoría
        const supermarketInstance = await Supermarket.findByPk(supermarket.id);
        if (!supermarketInstance) {
            return res.status(404).json({ message: "Supermercado no encontrado" });
        }

        const category = await Categories.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        // Actualiza el producto
        await product.update({
            name,
            description,
            price,
            SupermarketId: supermarketInstance.id,
            categoryId
        });

        // Maneja si el producto es destacado o no
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
