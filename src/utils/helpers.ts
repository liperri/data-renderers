/**
 * getRandomNumber
 * @param range
 * @returns number
 */
export function getRandomNumber(min: number, max: number) {
  const random: number = Math.random();
  const number: number = min + Math.floor(random * (max - min + 1));

  return number;
}

/**
 * omit
 * @param obj
 * @param keys
 * @returns
 */
export function omit<TObj extends Record<string, any>, TKey extends keyof TObj>(
  obj: TObj,
  keys: TKey | TKey[],
): Omit<TObj, TKey> {
  if (!Array.isArray(keys)) keys = [keys];

  const result: Partial<TObj> = {};

  for (const key in obj) if (!keys.includes(key as unknown as TKey)) result[key as keyof TObj] = obj[key];

  return result as Omit<TObj, TKey>;
}
