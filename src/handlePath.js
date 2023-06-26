import path from "path";

export const handleChangePath = (newPath) => {
  try {
    process.chdir(newPath);
  } catch (err) {
    console.log(err.message + "\n");
  }
};

export const handleDirUp = () => {
  try {
    process.chdir("..");
  } catch (err) {
    console.log(err.message + "\n");
  }
};
