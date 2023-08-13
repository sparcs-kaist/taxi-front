import roomNames from "./roomNames";
import suggestRoomShareTexts from "./suggestRoomShareTexts";
import taxiSlogans from "./taxiSlogans";

const randomGenerator = (array: Array<string>) => () =>
  array[Math.floor(Math.random() * array.length)];

export const randomRoomNameGenerator = randomGenerator(roomNames);
export const randomTaxiSloganGenerator = randomGenerator(taxiSlogans);

export const randomSuggestRoomShareTextGenerator = (seed: string) => {
  const hash = seed
    .split("")
    .reduce((hash, char) => hash + char.charCodeAt(0), 0);
  return suggestRoomShareTexts[hash % suggestRoomShareTexts.length];
};
