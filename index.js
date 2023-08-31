import dotenv from "dotenv";
import { getPost } from "./getPost.js";
import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";

dotenv.config();

const token = process.env.API_KEY;
const adminId = +process.env.ADMIN_ID;
const channelLink = process.env.CHANNEL_LINK;
const bot = new TelegramBot(token, { polling: true });

cron.schedule("0,30 * * * *", () => {
  const date = new Date();
  const time = `${date.getDate()}  ${date.getHours()}:${date.getMinutes()}`;
  console.log(`${time} - Fetching post...`);
  getPost(
    process.env.RESOURCE_URL,
    process.env.EXCEPTION_WORD,
    channelLink,
    bot
  );
});
