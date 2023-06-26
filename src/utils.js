export const handleParseContent = (content) => {
  //строка разбивается на массив строк по разделителю " "
  const contentPieces = content.split(" ");
  //интересуют части строки до и после последнего пробела
  const afterLastSpace = contentPieces.pop();
  const beforeLastSpace = contentPieces.join(" ");
  return { beforeLastSpace, afterLastSpace };
};
