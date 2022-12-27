const express = require('express');
const multer = require('multer');
const router = express.Router();
const { signinRequire } = require('../controller/common_middleware/common_middleware');
const { getAllRecipes, getRecipeByID, addRecipe, updateRecipe, deleteRecipeByID } = require('../controller/recipe_controller');


const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/webp': 'webp'
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError;
        if (!isValid) {
            uploadError = new Error('Invalid file type');
        }
        cb(uploadError, 'public/uploads/');
    },
    filename: function (req, file, cb) {
     
        const uniqueSuffix = `${Date.now()}${Math.round(Math.random() * 1E9)}`;
        const extension = FILE_TYPE_MAP[file.mimetype];
        const fileName = file.originalname.trim().split(/\s+/).join('_').split('.')[0].replace('.jpg', '');

        
        cb(null, `${fileName}_${uniqueSuffix}.${extension}`);
    }
});

const upload = multer({ storage });

router.get('/recipes', getAllRecipes);
router.get('/recipe/:id', getRecipeByID);
router.post('/recipe', signinRequire, upload.single('image'), addRecipe);
router.put('/recipe/:id', signinRequire, upload.single('image'), updateRecipe);
router.delete('/recipe/:id', signinRequire, deleteRecipeByID);

module.exports = router;