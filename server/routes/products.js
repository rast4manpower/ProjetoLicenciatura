const express = require('express');
const router = express.Router();
const { Products } = require('../models');


// POST /products - Create a new product
router.post("/", async (req, res) => {

  console.log('start---------------')
  const { name, image, description, category, brand, price, address, sellerId, sellerName } = req.body;

  try {
    // Check if the product already exists
    const existingProduct = await Products.findOne({ where: { name: name } });

    if (existingProduct) {
      return res.status(400).json({ error: "Product already exists" });
    }

    // Create a new product
    await Products.create({
      name,
      image,
      description,
      category,
      brand,
      price,
      address,
      sellerId,
      sellerName,
    });

    res.status(201).json(null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/", async (req, res) => {
  try {
    const products = await Products.findAll();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/sellerId/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const products = await Products.findAll({ where: { sellerId: id } }); 

    if (!products) {
      return  res.json([]);
    }

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});






module.exports = router;