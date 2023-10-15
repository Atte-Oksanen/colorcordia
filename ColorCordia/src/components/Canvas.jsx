/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react"

const Canvas = ({ palette, setDataUrl }) => {
  const [type, ...harmony] = palette.split('-')
  const colors = harmony.map(color => `#${color}`)
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = 'black'
    ctx.font = 'bold 38px Arial'
    for (let index = 0, x = 0; index < colors.length; index++, x = x + 300) {
      ctx.fillStyle = colors[index]
      ctx.fillRect(x, 0, 300, 900)
      ctx.fillStyle = 'black'
      ctx.fillText(`${colors[index]}`, x + 25, 950)
    }
    ctx.font = '30px Arial'
    ctx.fillText("ColorCordia*", 25, 1060)
    const text = `${type} pallette from ${colors[2]}`
    ctx.fillText(text, 25, 1010)
    setDataUrl(canvasRef.current.toDataURL())
  }, [colors, palette, setDataUrl, type])

  return <canvas width='1500' height='1080' ref={canvasRef} style={{ border: "1px solid black" }} >Your browser does not support canvas</canvas>
}

export default Canvas