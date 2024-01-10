import dotenv from "dotenv";
import { ipcMain } from "electron";
// import { getPost } from "./getPost.js";
import TelegramBot from "node-telegram-bot-api";
// import cron from "node-cron";

const setupBot = async () => {
  dotenv.config();

  const token = process.env.API_KEY;
  const adminId = +process.env.ADMIN_ID;
  const channelLink = process.env.CHANNEL_LINK;
  const bot = new TelegramBot(token, { polling: true });

  const chatInfo = await bot.getChat(channelLink);
  const chatMembers = await bot.getChatMemberCount(channelLink);

  bot.sendMessage(adminId, `test message`);
  bot.sendMessage(adminId, `${chatInfo.title}`);

  console.log(chatInfo.photo);

  ipcMain.on("main-window-ready", (e) => {
    console.log("Main window is ready");
  });
  // .on("send-message", (e, message) => {
  //   console.log(message);
  // });

  ipcMain.handle("get-chat", (e) => {
    return [
      {
        title: chatInfo.title,
        type: chatInfo.type,
        photo: chatInfo.photo,
        membersCount: chatMembers,
      },
    ];
  });
};

// cron.schedule("0,30 * * * *", () => {
//   const date = new Date();
//   const time = `${date.getDate()}  ${date.getHours()}:${date.getMinutes()}`;
//   console.log(`${time} - Fetching post...`);

//   bot.sendMessage(adminId, `${time} - Fetching post...`);

//   getPost(
//     process.env.RESOURCE_URL,
//     process.env.EXCEPTION_WORD,
//     channelLink,
//     adminId,
//     bot
//   );
// });

export default setupBot;
