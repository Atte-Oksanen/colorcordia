/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react"

const VisualiserCanvas = ({ colors }) => {
  const canvasRef = useRef(null)
  const noiseRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = colors[1]
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    const firstGradient = ctx.createRadialGradient(-10, 150, 30, -40, 150, 290)
    firstGradient.addColorStop(0, colors[2])
    firstGradient.addColorStop(1, 'transparent')
    ctx.fillStyle = firstGradient
    ctx.beginPath();
    ctx.arc(-40, 150, 300, 0, Math.PI * 2, true)
    ctx.fill()
    ctx.closePath()
    const secondGradient = ctx.createRadialGradient(550, -100, 100, 550, -100, 350)
    secondGradient.addColorStop(0, colors[3])
    secondGradient.addColorStop(1, 'transparent')
    ctx.fillStyle = secondGradient
    ctx.beginPath();
    ctx.arc(550, -100, 400, 0, Math.PI * 2, true)
    ctx.fill()
    ctx.closePath()
    const thirdGradient = ctx.createRadialGradient(380, 580, 290, 400, 580, 440)
    thirdGradient.addColorStop(0, colors[2])
    thirdGradient.addColorStop(1, 'transparent')
    ctx.fillStyle = thirdGradient
    ctx.beginPath();
    ctx.arc(380, 580, 450, 0, Math.PI * 2, true)
    ctx.fill()
    ctx.closePath()
  }, [colors])

  useEffect(() => {
    const canvas = noiseRef.current
    const x = 0;
    const y = 0;
    const width = canvas.width;
    const height = canvas.height;
    const alpha = 7;
    var g = canvas.getContext("2d"),
      imageData = g.getImageData(x, y, width, height),
      random = Math.random,
      pixels = imageData.data,
      n = pixels.length,
      i = 0;
    while (i < n) {
      pixels[i++] = pixels[i++] = pixels[i++] = (random() * 256) | 0;
      pixels[i++] = alpha;
    }
    g.putImageData(imageData, x, y);
  })

  return (
    <div style={{ display: "grid", gridTemplateColumns: '1fr', gridTemplateRows: '1fr' }}>
      <canvas width='700' height='100' ref={canvasRef} style={{ borderRadius: '1.5rem', gridArea: '1/1/2/2' }} >Your browser does not support canvas</canvas>
      <canvas width='700' height='100' ref={noiseRef} style={{ borderRadius: '1.5rem', gridArea: '1/1/2/2' }} >Your browser does not support canvas</canvas>
    </div>
  )
}

export default VisualiserCanvas