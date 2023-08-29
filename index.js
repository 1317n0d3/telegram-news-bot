import dotenv from "dotenv";
import puppeteer from "puppeteer";
import https from "https";
import fs from "fs";

dotenv.config();

// const TelegramBot = require("node-telegram-bot-api");
// const token = process.env.API_KEY;
// const adminId = +process.env.ADMIN_ID;
// const bot = new TelegramBot(token, { polling: true });

const getPost = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
  });

  const page = await browser.newPage();

  await page.goto(`${process.env.RESOURCE_URL}`, {
    waitUntil: "domcontentloaded",
  });

  const post = await page.evaluate(() => {
    const link = document.querySelector(".post_new-title > a").href;
    const title = document.querySelector(".post_new-title > a").innerText;
    const text = document.querySelector(".post_new__main_box_text").innerText;
    const id = link.split("/")[4].split("-")[0];
    const imageLink = document
      .querySelector(".post_new__main_box_image > a > picture > img")
      .src.split("?")[0];

    return { id, title, text, link, imageLink };
  });

  console.log(post);

  await page.goto(post.link, {
    waitUntil: "domcontentloaded",
  });

  const fullPost = await page.evaluate(() => {
    const text = document.querySelector(".n_main__content").innerText;

    return { text };
  });

  console.log(fullPost);

  const imageName = `./images/${post.id}.jpg`;
  const file = fs.createWriteStream(imageName);

  https
    .get(post.imageLink, (response) => {
      response.pipe(file);

      file.on("finish", () => {
        file.close();
      });
    })
    .on("error", (err) => {
      fs.unlink(imageName);
      console.error(`Error downloading image: ${err.message}`);
    });

  await browser.close();
};

getPost();
