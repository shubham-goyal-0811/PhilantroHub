/**
 * Provision an Admin user from the command line.
 *
 *   npm run create-admin -- --email admin@philantrohub.com --password "Secret123" \
 *        --username admin --fullName "Site Admin" --mobileNo 9876500000
 *
 * If a user with the given email/username already exists, they are promoted to
 * "Admin" instead of being recreated. Admins are intentionally NOT creatable via
 * the public /register endpoint, so this script is the entry point for the first
 * admin; afterwards an admin can promote others from the dashboard.
 */
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { User } from "../models/user.model.js";

const parseArgs = () => {
  const args = process.argv.slice(2);
  const out = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      const key = args[i].slice(2);
      const val = args[i + 1] && !args[i + 1].startsWith("--") ? args[++i] : true;
      out[key] = val;
    }
  }
  return out;
};

const run = async () => {
  const {
    email,
    password,
    username,
    fullName = "Administrator",
    mobileNo = "9000000000",
  } = parseArgs();

  if (!email || !password || !username) {
    console.error(
      "Missing required args. Usage:\n  npm run create-admin -- --email <email> --password <password> --username <username> [--fullName <name>] [--mobileNo <number>]"
    );
    process.exit(1);
  }

  await mongoose.connect(`${process.env.MONGODB_URL}${DB_NAME}`);
  console.log(`Connected to ${DB_NAME}`);

  const existing = await User.findOne({ $or: [{ email }, { username }] });

  if (existing) {
    existing.role = "Admin";
    await existing.save({ validateBeforeSave: false });
    console.log(`Promoted existing user "${existing.username}" to Admin.`);
  } else {
    // idProof is required by the schema; admins are provisioned, not document-verified.
    const admin = await User.create({
      fullName,
      username: username.toLowerCase(),
      email,
      password,
      mobileNo,
      role: "Admin",
      idProof: "admin-provisioned",
      avatar: "",
    });
    console.log(`Created new Admin user "${admin.username}" (${admin.email}).`);
  }

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error("Failed to create admin:", err.message);
  process.exit(1);
});
