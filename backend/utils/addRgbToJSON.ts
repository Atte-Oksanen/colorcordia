import fs from 'fs'
import { colorConverter } from './colorConverters'
import { NCS } from '../types/colorTypes'

const inputColors: NCS[] = JSON.parse(fs.readFileSync('../data/ncs_values_new.json').toString())

const outputColors = inputColors.map(element => {
  return {
    ncs: element.ncs,
    hex: element.hex,
    rgb: colorConverter.hexToRgb(element.hex)
  }
})

fs.writeFileSync('../data/ncs_values_with_hex.json', JSON.stringify(outputColors))