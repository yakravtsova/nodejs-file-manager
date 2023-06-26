import os from "os";

export const handleGetEOL = () => {
  console.log(JSON.stringify(os.EOL));
};

export const handleGetUsername = () => {
  console.log(os.userInfo().username);
};

export const handleGetArch = () => {
  console.log(os.arch());
};

export const handleGetCups = () => {
  const cpusInfo = os.cpus().map((cpu) => {
    return {
      model: cpu.model,
      "clock rate (GHz)": cpu.speed / 1000,
    };
  });
  console.log(`\nOverall amount of CPUS: ${cpusInfo.length}`);
  console.table(cpusInfo);
};
