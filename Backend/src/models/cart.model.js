
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cartDiamond: [{
        item: {type: mongoose.Schema.Types.ObjectId, ref: 'Diamond'},
        quantity: {type: Number, required: true}
    }],
    cartProduct: [{
        item: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        quantity: {type: Number, required: true},
    }]
}, { collection: 'cart' });

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;