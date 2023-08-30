import dotenv from "dotenv";
import { getPost } from "./getPost.js";
import TelegramBot from "node-telegram-bot-api";

dotenv.config();

const token = process.env.API_KEY;
const adminId = +process.env.ADMIN_ID;
const channelLink = process.env.CHANNEL_LINK;
const bot = new TelegramBot(token, { polling: true });

getPost(process.env.RESOURCE_URL, process.env.EXCEPTION_WORD, channelLink, bot);
