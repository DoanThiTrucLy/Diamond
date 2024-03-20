import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {type: String, required: true},
    // size: {type: mongoose.Types.Decimal128, required: true},
    material: {type: String, required: true},
    chief_officer: {type: String, required: true},
    Additional_pills: {type: String, required: true},
    price: {type: Number, required: true},
    image: [{
        public_id: {type: String},
        url:{type: String},
    }]
}, {collection: 'product'});

const Product = mongoose.model('Product', productSchema);
export default Product;
