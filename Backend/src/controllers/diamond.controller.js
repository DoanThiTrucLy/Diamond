import Diamond from '../models/diamond.model.js';

// [POST] /diamond/create
const createDiamond = async (req, res) => {
    const { name, size, color, clarity, cut, price, image } = req.body;
    try {
        const diamond = await Diamond.create({
            name,
            size,
            color, clarity, cut, price, image
        });
        return res.status(201).json(diamond);
    } catch {
        return res.status(500).json('Something wrong');
    }

}

// [GET] /diamond
const getDiamonds = async (req, res) => {
    try {
        const diamonds = await Diamond.find();
        return res.status(200).json(diamonds);
    } catch {
        return res.status(500).json('Something wrong');
    }
}

// [DELETE] /diamond/delete/:id
const deleteDiamond = async (req, res) => {
    try {
        const diamond = await Diamond.findOneAndDelete({
            _id: req.params.id
        });
        return res.status(200).json(diamond);
    } catch {
        return res.status(500).json('Something wrong');
    }
}

//[PUT] /diamond/:id
const updateDiamond = async (req, res) => {
    const { name, size, color, clarity, cut, price, image } = req.body;
    try {
        const diamond = await Diamond.findOneAndUpdate({
            _id: req.params.id
        }, { name, size, color, clarity, cut, price, image }, { new: true });

        return res.status(200).json(diamond);
    } catch {
        return res.status(500).json('Something wrong');
    }
}

// [GET] /diamond/show/:id
const showDetail = async (req, res) => {
    try {
        const diamond = await Diamond.findById(req.params.id);
        return res.status(200).json(diamond);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export default {
    createDiamond,
    getDiamonds,
    deleteDiamond,
    updateDiamond,
    showDetail
};
