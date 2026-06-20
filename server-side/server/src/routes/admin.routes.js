import { Router } from "express";
import { verifyJWT, authorizeRoles } from "../middlewares/auth.middleware.js";
import {
  getStats,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAllNgosAdmin,
  deleteNgo,
  getAllTicketsAdmin,
  deleteTicket,
} from "../controllers/admin.controller.js";

const router = Router();

// Every admin route requires a valid token AND the "Admin" role.
router.use(verifyJWT, authorizeRoles("Admin"));

router.route("/stats").get(getStats);

router.route("/users").get(getAllUsers);
router.route("/users/:id/role").patch(updateUserRole);
router.route("/users/:id").delete(deleteUser);

router.route("/ngos").get(getAllNgosAdmin);
router.route("/ngos/:id").delete(deleteNgo);

router.route("/tickets").get(getAllTicketsAdmin);
router.route("/tickets/:id").delete(deleteTicket);

export default router;
