import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.MONGO_URI;

const client = new MongoClient(URL);

export const db = client.db("musicalyDb");
