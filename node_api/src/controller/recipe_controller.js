const RecipeModel = require('../models/recipe_model');
require("dotenv/config");
exports.addRecipe = async (req, res) => {

    const { name, ingredients, description } = req.body;
    if (req.file) { 
        var file = `http://localhost:${process.env.PORT}/images/uploads/${req.file.filename}`; 
    }else{
        return res.status(400).json({ message: 'Require image!' });
    }
    console.log(file);

    try {
        const recipeModel = new RecipeModel({
            name,
            ingredient: ingredients,
            image: file,
            description
        });

        const recipe = await recipeModel.save();
        if (recipe)
            return res.status(201).json({ message: 'Recipe added successful !' });

        return res.status(500).json({ message: 'Something went to wrong' });
    } catch (error) {
       
        return res.status(500).json(error);
    }
}

exports.updateRecipe = async (req, res) => {

    const { name, ingredients, description } = req.body;
    if (req.file)
        var file = `http://localhost:${process.env.PORT}/images/uploads/${req.file.filename}`;

    try {
        const recipeModel = RecipeModel({
            name,
            ingredient: ingredients,
            image: file,
            description
        });
        if (await RecipeModel.findByIdAndUpdate(req.params.id, {
            name: recipeModel.name,
            ingredient: recipeModel.ingredient,
            image: recipeModel.image,
            description: recipeModel.description
        }))
            return res.status(200).json({ message: 'Update successful!' });

        return res.status(400).json({ message: 'Invalid recipe ID!' });
    } catch (error) {
        if (error.kind == 'ObjectId')
            return res.status(400).json({ message: 'Invalid recipe ID!' });

        return res.status(500).json({ message: 'Something went to wrong' });
    }
}

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await RecipeModel.find().select('-__v');
        if (recipes && recipes.length > 0) {
            return res.status(200).json(recipes);
        }
        return res.status(404).json({ message: 'Recipes not found!' });
    } catch (error) {
        return res.status(500).json({ message: 'Something want to wrong!' });
    }
}

exports.getRecipeByID = async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.params.id).select('-__v');
        if (recipe)
            return res.status(200).json(recipe);

        return res.status(400).json({ message: 'Invalid recipe ID!' });
    } catch (error) {
        if (error.kind == 'ObjectId')
            return res.status(400).json({ message: 'Invalid recipe ID!' });

        return res.status(500).json({ message: 'Something want to wrong!' });
    }
}



exports.deleteRecipeByID = async (req, res) => {

    try {
        if (await RecipeModel.findByIdAndDelete(req.params.id))
            return res.status(200).json({
                message: 'Delete successful!'
            });
        return res.status(400).json({ message: 'Invalid recipe ID!' });

    } catch (error) {
        if (error.kind == 'ObjectId')
            return res.status(400).json({ message: 'Invalid recipe ID!' });

        return res.status(500).json({ message: 'Something want to wrong!' });
    }
}


