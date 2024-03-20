import Order from '../models/order.model.js';
import OrderList from '../models/orderList.model.js';
import Diamond from '../models/diamond.model.js';
import Product from '../models/product.model.js';


// [POST] /order/new
const newOrder = async (req, res) => {
    const {userID, contentDiamond, contentProduct} = req.body;
    try {
        const order = await Order.create({userID, contentDiamond, contentProduct});
        const orderList = await OrderList.findOne({userID });
        orderList.orders.push(order._id);
        await orderList.save();
        return res.status(201).json(order);
    } catch (error) {
        return res.status(500).json(error);
    }
}
//[GET] / order/list
const allOrder = async (req, res) => {
    try {
        const all = await Order.find(req.params.id).populate('userID');
        for(let i = 0; i < all.length; i++){
            for (let j = 0; j < all[i].contentDiamond.length; j++) {
                const diamond = await Diamond.findById(all[i].contentDiamond[j].itemId);
                console.log();
                all[i].contentDiamond[j].itemId = diamond;
                console.log(all[i].contentDiamond[j].itemId);
            }

            for (let k = 0; k < all[i].contentProduct.length; k++) {
                const product = await Product.findById(all[i].contentProduct[k].itemId);
                all[i].contentProduct[k].itemId = product;
            }
        }
        return res.status(200).json(all);
    } catch (error) {
        return res.status(500).json(error);
    }
    
}

// [DELETE] /order/:idBuyer/:idItem
const removeOrder = async (req, res) => {
    try {
        await Order.deleteOne({_id: req.params.idItem});
        const orderL = await OrderList.findOne({userID: req.params.idBuyer});
        let index = -1;
        for (let i = 0; i < orderL.orders.length; i++) {
            if(orderL.orders[i] == req.params.idItem) {
                index = i;
                break;
            }
        }
        if(index !== -1) {
            orderL.orders.splice(index, 1);
            await orderL.save();
        }
        return res.status(200).json('remove successfully');
    } catch (error) {
        return res.status(500).json(error);
    }
}


export default{
 newOrder,allOrder,
  removeOrder
}