export const textToJsx = text => {
  const returnArray = []
  for (let index = 0; index < text.length; index++) {
    let jsxElement = null
    switch (text[index].element) {
      case 'h1':
        jsxElement = <h1 key={Math.random()} className="text-4xl mb-8 font-normal" dangerouslySetInnerHTML={{ __html: text[index].text }}></h1>
        break;
      case 'h2':
        jsxElement = <h2 key={Math.random()} className="text-2xl mt-8 font-normal" dangerouslySetInnerHTML={{ __html: text[index].text }}></h2>
        break;
      case 'h3':
        jsxElement = <h3 key={Math.random()} className="text-xl" dangerouslySetInnerHTML={{ __html: text[index].text }}></h3>
        break;
      case 'p':
        jsxElement = <p className="mb-4" key={Math.random()} dangerouslySetInnerHTML={{ __html: text[index].text }}></p>
        break;
      default:
        break;
    }
    returnArray.push(jsxElement)
  }
  return returnArray
}