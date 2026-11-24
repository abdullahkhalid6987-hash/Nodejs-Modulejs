import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Products } from "../models/products.model.js";
import jwt from "jsonwebtoken";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.createAccessToken();
    const refreshToken = user.createRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "There was a problem while generating a token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(404, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(
      409,
      "The user with this username or email already exists",
    );
  }
  
  if(password !== confirmPassword){
    throw new ApiError(
      409,
      "The passwords don't match",
    );
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await User.findOne({email});

  if (!user) {
    throw new ApiError(404, "User Doesn't Exist");
  }

  const isPasswordValid = user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Credentials");
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);
  const loggedinUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, loggedinUser, "UserLoggedIn"));
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user?._id, {
    $unset: {
      refreshToken: 1,
    },
  });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User loggedout successfully"));
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({userType: {$ne: "admin"}}).select("-password -refreshToken").populate('order');

  if (!users) {
    return res
      .status(200)
      .json(new ApiResponse(200, users, "There are no users"));
  }

  return res.status(200).json(new ApiResponse(200, users, "All users fetched"));
});

const addProduct = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id).select(
    "-password -refreshToken",
  );

  if (!user) {
    throw new ApiError(400, "The user doesn't exist");
  }

  if (user.userType === "admin") {
    throw new ApiError(400, "The admins aren't allowed to order");
  }

  const productId = req.params.productId;
  const {quantity} = req.body

  if(quantity < 0){
    throw new ApiError(400, "Amount can't be negative")
  }

  const product = await Products.findById(productId);

  
  if (!product) {
    throw new ApiError(400, "The product doesn't exist");
  }
  
  if(quantity > product.quantity){
    throw new ApiError(400, "Insufficient stock available for this product.")
  }

  product.quantity = product.quantity - quantity
  await product.save()


  await user.addProduct(product._id, quantity);

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Order added to the user"));
});

const removeProduct = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id).select(
    "-password -refreshToken",
  );

  if (!user) {
    throw new ApiError(400, "The user doesn't exist");
  }

  if (user.userType === "admin") {
    throw new ApiError(400, "The admins aren't allowed to order");
  }


const productId = req.params.productId;


const product = await Products.findById(productId);


  if (!product) {
    throw new ApiError(400, "The product doesnt exist");
  }

  await user.removeProduct(product._id);

  return res
    .status(200)
    .json(new ApiResponse(200, user, "The product removed successfully"));
});

const orderList = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id)
    .select("-password -refreshToken")
    .populate("order.product");

  if (!user) {
    throw new ApiError(400, "The user doesn't exist");
  }

  if (user.userType === "admin") {
    throw new ApiError(400, "The admins aren't allowed to order");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user.order,
        "The list of order retrieved successfully",
      ),
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {

  if(req.user){
    return res.status(200).json(new ApiResponse(200, req.user, "User session exists"))
  }
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized Access!");
  }

  const decodedRefreshToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET,
  );

  const user = await User.findById(decodedRefreshToken?._id).select("-password");

  if (!user) {
    throw new ApiError(401, "Invalid Refresh Token!");
  }

  if (incomingRefreshToken !== user?.refreshToken) {
    throw new ApiError(401, "Refresh token expired or is invalid!");
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, user , "Token generated"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
  addProduct,
  removeProduct,
  orderList,
  refreshAccessToken
};
