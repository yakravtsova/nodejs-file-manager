export const handleParseContent = (content) => {
  const contentPieces = content.split(" ");
  const afterLastSpace = contentPieces.pop();
  const beforeLastSpace = contentPieces.join(" ");
  return { beforeLastSpace, afterLastSpace };
};
