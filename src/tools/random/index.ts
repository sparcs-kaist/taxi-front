import roomNames from "./roomNames";
import taxiSlogans from "./taxiSlogans";

const randomGenerator = (array: Array<string>) => () =>
  array[Math.floor(Math.random() * array.length)];

export const randomRoomNameGenerator = randomGenerator(roomNames);
export const randomTaxiSloganGenerator = randomGenerator(taxiSlogans);
