const emojiMap: Record<string, string> = {
  apple: "🍎",
  orange: "🍊",
  lemon: "🍋",
  watermelon: "🍉",
  grape: "🍇",
  strawberry: "🍓",
  cherry: "🍒",
  pineapple: "🍍",
  kiwi: "🥝",
  coconut: "🥥",
  peach: "🍑",
  banana: "🍌",
  carrot: "🥕",
  corn: "🌽",
  broccoli: "🥦",
  mushroom: "🍄",
};

export const getEmoji = (key: string | undefined): string => {
  if (!key) return "";
  return emojiMap[key] || key;
};
