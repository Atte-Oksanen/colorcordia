const badWords = require('naughty-words')

const checkProfanity = (input) => {

  const cleanedInput = input.toLowerCase().replace(/[^A-Za-z0-9]/g, '')
    .replaceAll('4', 'a')
    .replaceAll('8', 'b')
    .replaceAll('3', 'e')
    .replaceAll('6', 'g')
    .replaceAll('0', 'o')
    .replaceAll('9', 'p')
    .replaceAll('5', 's')
    .replaceAll('7', 't')
    .replaceAll('2', 'z')

  const keys = Object.keys(badWords)
  for (let index = 0; index < keys.length; index++) {
    if (badWords[keys[index]].some(word => cleanedInput.replaceAll('1', 'i').includes(word)) || badWords[keys[index]].some(word => cleanedInput.replaceAll('1', 'l').includes(word))) {
      return true
    }
  }

  return false
}

module.exports = { checkProfanity }