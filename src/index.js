import {
  helloUsername,
  byeUsername,
  setPromtMessage,
} from "./helloUsername.js";
import { handleChangePath, handleDirUp } from "./handlePath.js";
import readline from "readline";
import os from "os";
import {
  copyFile,
  createFile,
  list,
  moveFile,
  readFile,
  renameFile,
} from "./handleFileOperations.js";
import { handleParseContent } from "./utils.js";
import path from "path";

const username = helloUsername();
console.log(`Welcome to the File Manager, ${username}!`);
const homedir = os.homedir();
process.chdir(homedir);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `\nYou are currently in ${homedir} \n`,
});

rl.prompt();

rl.on("line", async (line) => {
  const input = line.trim();
  const indexOfFirstSpace = input.indexOf(" ");
  const command =
    indexOfFirstSpace === -1 ? input : input.substring(0, indexOfFirstSpace);
  const content = input.substring(indexOfFirstSpace + 1, input.length);
  const currentDir = process.cwd();
  const filePath = path.resolve(currentDir, content);
  switch (command) {
    case "cd":
      handleChangePath(path.resolve(currentDir, content));
      setPromtMessage(rl, process.cwd());
      break;
    case "up":
      handleDirUp();
      setPromtMessage(rl, process.cwd());
      break;
    case "ls":
      await list(currentDir);
      setPromtMessage(rl, currentDir);
      break;
    case "cat":
      await readFile(filePath).catch((err) => console.log(err.message));
      break;
    case "add":
      await createFile(filePath).catch((err) => console.log(err.message));
      break;
    case "rn": {
      const { beforeLastSpace, afterLastSpace } = handleParseContent(content);
      const newFilename = afterLastSpace;
      const pathToFile = path.resolve(currentDir, beforeLastSpace);
      const dirPath = path.dirname(pathToFile);
      const newPathToFile = path.resolve(dirPath, newFilename);
      await renameFile(pathToFile, newPathToFile).catch((err) =>
        console.log(err.message)
      );
      break;
    }
    case "cp": {
      const { beforeLastSpace, afterLastSpace } = handleParseContent(content);
      const pathToFile = path.resolve(currentDir, beforeLastSpace);
      const pathToNewDir = path.resolve(currentDir, afterLastSpace);
      await copyFile(pathToFile, pathToNewDir).catch((err) => {
        console.log(err.message);
      });
      break;
    }
    case "mv": {
      const { beforeLastSpace, afterLastSpace } = handleParseContent(content);
      const pathToFile = path.resolve(currentDir, beforeLastSpace);
      const pathToNewDir = path.resolve(currentDir, afterLastSpace);
      await moveFile(pathToFile, pathToNewDir).catch((err) => {
        console.log(err.message);
      });
      break;
    }
    case ".exit":
      byeUsername(username);
    default:
      console.log(`Invalid input \n`);
      break;
  }
  rl.prompt();
}).on("close", () => byeUsername(username));
