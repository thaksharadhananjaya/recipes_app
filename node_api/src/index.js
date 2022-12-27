const express = require('express');
const app = express();
const mongoose = require("mongoose");
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
require("dotenv/config");

const authRoute = require("./routers/auth_route");
const recipeRoute = require('./routers/recipe_router');

try {
    //connect mongo db
    mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.zzy6ea2.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Database connected !");
        });
} catch (error) {
    console.log(error);
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public/uploads')))
app.use(helmet());
app.use(morgan('tiny'));


app.use("/api/v1/", authRoute);
app.use("/api/v1/", recipeRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});