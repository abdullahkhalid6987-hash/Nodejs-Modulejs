import {Router} from "express"
import { upload } from "../middleware/multer.middleware.js"
import { allProducts, addProduct, removeProduct } from "../controllers/products.controller.js"
import { verifyAdmin } from "../middleware/verifyAdmin.middleware.js"
import { verifyJwt } from "../middleware/auth.middleware.js"

const router = Router()

router.route("/allProducts").get(allProducts)

router.use(verifyJwt,verifyAdmin)

router.route("/addProduct").post(upload.single("image"), addProduct)
router.route("/removeProduct/:productId").post(removeProduct)

export default router