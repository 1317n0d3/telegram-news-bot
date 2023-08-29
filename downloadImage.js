import https from "https";
import fs from "fs";

const downloadImage = async (imageName, imageLink) => {
  const file = fs.createWriteStream(imageName);

  https
    .get(imageLink, (response) => {
      response.pipe(file);

      file.on("finish", () => {
        file.close();
      });
    })
    .on("error", (err) => {
      fs.unlink(imageName);
      console.error(`Error downloading image: ${err.message}`);
    });
};

export { downloadImage };
