const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const productRoutes = require('./routes/productRoutes');
app.use('/api', productRoutes);

const start = async () => {
    try {
        //... Connect to the MongoDB database
        await mongoose.connect('mongodb://localhost:27017/products')

        //... Start the Express server on the specified port
        app.listen(PORT, () => {
            console.log(`Application backend is listening on port ${PORT}`)
        })
    } catch (error) {
        //... Log any errors that occur during startup and exit the process
        console.error(error)
        process.exit(1)
    }

}

start()