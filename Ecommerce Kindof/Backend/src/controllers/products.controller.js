import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Products } from "../models/products.model.js";
import fs, { unlink } from "fs/promises"

const allProducts = asyncHandler(async (req, res) => {
    const products = await Products.find()

    if(!products){
        return res.status(200).json(new ApiResponse(200, "", "There are no products"))
    }
    
    return res.status(200).json(new ApiResponse(200, products, "All products successfully fetched!"))
})

const addProduct = asyncHandler(async (req, res) => {
    const {name, description, price, quantity} = req.body
    const imagePath = req.file?.path

    if(!imagePath){
        throw new ApiError(400, "The image was not recieved")
    }

    const product = await Products.create({
        name, 
        description,
        price,
        quantity,
        imagePath
    })

    if(!product){
        throw new ApiError(500, "Product couldn't be created.")
    }

    return res.status(200).json( new ApiResponse(200, product, "The product was created successfully!"))
})

const removeProduct = asyncHandler(async (req, res) => {
    const productId = req.params.productId

    const product = await Products.findById(productId)
    
        if(!product){
            throw new ApiError(400, "The product doesnt exit")
        }

    await fs.unlink(product.imagePath)

    await Products.findByIdAndDelete(productId)

    return res.status(200).json(new ApiResponse(200, product, "The product was deleted successfully"))

})

export {
    allProducts,
    addProduct,
    removeProduct
}