import dotenv from "dotenv";
import { getPost } from "./getPost.js";

dotenv.config();

// const TelegramBot = require("node-telegram-bot-api");
// const token = process.env.API_KEY;
// const adminId = +process.env.ADMIN_ID;
// const bot = new TelegramBot(token, { polling: true });

getPost(process.env.RESOURCE_URL, process.env.EXCEPTION_WORD);
