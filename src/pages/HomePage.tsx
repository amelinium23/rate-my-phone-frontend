import axios from 'axios'
import { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { RecommendedList } from '../components/RecommendedList'
import { RecommendedDevice } from '../types/types'

const getRecommendedDevices = async () => {
  const response = await axios.get('device/recommended')
  return response.data
}

export const HomePage = () => {
  const [recommendedDevices, setRecommendedDevices] = useState([])

  useEffect(() => {
    getRecommendedDevices().then(setRecommendedDevices)
  }, [])

  return (
    <Container className="mt-2">
      <h3 className="text-center">Hello, there! 👋</h3>
      <h5 className="text-center">Our recommendation for today!</h5>
      <Row>
        {recommendedDevices.map((device: RecommendedDevice) => (
          <RecommendedList key={device.title} recommended={device} />
        ))}
      </Row>
    </Container>
  )
}
