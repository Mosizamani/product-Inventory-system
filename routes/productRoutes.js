const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

// Create a new product
router.post('/products', async (req, res) => {
  const { name, description, price, category, stockQuantity } = req.body
  try {
    const newProduct = new Product({ name, description, price, category, stockQuantity })
    await newProduct.save()
    res.status(201).json(newProduct)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get all products - sort and filter by category
router.get('/products', async (req, res) => {
  try {
    const { category, priceSort } = req.query;
    let filter = {};
    if (category) filter.category = category;

    let products = await Product.find(filter);
    if (priceSort) products = products.sort((a, b) => priceSort === 'asc' ? a.price - b.price : b.price - a.price);

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Update a product
router.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedProduct)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Delete a product
router.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router