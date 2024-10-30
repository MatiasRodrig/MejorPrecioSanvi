import Product from "../models/products.model.js";
import FeaturedPrices from "../models/featuredPrices.model.js";

// middlewares/updateFeaturedPrices.js

export const highlightPrice = async (productId) => {
    const existingFeaturedPrice = await FeaturedPrices.findOne({ where: { ProductId: productId } });

    if (existingFeaturedPrice) {
        // Si ya existe, actualiza el registro existente
        await existingFeaturedPrice.update({ featured: true });
    } else {
        // Si no existe, crea uno nuevo
        await FeaturedPrices.create({
            ProductId: productId,
            featured: true
        });
    }
};

export const deleteFeatured = async (productId) => {
    const existingFeaturedPrice = await FeaturedPrices.findOne({ where: { ProductId: productId } });
    if (existingFeaturedPrice) {
        // Marca como no destacado o elimina el registro
        await existingFeaturedPrice.update({ featured: false });
    }
};

export async function getPriceFeatured() {
    const featuredProducts = await Product.findAll({
        include: [{
            model: FeaturedPrices,
            as: 'FeaturedPrice',
            where: { featured: true }
        }]
    })
}