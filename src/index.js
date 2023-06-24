import {
  helloUsername,
  byeUsername,
  setPromtMessage,
} from "./helloUsername.js";
import { handleInput, handleExit } from "./handleStream.js";
import { handeChangePath, handleDirUp } from "./handlePath.js";
import readline from "readline";
import os from "os";
import { list } from "./handleFileOperations.js";

const inputName = helloUsername();
const username = inputName.charAt(0).toUpperCase() + inputName.slice(1);
console.log(`Welcome to the File Manager, ${username}! \n`);
//await handleInput();
//await handleExit(username);
const homedir = os.homedir();
process.chdir(homedir);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `You are currently in ${homedir} \n`,
});

rl.prompt();

rl.on("line", async (line) => {
  const input = line.trim();
  const indexOfFirstSpace = input.indexOf(" ");
  const command =
    indexOfFirstSpace === -1 ? input : input.substring(0, indexOfFirstSpace);
  const content = input.substring(indexOfFirstSpace + 1, input.length);
  const __dirname = process.cwd();
  switch (command) {
    case "cd":
      handeChangePath(__dirname, content);
      setPromtMessage(rl, process.cwd());
      break;
    case "up":
      handleDirUp();
      setPromtMessage(rl, process.cwd());
      break;
    case "ls":
      await list(__dirname);
      setPromtMessage(rl, __dirname);
      break;
    case "hello":
      console.log("world! \n");
      break;
    case ".exit":
      byeUsername(username);
    default:
      console.log(`Invalid input \n`);
      break;
  }
  rl.prompt();
}).on("close", () => byeUsername(username));
