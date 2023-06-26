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
    fs.open(filePath, "r", (err) => {
      if (!err) rej(new Error(`Error: File ${filePath} already exists`));
    });
    const writeStream = fs.createWriteStream(filePath);
    writeStream.on("error", (err) => {
      rej(err);
    });
    writeStream.end(() => {
      res();
    });
  });
};

export const renameFile = async (filePath, newFilePath) => {
  return new Promise((res, rej) => {
    fs.open(filePath, "r", (err) => {
      if (err) rej(err);
    });
    fs.open(newFilePath, "r", (err) => {
      if (!err) rej(new Error(`Error: File ${newFilePath} already exists`));
    });
    fs.rename(filePath, newFilePath, (err) => {
      if (err) rej(err);
      else {
        res();
      }
    });
  });
};

export const copyFile = async (filePath, newFolderPath) => {
  const copyFilePath = path.resolve(newFolderPath, path.basename(filePath));
  return new Promise((res, rej) => {
    fs.access(newFolderPath, fs.constants.R_OK, (err) => {
      if (err) {
        rej(err);
      }
    });
    const readStream = fs.createReadStream(filePath);
    readStream.on("data", (data) => {
      const readCopyStream = fs.createReadStream(copyFilePath);
      readCopyStream.on("data", () => {
        process.stdout.write("");
      });
      readCopyStream.on("end", () => {
        rej(new Error("Error: File already exists"));
      });
      readCopyStream.on("error", () => {
        const writeCopyStream = fs.createWriteStream(copyFilePath);
        writeCopyStream.write(data);
        writeCopyStream.on("error", (err) => {
          rej(err);
        });
        writeCopyStream.end(() => res());
      });
    });
    readStream.on("error", (err) => rej(err));
  });
};

export const moveFile = async (filePath, newFolderPath) => {
  const copyFilePath = path.resolve(newFolderPath, path.basename(filePath));
  return new Promise((res, rej) => {
    fs.access(newFolderPath, fs.constants.R_OK, (err) => {
      if (err) {
        rej(err);
      }
    });
    const readStream = fs.createReadStream(filePath);
    readStream.on("data", (data) => {
      const readCopyStream = fs.createReadStream(copyFilePath);
      readCopyStream.on("data", () => {
        process.stdout.write("");
      });
      readCopyStream.on("end", () => {
        rej(new Error("Error: File already exists"));
      });
      readCopyStream.on("error", () => {
        const writeCopyStream = fs.createWriteStream(copyFilePath);
        writeCopyStream.write(data);
        writeCopyStream.on("error", (err) => {
          rej(err);
        });
        writeCopyStream.end(() => {
          fs.unlink(filePath, (err) => {
            if (err) rej(err);
          });
          res();
        });
      });
    });
    readStream.on("error", (err) => rej(err));
  });
};

export const deleteFile = async (filePath) => {
  return new Promise((res, rej) => {
    fs.open(filePath, "r", (err) => {
      if (err) {
        rej(err);
      }
    });
    fs.unlink(filePath, (err) => {
      if (err) rej(err);
      res();
    });
  });
};
