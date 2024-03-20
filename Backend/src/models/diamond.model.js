import mongoose from "mongoose";

const diamondSchema = mongoose.Schema({
    name: {type: String, required: true},
    size: {type: String, required: true},
    color: {type: String, required: true},
    clarity: {type: String, required: true},
    cut: {type: String, required: true},
    price: {type: Number, required: true},
    image: [{
        public_id: {type: String},
        url:{type: String},
    }]
}, {collection: 'diamond'});

const Dianmond = mongoose.model('Diamond', diamondSchema);
export default Dianmond;
