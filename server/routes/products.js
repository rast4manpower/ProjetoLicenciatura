const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Products } = require('../models');
const path = require('path')

router.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/uploads/'); // Specify the upload directory
  },
  filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
  }
})

const upload = multer({ storage: storage })

// POST /products - Create a new product
router.post("/", async (req, res) => {

  console.log('start---------------')
  const { name, description, category, brand, price, address, sellerId, sellerName } = req.body;

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
      category,
      brand,
      price,
      address,
      sellerId,
      sellerName,
    });

    res.json({ id: newProduct.id});

    } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/image/:id", upload.single('image'), async (req, res) => {

  const productId = req.params.id;
  const image = req.file

  if (!image) {
    return res.status(400).json({ success: false, message: 'No image file uploaded' });
  }

  try {
    const product = await Products.findByPk(productId);

    if (product) {
      product.image = image.path;
      await product.save();
      res.json(null);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }

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
    const parsedProducts = products.map((product)=> ({
      ...product.dataValues,
        image: product.image ? `${req.protocol}://${req.get('host')}/uploads/${path.basename(product.image)}` : null
    }))

    res.json(parsedProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;