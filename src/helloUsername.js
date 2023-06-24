import { argv } from "process";

export const helloUsername = () => {
  const varName = "--username=";
  const username = argv
    .find((item) => {
      return item.startsWith(varName);
    })
    .replace(varName, "");
  return username;
};

export const byeUsername = (username) => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
};

export const setPromtMessage = (readlineInterface, pathDir) => {
  readlineInterface.setPrompt(`\nYou are currently in ${pathDir} \n`);
};
