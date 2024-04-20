

import {useQuery} from '@tanstack/react-query'
import { fieldInfo } from '../star_data/fieldInfo.js'

export const fetchDatFile = async () => {
  // Fetch the .dat file content using fetch or any other appropriate method
  const response = await fetch('./star_data/hip_main.dat')
  const data = await response.text()
  const lines = data.split('\n')

  const parsedData = []



  // Only keep a random sample of 1000 lines
  const numLines = lines.length
  const sampleSize = 5100
  const sampledIndices = new Set()

  while (sampledIndices.size < sampleSize) {
    const index = Math.floor(Math.random() * numLines)
    sampledIndices.add(index)
  }

  const sampledLines = Array.from(sampledIndices).map(index => lines[index])

  for (const line of sampledLines) {
    const fields = line.split('|').map(field => field.trim())
    const hipNumber = parseInt(fields[1])
    if (!isNaN(hipNumber)) {
      const object = {}
      fieldInfo.forEach((field, index) => {
        const value = fields[index]
        if (value !== "") {
          if (field.type === "int") {
            object[field.name] = parseInt(value)
          } else if (field.type === "float") {
            object[field.name] = parseFloat(value)
          } else {
            object[field.name] = value
          }
        }
      })
      parsedData.push(object)
    }
  }

  return parsedData
}

export const useHTCatalogue = () => {
  const query = useQuery({
    queryKey: ['ht-catalogue'],
    queryFn: () => fetchDatFile()
  })
  return query
}
