import Product from "../models/products.model.js";
import FeaturedPrices from "../models/featuredPrices.model.js";

export async function highlightPrice(productId) {
    await FeaturedPrices.upsert({
        ProductId: productId,
        featured: true
    });
}

export async function deleteFeatured(productId) {
    await FeaturedPrices.upsert({
        ProductId: productId,
        featured: false
    });
}

export async function getPriceFeatured() {
    const featuredProducts = await Product.findAll({
        include: [{
            model: FeaturedPrices,
            as: 'FeaturedPrice',
            where: { featured: true }
        }]
    })
}