import mongoose from "mongoose";
import { logger } from "./logger";

const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING ||
  "mongodb+srv://regev79:YZ4PmqqlzgjlAsox@cluster0.qveutxq.mongodb.net/";

export async function connectToDatabase() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    logger.info("Connected to database");
  } catch (error) {
    logger.error(error, "Failed to connect to database. Goodbye");
    process.exit(1);
  }
}

export async function disconnectFromDatabase(){
    await mongoose.connection.close();
    logger.info('Disconnected from database');
    return;
}