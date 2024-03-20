import Product from '../models/product.model.js';

// [POST] /product/create
const createProduct = async (req, res) => {
    const { name, size, material, chief_officer, Additional_pills, price, image } = req.body;
    try {
        const product = await Product.create({
            name,
            size,
            material, chief_officer, Additional_pills, price, image
        });
        console.log("check product: ", product)
        return res.status(201).json(product);
    } catch {
        return res.status(500).json('Something wrong');
    }
}


// [GET] /product/
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json(products);
    } catch {
        return res.status(500).json('Something wrong');
    }
}

// [DELETE] /product/delete/:id
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({
            _id: req.params.id
        });
        return res.status(200).json(product);
    } catch {
        return res.status(500).json('Something wrong');
    }
}

//[PUT] /product/:id
const updateProduct = async (req, res) => {
    const { name, material, chief_officer, Additional_pills, price } = req.body;
    console.log(req.params.id);
    try {
        const product = await Product.findOneAndUpdate({
            _id: req.params.id
        }, { name, material, chief_officer, Additional_pills, price }, { new: true });

        return res.status(200).json(product);
    } catch {
        return res.status(500).json('Something wrong');
    }
}

// [GET] /product/show/:id
const showDetail = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export default {
    createProduct,
    getProducts,
    deleteProduct,
    updateProduct,
    showDetail
};
