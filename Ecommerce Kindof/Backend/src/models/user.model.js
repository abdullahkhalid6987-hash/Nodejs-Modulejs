import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Products } from "./products.model.js";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    userType: {
        type:String,
        enum: ["user", "admin"],
        default: "user"
    },
    order: [
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    }
  }
]
    ,
    refreshToken: String,
  },
  { timestamps: true },
);

//This is to hash the password only if it was updated to avoid double hashing (while updating)
userSchema.pre('save', async function(){
    if(!this.isModified("password")) return
    return this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(this.password, password)
}

userSchema.methods.createAccessToken = function (){
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        userType: this.userType
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_DURATION 
    }
)
}

userSchema.methods.createRefreshToken = function (){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_DURATION
        }
    )
}

userSchema.methods.addProduct = async function (productId, quantity = 1) {
  const existingProduct = this.order.find(
    item => item.product.toString() === productId.toString()
  );

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    this.order.push({
      product: productId,
      quantity
    });
  }

  return await this.save()
}

userSchema.methods.removeProduct = async function (productId) {
  const existingProduct = this.order.find(
    item => item.product.toString() === productId.toString()
  );

  if (!existingProduct) {
    throw new Error("Product not found in the user's cart.");
  }

  const quantity = existingProduct.quantity

  const product = await Products.findById(existingProduct.product._id)

  if(!product){
     throw new Error("Product not found in the products list.");
  }

  product.quantity += quantity

  product.save()

  this.order.pull(existingProduct._id);

  return await this.save();
};


export const User = mongoose.model("User", userSchema)