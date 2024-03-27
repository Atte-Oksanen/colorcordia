import { useEffect, useRef } from "react"

interface props {
  colors: string[]
}

const VisualiserCanvas = ({ colors }: props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const noiseRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }
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
    if (!canvas) {
      return
    }
    const context = canvas.getContext("2d", { willReadFrequently: true })
    if (!context) {
      return
    }
    const alpha = 10;
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    for (let i = 0; i < pixels.length;) {
      pixels[i++] = pixels[i++] = pixels[i++] = (Math.random() * 256) | 0;
      pixels[i++] = alpha;
    }
    context.putImageData(imageData, 0, 0);
  }, [])

  return (
    <div style={{ display: "grid", gridTemplateColumns: '1fr', gridTemplateRows: '1fr', width: '100%', height: '100%', overflow: 'hidden' }}>
      <canvas width='3840' height='2160' ref={canvasRef} style={{ gridArea: '1/1/2/2' }} >Your browser does not support canvas</canvas>
      <canvas width='3840' height='2160' ref={noiseRef} style={{ gridArea: '1/1/2/2' }} >Your browser does not support canvas</canvas>
    </div>
  )
}

export default VisualiserCanvas