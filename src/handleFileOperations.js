import fs from "fs";
import path from "path";

const getStats = async (pathDir) => {
  const names = await fs.promises.readdir(pathDir);
  let promises = names.map(async (name) => {
    const pathName = path.join(pathDir, name);
    const stat = await fs.promises.stat(pathName);
    return {
      Name: name,
      Type: stat.isDirectory() ? "directory" : stat.isFile() ? "file" : "other",
    };
  });
  return await Promise.all(promises);
};

export const list = async (pathDir) => {
  // Write your code here
  const listDirTable = await getStats(pathDir);
  console.table(listDirTable);
};
