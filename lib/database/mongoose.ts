import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promice: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promice: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn; // если есть connection вернуть его

  if (!MONGODB_URL) throw new Error("Missing MONGOBD_URL is not defined");

  cached.promice =
    cached.promice ||
    mongoose.connect(MONGODB_URL, {
      dbName: "caricaturify",
      bufferCommands: false,
    }); // если нет connection, то сделать новое

  cached.conn = await cached.promice;

  return cached.conn;
};
