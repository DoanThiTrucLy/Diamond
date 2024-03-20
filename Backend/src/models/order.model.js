import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    contentDiamond: [{
        itemId: {type: mongoose.Schema.Types.ObjectId, ref: 'Diamond'},
        quantity: {type: Number, required: true}
    }],
    contentProduct: [{
        itemId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        quantity: {type: Number, required: true}
    }],
    dateOrder: {type: Date, default: Date.now},
    isShipped: {type: Boolean, default: false}
}, { collection: 'order' });

const Order = mongoose.model('Order', orderSchema);
export default Order;