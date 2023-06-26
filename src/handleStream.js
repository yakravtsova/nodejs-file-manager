export const handleInput = async () => {
  process.stdin.on("data", (data) => {
    console.log(data.toString());
    process.on("exit", () => {
      return console.log(
        `Thank you for using File Manager, ${username}, goodbye!`
      );
    });
  });
};

export const handleExit = async (username) => {
  process.on("exit", () => {
    console.log(`\n Thank you for using File Manager, ${username}, goodbye!`);
  });
};
