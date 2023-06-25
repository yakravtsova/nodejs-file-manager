import {
  helloUsername,
  byeUsername,
  setPromtMessage,
} from "./helloUsername.js";
import { handleChangePath, handleDirUp, makePath } from "./handlePath.js";
import readline from "readline";
import os from "os";
import {
  createFile,
  list,
  readFile,
  renameFile,
} from "./handleFileOperations.js";
import path from "path";

const username = helloUsername();
console.log(`Welcome to the File Manager, ${username}!`);
//await handleInput();
//await handleExit(username);
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
  const filePath = makePath(currentDir, content);
  switch (command) {
    case "cd":
      handleChangePath(makePath(currentDir, content));
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
    case "rn":
      const contentPieces = content.split(" ");
      const newFilename = contentPieces[contentPieces.length - 1];
      const pathToFile = makePath(
        currentDir,
        content.substring(0, content.length - newFilename.length).trim()
      );
      const pathPieces = pathToFile.split("/");
      pathPieces.pop();
      const fileDirPath = pathPieces.join("/");
      const newPathToFile = makePath(fileDirPath, newFilename);
      await renameFile(pathToFile, newPathToFile).catch((err) =>
        console.log(err.message)
      );
      break;
    case ".exit":
      byeUsername(username);
    default:
      console.log(`Invalid input \n`);
      break;
  }
  rl.prompt();
}).on("close", () => byeUsername(username));
