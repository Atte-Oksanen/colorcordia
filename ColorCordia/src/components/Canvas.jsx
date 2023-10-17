/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react"

const Canvas = ({ palette, type, setDataUrl }) => {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = 'black'
    for (let index = 0, x = 0; index < palette.length; index++, x = x + 300) {
      ctx.font = 'bold 38px Arial'
      ctx.fillStyle = palette[index].hex
      ctx.fillRect(x, 0, 300, 850)
      ctx.fillStyle = 'black'
      ctx.fillText(`${palette[index].hex}`, x + 15, 900)
      ctx.font = '25px Arial'
      ctx.fillText(`${palette[index].name}`, x + 15, 950)
    }
    ctx.font = 'Bold 30px Arial'
    ctx.fillText("ColorCordia*", 15, 1060)
    const text = `${type} pallette from ${palette[2].hex}`
    ctx.fillText(text, 15, 1010)
    setDataUrl(canvasRef.current.toDataURL())
  }, [palette, setDataUrl, type])

  return <canvas width='1500' height='1080' ref={canvasRef} style={{ display: "none" }} >Your browser does not support canvas</canvas>
}

export default Canvas