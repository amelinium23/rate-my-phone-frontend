import { Device } from '../types'
import { getDetails } from './DetailsPageService'

const getComparison = async (deviceKeys: string[]) => {
  const comparisons: { [key: string]: object } = {}
  const promises = deviceKeys.map(async (key) => {
    return await getDetails(key)
  })
  const data = await Promise.all(promises)
  data.forEach((device: Device) => {
    comparisons[device.key] = device
  })
  return comparisons
}

export { getComparison }
