import dotenv from "dotenv";
import puppeteer from "puppeteer";

dotenv.config();

// const TelegramBot = require("node-telegram-bot-api");
// const token = process.env.API_KEY;
// const adminId = +process.env.ADMIN_ID;
// const bot = new TelegramBot(token, { polling: true });

const getQuotes = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
  });

  const page = await browser.newPage();

  await page.goto(`${process.env.RESOURCE_URL}`, {
    waitUntil: "domcontentloaded",
  });

  const quotes = await page.evaluate(() => {
    const link = document.querySelector(".post_new-title > a").href;
    const title = document.querySelector(".post_new-title > a").innerText;

    return { link, title };
  });

  console.log(quotes);

  await browser.close();
};

getQuotes();
