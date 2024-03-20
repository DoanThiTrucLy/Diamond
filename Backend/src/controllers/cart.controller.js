import Cart from "../models/cart.model.js";

//[PUT] /cart/add
const addCart = async (req, res) => {
    const { idItem, idCustomer, category, quantity } = req.body;
    try {
        const carts = await Cart.findOne({userID: idCustomer});
        const product = {
            item: idItem,
            quantity
        }
        if(category === 1) {
            carts.cartDiamond.push(product);
        } else {
            carts.cartProduct.push(product);
        }
        await carts.save();
        return res.status(200).json('add item to cart successfully');
    } catch (error) {
        return res.status(500).json(error);
    }
}

// [DELETE] /cart/:idUser/:idItem
const deleteItemInCart = async (req, res) => {
    try {
        const carts = await Cart.findOne({userID: req.params.idUser});
        const indexToRemove = carts.cartDiamond.findIndex(obj => obj._id.toString() == req.params.idItem.toString());
        if(indexToRemove === -1) {
            const idxRemove = carts.cartProduct.findIndex(product => product._id.toString() == req.params.idItem.toString());
            
            console.log(idxRemove);
            if(idxRemove !== -1) {
                carts.cartProduct.splice(idxRemove, 1);
            }
        } else {
            carts.cartDiamond.splice(indexToRemove, 1);
        }
        await carts.save();
        return res.status(200).json('item deleted successfully');
    } catch {
        return res.status(500).json('Something wrong');
    }
}

export default {addCart, deleteItemInCart};