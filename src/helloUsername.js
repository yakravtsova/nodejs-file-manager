import { argv } from "process";

export const helloUsername = () => {
  const varName = "--username=";
  const hasUsername = argv.reduce(
    (acc, curVal) => acc || curVal.startsWith(varName),
    false
  );
  const username = hasUsername
    ? argv
        .find((item) => {
          return item.startsWith(varName);
        })
        .replace(varName, "")
    : "anonimous";
  return username.charAt(0).toUpperCase() + username.slice(1);
};

export const byeUsername = (username) => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
};

export const setPromtMessage = (readlineInterface, pathDir) => {
  readlineInterface.setPrompt(`\nYou are currently in ${pathDir} \n`);
};
