import mongoose from "mongoose";
import type { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;
const DB_NAME = "PhilantroHub";

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var __mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache =
  globalThis.__mongooseCache ??
  (globalThis.__mongooseCache = { conn: null, promise: null });

export async function connectDb(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) {
    throw new Error("MONGODB_URL environment variable is not set");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(`${MONGODB_URL}${DB_NAME}`, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}
