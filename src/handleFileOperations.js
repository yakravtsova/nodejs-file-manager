import fs from "fs";
import path from "path";

const getStats = async (dirPath) => {
  const names = await fs.promises.readdir(dirPath);
  let promises = names.map(async (name) => {
    const pathName = path.join(dirPath, name);
    const stat = await fs.promises.stat(pathName);
    return {
      Name: name,
      Type: stat.isDirectory() ? "directory" : stat.isFile() ? "file" : "other",
    };
  });
  return await Promise.all(promises);
};

export const list = async (dirPath) => {
  // Write your code here
  const listDirTable = await getStats(dirPath);
  console.table(listDirTable);
};

export const readFile = async (filePath) => {
  return new Promise((res, rej) => {
    const readStream = fs.createReadStream(filePath);
    readStream.on("data", (chunk) => {
      process.stdout.write("\n" + chunk);
    });
    readStream.on("end", () => {
      res();
    });
    readStream.on("error", (err) => rej(err));
  });
};

export const createFile = async (filePath) => {
  return new Promise((res, rej) => {
    const readStream = fs.createReadStream(filePath);
    readStream.on("data", () => {
      process.stdout.write("\n");
    });
    readStream.on("end", () => {
      rej(new Error("Error: File already exists"));
    });
    readStream.on("error", () => {
      const writeStream = fs.createWriteStream(filePath);
      writeStream.on("error", (err) => {
        console.log(err.message);
      });
      writeStream.end(() => {
        res();
      });
    });
  });
};
