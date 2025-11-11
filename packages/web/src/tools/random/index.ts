import event2023FallStoreSpeeches from "./event2023FallStoreSpeeches";
import event2024FallStoreSpeeches from "./event2024FallStoreSpeeches";
import event2025FallStoreSpeeches from "./event2025FallStoreSpeeches";
import roomNames from "./roomNames";
import suggestRoomShareTexts from "./suggestRoomShareTexts";
import taxiSlogans from "./taxiSlogans";

import event2025SpringStoreSpeeches from "@/tools/random/event2025SpringStoreSpeeches";

const randomGenerator = (array: Array<string>) => () =>
  array[Math.floor(Math.random() * array.length)];

export const randomRoomNameGenerator = randomGenerator(roomNames);
export const randomTaxiSloganGenerator = randomGenerator(taxiSlogans);

export const randomEvent2023FallStoreSpeechGenerator = randomGenerator(
  event2023FallStoreSpeeches
);
export const randomEvent2024FallStoreSpeechGenerator = randomGenerator(
  event2024FallStoreSpeeches
);
export const randomEvent2025SpringStoreSpeechGenerator = randomGenerator(
  event2025SpringStoreSpeeches
);

export const randomEvent2025FallStoreSpeechGenerator = randomGenerator(
  event2025FallStoreSpeeches
);

export const randomSuggestRoomShareTextGenerator = (seed: string) => {
  const hash = seed
    .split("")
    .reduce((hash, char) => hash + char.charCodeAt(0), 0);
  return suggestRoomShareTexts[hash % suggestRoomShareTexts.length];
};
