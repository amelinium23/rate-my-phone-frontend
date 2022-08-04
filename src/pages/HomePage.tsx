import axios from 'axios'
import { useState, useEffect, FunctionComponent } from 'react'
import { Container, Row } from 'react-bootstrap'
import { RecommendedDeviceList } from '../components/RecommendedDeviceList'
import { RecommendedDevices } from '../types/RecommendedDevice'

const getRecommendedDevices = async () => {
  const response = await axios.get('device/recommended')
  return response.data
}

export const HomePage: FunctionComponent = () => {
  const [recommendedDevices, setRecommendedDevices] = useState([])

  useEffect(() => {
    getRecommendedDevices().then(setRecommendedDevices)
  }, [])

  return (
    <Container className="mt-2">
      <h3 className="text-center">Hello, there! 👋</h3>
      <h5 className="text-center">Our recommendation for today!</h5>
      <Row>
        {recommendedDevices.map((device: RecommendedDevices) => (
          <RecommendedDeviceList key={device.title} recommended={device} />
        ))}
      </Row>
    </Container>
  )
}
