import { createHash } from "crypto";
import fs from "fs";

export const handleHash = async (filePath) => {
  return new Promise((res, rej) => {
    fs.open(filePath, "r", (err) => {
      if (err) rej(err);
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) rej(err);
        else {
          const hash = createHash("sha256").update(data);
          console.log(hash.digest("hex"));
          res();
        }
      });
    });
  });
};
