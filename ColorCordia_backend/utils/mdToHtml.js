
const mdToHtml = mdString => {
  const textArray = mdString.split('\n')
  const htmlArray = textArray.map(element => {
    let returnObject
    if (element[0] === '#') {
      switch (element.lastIndexOf('#')) {
        case 0:
          returnObject = {
            element: 'h1',
            text: element.trim()
          }
          break
        case 1:
          returnObject = {
            element: 'h2',
            text: element.trim()
          }
          break
        case 2:
          returnObject = {
            element: 'h3',
            text: element.trim()
          }
          break
        case 3:
          returnObject = {
            element: 'h4',
            text: element.trim()
          }
          break
        case 4:
          returnObject = {
            element: 'h5',
            text: element.trim()
          }
          break
        case 5:
          returnObject = {
            element: 'h6',
            text: element.trim()
          }
      }
    } else if (element.charAt(0).match(/^\p{L}$/u)) {
      returnObject = {
        element: 'p',
        text: element.trim()
      }
    }
    if (element.includes('[')) {
      const leftParenthesis = []
      const rightParenthesis = []
      const leftSquareBrackets = []
      const rightSquareBrackets = []
      let sqrL = element.indexOf('[')
      while (sqrL !== -1) {
        leftSquareBrackets.push(sqrL)
        sqrL = element.indexOf('[', sqrL + 1)
      }
      let sqrR = element.indexOf(']')
      while (sqrR !== -1) {
        rightSquareBrackets.push(sqrR)
        sqrR = element.indexOf(']', sqrR + 1)
      }
      let indL = element.indexOf('(')
      while (indL !== -1) {
        leftParenthesis.push(indL)
        indL = element.indexOf('(', indL + 1)
      }
      let indR = element.indexOf(')')
      while (indR !== -1) {
        rightParenthesis.push(indR)
        indR = element.indexOf(')', indR + 1)
      }
      const addresses = []
      const links = []
      let slicedElement = element
      for (let index = 0; index < leftParenthesis.length; index++) {
        addresses.push(element.substring(leftParenthesis[index] + 1, rightParenthesis[index]))
        slicedElement = slicedElement.replace(`(${addresses[addresses.length - 1]})`, '')
      }
      for (let index = 0; index < leftSquareBrackets.length; index++) {
        links.push(element.substring(leftSquareBrackets[index] + 1, rightSquareBrackets[index]))
        slicedElement = slicedElement.replace(`[${links[links.length - 1]}]`, `<a href=${addresses[index]} target="_blank" rel="noreferrer" class='link-text'>${links[links.length - 1]}</a>`)
      }
      returnObject = { ...returnObject, text: slicedElement }
    }
    return returnObject
  })
  return htmlArray.filter(element => element !== undefined)
}

module.exports = { mdToHtml }
