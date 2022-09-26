import axios from 'axios'
import { useState, useEffect, FunctionComponent } from 'react'
import { Container, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { RecommendedDeviceList } from '../components/RecommendedDeviceList'
import { setIsLoading } from '../contexts/Actions'
import { useStore } from '../contexts/Store'
import { RecommendedDevices } from '../types/RecommendedDevice'

const getRecommendedDevices = async () => {
  const response = await axios.get('device/recommended')
  return response.data
}

export const HomePage: FunctionComponent = () => {
  const { dispatch } = useStore()
  const [recommendedDevices, setRecommendedDevices] = useState([])

  useEffect(() => {
    const fetchRecommendedDevices = async () => {
      try {
        setIsLoading(dispatch, true)
        const recommendedDevices = await getRecommendedDevices()
        setRecommendedDevices(recommendedDevices)
      } catch (err) {
        const er = err as Error
        toast.error(er.message)
      } finally {
        setIsLoading(dispatch, false)
      }
    }
    fetchRecommendedDevices()
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
