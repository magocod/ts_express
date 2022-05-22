/**
 *
 * @param strLength
 * @param charSet
 */
export function randomString(
  strLength = 10,
  charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
): string {
  const result = [];

  while (strLength--) {
    // (note, fixed typo)
    result.push(charSet.charAt(Math.floor(Math.random() * charSet.length)));
  }

  return result.join("");
}
