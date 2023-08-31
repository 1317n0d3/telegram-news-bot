import puppeteer from "puppeteer";
import fs from "fs";
import fetch from "node-fetch";
import { uploadByUrl } from "telegraph-uploader";

const getPost = async (RESOURCE_URL, EXCEPTION_WORD, channelLink, bot) => {
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

  // console.log(post);

  await page.goto(post.link, {
    waitUntil: "domcontentloaded",
  });

  const fullPost = await page.evaluate(() => {
    const text = document.querySelector(".n_main__content").innerText;

    return { text };
  });

  // console.log(fullPost);

  let postText = "";
  const postLength = (post.title + fullPost.text).length;
  const maxPostLength = 1000;

  if (postLength > maxPostLength) {
    let imageLink = "";
    await uploadByUrl(post.imageLink).then((result) => {
      // console.log(result);
      imageLink = result.link;
    });

    const response = await fetch("https://api.telegra.ph/createPage", {
      method: "post",
      body: JSON.stringify({
        access_token: process.env.TELEGRAPH_TOKEN,
        title: post.title,
        content: [
          {
            tag: "figure",
            children: [{ tag: "img", attrs: { src: imageLink } }],
          },
          { tag: "p", children: [`${fullPost.text}`] },
        ],
        return_content: true,
        can_edit: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    // console.log("telegraph data");
    // console.log(data);
    postText = `<b>${post.title}</b> \n\n ${post.text} \n\n ${data.result.url}`;
  } else {
    postText = `<b>${post.title}</b> \n\n ${fullPost.text}`;
  }

  //TODO: Create lastPostId.txt if it doesn't exist
  fs.readFile("lastPostId.txt", "utf8", function (error, fileContent) {
    if (error) throw error;

    let lastPostId = fileContent;
    // console.log(fileContent);

    if (
      post.text.toLowerCase().includes(EXCEPTION_WORD) ||
      fullPost.text.toLowerCase().includes(EXCEPTION_WORD) ||
      lastPostId === post.id
    ) {
      console.log("Forbidden or existing post...");
    } else {
      if (postLength > maxPostLength) {
        bot.sendMessage(channelLink, postText, {
          parse_mode: "HTML",
        });
      } else {
        bot.sendPhoto(channelLink, post.imageLink, {
          caption: postText,
          parse_mode: "HTML",
        });
      }

      let toWrite = `${post.id}`;

      fs.writeFile("lastPostId.txt", toWrite, function (error) {
        if (error) throw error;
        console.log("Data recorded successfully to lastPostId.txt", lastPostId);
      });
    }
  });

  await browser.close();
};

export { getPost };
