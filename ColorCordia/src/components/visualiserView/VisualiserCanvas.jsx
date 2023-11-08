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
    const firstGradient = ctx.createRadialGradient(-10, 150, 30, -40, 150, 800)
    firstGradient.addColorStop(0, colors[2])
    firstGradient.addColorStop(1, 'transparent')
    ctx.fillStyle = firstGradient
    ctx.beginPath();
    ctx.arc(-40, 150, 800, 0, Math.PI * 2, true)
    ctx.fill()
    ctx.closePath()
    const secondGradient = ctx.createRadialGradient(950, -100, 100, 1050, -100, 750)
    secondGradient.addColorStop(0, colors[3])
    secondGradient.addColorStop(1, 'transparent')
    ctx.fillStyle = secondGradient
    ctx.beginPath();
    ctx.arc(1050, -100, 800, 0, Math.PI * 2, true)
    ctx.fill()
    ctx.closePath()
    const thirdGradient = ctx.createRadialGradient(380, 980, 90, 400, 880, 540)
    thirdGradient.addColorStop(0, colors[2])
    thirdGradient.addColorStop(1, 'transparent')
    ctx.fillStyle = thirdGradient
    ctx.beginPath();
    ctx.arc(380, 880, 650, 0, Math.PI * 2, true)
    ctx.fill()
    ctx.closePath()
  }, [colors])

  useEffect(() => {
    const canvas = noiseRef.current
    const x = 0;
    const y = 0;
    const width = canvas.width;
    const height = canvas.height;
    const alpha = 10;
    var g = canvas.getContext("2d", { willReadFrequently: true }),
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
  }, [])

  return (
    <div style={{ display: "grid", gridTemplateColumns: '1fr', gridTemplateRows: '1fr', width: '100%', height: '100%', overflow: 'hidden' }}>
      <canvas width='3840' height='2160' ref={canvasRef} style={{ gridArea: '1/1/2/2' }} >Your browser does not support canvas</canvas>
      <canvas width='3840' height='2160' ref={noiseRef} style={{ gridArea: '1/1/2/2' }} >Your browser does not support canvas</canvas>
    </div>
  )
}

export default VisualiserCanvas