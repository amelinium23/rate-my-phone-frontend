import axios from 'axios'
import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'

const getRecommendedDevices = async () => {
  const response = await axios.get(
    'https://rate-my-phone.herokuapp.com/device/recommended'
  )
  return response.data
}

export const HomePage = () => {
  const [recommendedDevices, setRecommendedDevices] = useState([])

  useEffect(() => {
    getRecommendedDevices().then(setRecommendedDevices)
  }, [])

  console.log(recommendedDevices)

  return <Container></Container>
}
