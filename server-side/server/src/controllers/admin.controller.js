import { User } from "../models/user.model.js";
import { Ngo } from "../models/ngo.model.js";
import { Ticket } from "../models/raise.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// GET /api/v1/admin/stats — high level counts for the dashboard overview
const getStats = asyncHandler(async (req, res) => {
  const [totalUsers, donors, ngoUsers, admins, totalNgos, totalTickets] =
    await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "User" }),
      User.countDocuments({ role: "NGO" }),
      User.countDocuments({ role: "Admin" }),
      Ngo.countDocuments(),
      Ticket.countDocuments(),
    ]);

  const stats = {
    users: { total: totalUsers, donors, ngo: ngoUsers, admins },
    ngos: totalNgos,
    tickets: totalTickets,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, stats, "Stats fetched successfully"));
});

// GET /api/v1/admin/users?keyword= — list/search every user
const getAllUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword || "";
  const query = keyword
    ? {
        $or: [
          { username: { $regex: keyword, $options: "i" } },
          { email: { $regex: keyword, $options: "i" } },
          { fullName: { $regex: keyword, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(query)
    .select("-password -refreshToken")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully"));
});

// PATCH /api/v1/admin/users/:id/role — promote/demote a user
const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!["User", "NGO", "Admin"].includes(role)) {
    throw new ApiError(400, "Invalid role. Allowed: User, NGO, Admin");
  }

  if (id === req.user._id.toString()) {
    throw new ApiError(400, "You cannot change your own role");
  }

  const user = await User.findByIdAndUpdate(
    id,
    { $set: { role } },
    { new: true }
  ).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User role updated successfully"));
});

// DELETE /api/v1/admin/users/:id — remove a user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (id === req.user._id.toString()) {
    throw new ApiError(400, "You cannot delete your own admin account");
  }

  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Clean up the NGOs this user created and any tickets under them.
  const ngos = await Ngo.find({ createdBy: id }).select("_id");
  const ngoIds = ngos.map((n) => n._id);
  if (ngoIds.length) {
    await Ticket.deleteMany({ ngo: { $in: ngoIds } });
    await Ngo.deleteMany({ _id: { $in: ngoIds } });
  }

  await User.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, { _id: id }, "User deleted successfully"));
});

// GET /api/v1/admin/ngos?keyword= — list every NGO with its owner
const getAllNgosAdmin = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword || "";
  const query = keyword
    ? {
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { email: { $regex: keyword, $options: "i" } },
          { category: { $regex: keyword, $options: "i" } },
        ],
      }
    : {};

  const ngos = await Ngo.find(query)
    .populate({ path: "createdBy", select: "username email role" })
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, ngos, "NGOs fetched successfully"));
});

// DELETE /api/v1/admin/ngos/:id — remove an NGO and its tickets
const deleteNgo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const ngo = await Ngo.findById(id);
  if (!ngo) {
    throw new ApiError(404, "NGO not found");
  }

  await Ticket.deleteMany({ ngo: id });
  await Ngo.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, { _id: id }, "NGO deleted successfully"));
});

// GET /api/v1/admin/tickets?keyword= — list every fundraising ticket
const getAllTicketsAdmin = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword || "";
  const query = keyword
    ? {
        $or: [
          { cause: { $regex: keyword, $options: "i" } },
          { amount: { $regex: keyword, $options: "i" } },
        ],
      }
    : {};

  const tickets = await Ticket.find(query)
    .populate({ path: "ngo", select: "name email category" })
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, tickets, "Tickets fetched successfully"));
});

// DELETE /api/v1/admin/tickets/:id — remove a ticket
const deleteTicket = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const ticket = await Ticket.findById(id);
  if (!ticket) {
    throw new ApiError(404, "Ticket not found");
  }

  // Detach the ticket from its NGO's raise[] list, then delete it.
  await Ngo.updateOne({ _id: ticket.ngo }, { $pull: { raise: ticket._id } });
  await Ticket.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, { _id: id }, "Ticket deleted successfully"));
});

export {
  getStats,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAllNgosAdmin,
  deleteNgo,
  getAllTicketsAdmin,
  deleteTicket,
};
