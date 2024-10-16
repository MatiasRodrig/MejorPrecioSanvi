import Categories from "../models/categories.model.js";

export const createCategory = async (req, res) => {
    const { name } = req.body
    const newCategory = new Categories({ name })

    try {
        const savedCategory = await newCategory.save()
        res.status(201).json(savedCategory)
    } catch (error) {
        res.status(500).json({ message: "Error" })
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await Categories.findAll({
            include: ['products']
        })
        res.json(categories)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getCategoryById = async (req, res) => {
    const { id } = req.params
    try {
        const category = await Categories.findByPk(id, {
            include: ['products']
        })
        res.json(category)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const updateCategoryById = async (req, res) => {
    const { id } = req.params
    try {
        const category = await Categories.findByPk(id)
        if (!category) {
            category.name = req.body.name || category.name
            const updatedCategory = await category.save()
            res.status(200).json(updatedCategory)
        } else {
            res.status(404).json({ message: 'Category not found' })
        }
    } catch (error) {
        res.status(500).json({ message: "Error" })
    }
}

export const deleteCategoryById = async (req, res) => {
    const { id } = req.params

    try {
        const deleted = await Categories.destroy({
            where: { id }
        })

        if (deleted) {
            res.status(204).json({ message: "Deleted" })
        } else {
            res.status(404).json({ message: "Category not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "Error" })
    }
}