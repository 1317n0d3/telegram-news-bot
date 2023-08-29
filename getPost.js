import puppeteer from "puppeteer";
import fs from "fs";
import { downloadImage } from "./downloadImage.js";

const getPost = async (RESOURCE_URL, EXCEPTION_WORD) => {
  const browser = await puppeteer.launch({
    headless: "new",
  });

  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  await page.goto(`${RESOURCE_URL}`, {
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

  if (
    post.text.toLowerCase().includes(EXCEPTION_WORD) ||
    fullPost.text.toLowerCase().includes(EXCEPTION_WORD)
  ) {
    console.log("Forbidden post...");
  } else {
    const imageName = `./images/${post.id}.jpg`;
    await downloadImage(imageName, post.imageLink);
  }

  await browser.close();
};

export { getPost };
