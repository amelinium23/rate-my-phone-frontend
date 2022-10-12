import axios from 'axios'

import { Device } from '../../types'

const getDevices = async () => {
  const res = await axios.get('/device')
  return res.data
}

const changeUserDevice = async (phone: Device, uid: string) => {
  const res = await axios.put('/user/device', { uid: uid, device: phone })
  return res.data
}

export { changeUserDevice, getDevices }
