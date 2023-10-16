import { isNil, mean } from 'lodash'
import { ICargo, IShipment } from './interfaces.ts'

const str = (numString: string | undefined): number => {
  try {
    if (!numString) {
      return 0
    }
    return parseInt(numString, 10)
  } catch (ex) {
    console.log(ex)
    return 0
  }
}

export const getAverageShipmentTime = (shipments: IShipment[]): number | null => {
  const shipmentTimes: number[] = []
  for (let i = 0; i < shipments.length; i++) {
    const currentShipment = shipments[i]
    const nextShipment: IShipment | undefined = shipments[i + 1]
    if (nextShipment && !isNil(nextShipment.timeAgo)) {
      const currentTime = str(currentShipment.timeAgo)
      const nextTime = str(nextShipment.timeAgo)
      const diff = nextTime - currentTime
      shipmentTimes.push(diff)
    }
  }

  if (!shipmentTimes.length) {
    return null
  }

  return mean(shipmentTimes)
}

export const getAverageResourcesPerMinute = (shipments: IShipment[], avgShipmentTime: number) => {
  const resourceIndex = {}

  if (!shipments) {
    return resourceIndex
  }

  function processResource(r: ICargo) {
    const {
      cargoName,
      cargoAmount
    } = r

    if (!cargoName) {
      return
    }

    if (!resourceIndex[cargoName]) {
      resourceIndex[cargoName] = str(cargoAmount)
    } else {
      resourceIndex[cargoName] += str(cargoAmount)
    }
  }

  shipments.forEach((shipment) => {
    const { resources } = shipment
    resources?.forEach((resource) => {
      processResource(resource)
    })
  })

  const averagePerShipment = Object.keys(resourceIndex).reduce((acc, current) => {
    const value = resourceIndex[current]
    return {
      ...acc,
      [current]: value / shipments.length
    }
  }, {})

  const averagePerMinute = Object.keys(averagePerShipment).reduce((acc, current) => {
    const value = averagePerShipment[current]
    return {
      ...acc,
      [current]: value / avgShipmentTime
    }
  }, {})

  return { averagePerShipment, averagePerMinute }
}

export function removeItemAtIndex<T>(array: T[], index: number): T[] {
  // Check if the index is valid
  if (index < 0 || index >= array.length) {
    throw new Error('Index out of range')
  }

  // Create a new array without the item at the specified index
  const newArray = [...array.slice(0, index), ...array.slice(index + 1)]

  return newArray
}
