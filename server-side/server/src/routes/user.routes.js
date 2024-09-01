import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { changeAvatar, changeCurrentPassword, changeIdproof, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails } from "../controllers/user.controller.js";

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

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT,changeCurrentPassword);
router.route("/current-user").get(verifyJWT,getCurrentUser);
router.route("/update-account").patch(verifyJWT,updateAccountDetails);
router.route("/update-idProof").patch(verifyJWT,
    upload.single("idProof"),changeIdproof
)
router.route("/update-avatar").patch(verifyJWT,upload.single("avatar"),changeAvatar);




export default router;