import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();
router.route("/register").post(
    upload.fields([
        {
            name : "idProof",
            maxCount : 1
        },
        {
            name : "avatar",
            maxCount : 1
        }
    ]),registerUser);



export default router;