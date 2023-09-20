/**
 * getRandomNumberFromRange
 * @param range
 * @returns number
 */
export function getRandomNumberFromRange(min: number, max: number) {
  const random: number = Math.random();
  const number: number = min + Math.floor(random * (max - min + 1));

  return number;
}
