import path from "path";

export const handeChangePath = (pathDir, content) => {
  try {
    const newPath = path.isAbsolute(content)
      ? content
      : path.join(pathDir, content);
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
