import fs from "fs";
import zlib from "zlib";

export const handleCompressFile = async (filePath, archivePath) => {
  const readStream = fs.createReadStream(filePath);
  const writeStream = fs.createWriteStream(archivePath);
  const brotli = zlib.createBrotliCompress();
  return new Promise((res, rej) => {
    fs.open(archivePath, "r", (err) => {
      if (!err) rej(new Error(`Error: File ${archivePath} already exists`));
    });
    writeStream.on("error", (err) => {
      rej(err);
    });
    readStream.on("error", (err) => {
      rej(err);
    });
    readStream
      .pipe(brotli)
      .pipe(writeStream)
      .on("finish", () => res());
  });
};

export const handleDecompressFile = async (filePath, archivePath) => {
  const readStream = fs.createReadStream(archivePath);
  const writeStream = fs.createWriteStream(filePath);
  const brotli = zlib.createBrotliDecompress();
  return new Promise((res, rej) => {
    fs.open(filePath, "r", (err) => {
      if (!err) rej(new Error(`Error: File ${filePath} already exists`));
    });
    writeStream.on("error", (err) => {
      rej(err);
    });
    readStream.on("error", (err) => {
      rej(err);
    });
    readStream
      .pipe(brotli)
      .pipe(writeStream)
      .on("finish", () => res());
  });
};
