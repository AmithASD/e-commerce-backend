import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    isCart: { type: Boolean },
});

const Product = mongoose.model("Product", ProductSchema);
export default Product
