import Product from "../models/Products.js";

export const saveProduct = async (req, res) => {
    const {name, description, price, isCart} = req.body;

    console.log("request body =======>>>", name);
    

    if(!name) {
        return res.status(400).json({error: "name is required"});
    }

    if(!description){
        return res.status(400).json({erroe: " description is required"});
    }
    if(!price){
        return res.status(400).json({erroe: " Proice is required"});
    }

    console.log("execute the function line 20");
    
    try {
        const dataList = [
            name, 
            price,
            description,
            isCart
        ]

        const saveProductData =  new Product({ name, price, description,isCart});
        await saveProductData.save();
    
        return res.status(200).json({products: saveProductData}) 
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }

}

export const getProdustcs = async (req, res) => {
    try {
        const products = await Product.find();
        const dataList = [];

        // products.forEach(doc => {
        //     dataList.push(doc.data());
        // });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Products", error });
    }
}

export const deleteProduct = async(req, res) => {

    const { productId } = req.body;

    try {
        // Find and delete the product 
        const deletedProduct = await Product.findOneAndDelete({ id: productId });
    
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
    
        res.status(200).json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
    
}

export const addProduct = async (req, res) => {
    const { productId, isCart } = req.body;

    try {
        console.log("body ============>>>", req.body);

        if (!productId || typeof isCart !== "boolean") {
            throw new Error("Invalid data");
        }
        const product = await Product.findOne({ _id: productId });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.isCart = isCart;

        // Save the updated product
        await product.save();

        res.status(200).json({
            message: "Product updated successfully",
            data: product,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error updating product",
            error: error.message,
        });
    }
};

// export const addProduct =async(req, res) => {
//     const { productId, isProductCart} = req.body;

//     try {
//         console.log("body ============>>>", req.body)

//         if (!productId) {
//             throw new Error('Invalid data');
//         }
//         res.status(200).json({ message: 'product added cart successfully', data: parsedTable });
//     } catch (error) {
//         res.status(400).json({ message: 'Error adding product', error: error.message });
//     }
// }

export const orderProduct =async(req, res) => {

}
