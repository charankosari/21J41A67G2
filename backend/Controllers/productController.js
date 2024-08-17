const Product = require('../model/Products');

//create products
exports.CreateProducts = async (req, res) => {
    try {
        const data = req.body;
        const product = new Product({
            productName: data.productName,
            description: data.description,
            category: data.category,
            company: data.company,
            price: data.price,
            rating: data.rating,
            discount: data.discount
        });

        await product.save();
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create product",
            error: error.message
        });
    }
}

//get top products
exports.getTopProducts = async (req, res) => {
    try {
        const { categoryname } = req.params;
        const { n = 10, page = 1, sort_by = 'rating', order = 'desc' } = req.query;

        const products = await Product.find({ category: categoryname })
            .sort({ [sort_by]: order === 'asc' ? 1 : -1 })
            .limit(parseInt(n))
            .skip((parseInt(page) - 1) * parseInt(n));

        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// get specific product
exports.getProductById = async (req, res) => {
    try {
        const { productid } = req.params;
        const product = await Product.findById(productid);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
