import {Router} from "express"
import { registerUser, loginUser, logoutUser, getUsers, addProduct, removeProduct, orderList, refreshAccessToken } from "../controllers/user.controller.js"
import { verifyJwt } from "../middleware/auth.middleware.js"
import { verifyAdmin } from "../middleware/verifyAdmin.middleware.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJwt, logoutUser)
router.route("/refreshToken").post(verifyJwt, refreshAccessToken)
router.route("/addProduct/:productId").post(verifyJwt , addProduct)
router.route("/removeProduct/:productId").post(verifyJwt , removeProduct)
router.route("/orderList").get(verifyJwt , orderList)

router.use(verifyJwt,verifyAdmin)
router.route("/getUsers").get(getUsers)
// router.route("removeProduct/:productId").post(removeProduct)

export default router