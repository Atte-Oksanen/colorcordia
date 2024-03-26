import badWords from 'naughty-words'

/**
 * A function for checking profanities
 * @param {string} input 
 * @returns {boolean}
 */
export const checkProfanity = (input: string): boolean => {
  const cleanedInput = input.toLowerCase().replace(/[^A-Za-z0-9]/g, '')
    .replace(/4/g, 'a')
    .replace(/8/g, 'b')
    .replace(/3/g, 'e')
    .replace(/6/g, 'g')
    .replace(/0/g, 'o')
    .replace(/9/g, 'p')
    .replace(/5/g, 's')
    .replace(/7/g, 't')
    .replace(/2/g, 'z')
  for (const property in badWords) {
    if (badWords[property as keyof typeof badWords].some(word => cleanedInput.replace(/1/g, 'i').includes(word)) || badWords[property as keyof typeof badWords].some(word => cleanedInput.replace(/1/g, 'l').includes(word))) {
      return true
    }
  }
  return false
}
