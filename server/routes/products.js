const express = require('express');
const router = express.Router();
const { Products } = require('../models');


// POST /products - Create a new product
router.post("/", async (req, res) => {
  const { name, description, brand, category, price } = req.body;

  try {
    // Check if the product already exists
    const existingProduct = await Products.findOne({ where: { name: name } });

    if (existingProduct) {
      return res.status(400).json({ error: "Product already exists" });
    }

    // Create a new product
    const newProduct = await Products.create({
      name,
      description,
      brand,
      category,
      price,
    });

    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /products - Retrieve all products
router.get("/", async (req, res) => {
  try {
    const products = await Products.findAll();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/byID/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Products.findByPk(id); 

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});






module.exports = router;