import axios from 'axios'

import { Opinion } from '../../types'

const getOpinions = async (deviceKey: string) => {
  const res = await axios.get('/device/opinion', {
    params: { k: deviceKey },
  })
  return res.data
}

const addOpinion = async (opinion: Opinion, token: string) => {
  const res = await axios.post(
    '/device/opinion/add',
    { ...opinion, device_key: opinion.deviceKey },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res.data
}

export { addOpinion, getOpinions }
