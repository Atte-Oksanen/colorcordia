/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import DownloadIcon from "../icons/DownloadIcon"

const DownloadablePalette = ({ palette, type }) => {

  const downloadImage = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 1500
    canvas.height = 1080
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = 'black'
    for (let index = 0, x = 0; index < palette.length; index++, x = x + 300) {
      ctx.font = '38px Rubik'
      ctx.fillStyle = palette[index].hex
      ctx.fillRect(x, 0, 300, 850)
      ctx.fillStyle = 'black'
      ctx.fillText(`${palette[index].hex}`, x + 15, 900)
      ctx.font = 'lighter 25px Rubik'
      ctx.fillText(`${palette[index].name}`, x + 15, 950)
    }
    ctx.font = '30px Rubik'
    ctx.fillText("ColorCordia*", 15, 1060)
    const text = `${type} pallette from ${palette[2].hex}`
    ctx.fillText(text, 15, 1010)
    const link = document.createElement('a')
    link.download = `${type}-${palette.map(element => element.hex).toString().replaceAll(',', '-')}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <button className="pill-button" onClick={downloadImage}>
      Download
      <div className="inline-block align-middle ml-2">
        <DownloadIcon sizeClass='h-5 w-5'></DownloadIcon>
      </div>
    </button>
  )
}

export default DownloadablePalette