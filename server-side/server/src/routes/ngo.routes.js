import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getAllNgo,
  getNgobyAdmin,
  getNgobyId,
  registerNgo,
} from "../controllers/ngo.controller.js";

const router = Router();
router.route("/register").post(
  verifyJWT,
  upload.fields([
    {
      name: "idProof",
      maxCount: 1,
    },
    {
      name: "logo",
      maxCount: 1,
    },
  ]),
  registerNgo
);

router.route("/getNgos").get(getAllNgo);

router.route("/getNgo/:id").get(getNgobyId);

router.route("/getUserNgo").get(verifyJWT, getNgobyAdmin);

export default router;
