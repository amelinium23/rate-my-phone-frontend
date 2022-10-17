import { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { AutoComplete } from '../../components/AutoComplete'
import { setIsLoading, useStore } from '../../context'
import { getComparison } from '../../services/ComparePageService'
import { getDevices } from '../../services/PhoneAutoCompleteService'
import { ApiPhoneResponse } from '../../types'

type DeviceIds = { [key: string]: string }

export const ComparePage = () => {
  const { dispatch } = useStore()
  const [deviceIds, setDeviceIds] = useState<DeviceIds>({
    first: '',
    second: '',
    third: '',
  })

  const [devices, setDevices] = useState({
    data: [],
    total: 300,
    totalPhones: 1,
  } as ApiPhoneResponse)

  const [comparison, setComparison] = useState({})

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setIsLoading(dispatch, true)
        const res = await getDevices()
        setDevices(res)
      } catch (e) {
        toast.error((e as Error).message)
      } finally {
        setIsLoading(dispatch, false)
      }
    }
    fetchDevices()
  }, [])

  const handleCompare = async () => {
    const deviceIdsArray = Object.values(deviceIds).filter((id) => id !== '')
    try {
      setIsLoading(dispatch, true)
      const res = await getComparison(deviceIdsArray)
      setComparison(res)
    } catch (e) {
      toast.error((e as Error).message)
    } finally {
      setIsLoading(dispatch, false)
    }
  }

  console.log(comparison)

  return (
    <Container className="p-0 my-2">
      <h5 className="text-center">Compare devices</h5>
      <Container className="d-flex p-0 justify-content-center">
        {Object.keys(deviceIds).map((compareIndex) => (
          <AutoComplete
            key={compareIndex}
            deviceIds={deviceIds}
            setDeviceIds={setDeviceIds}
            orderKey={compareIndex}
            devices={devices}
          />
        ))}
      </Container>
      <Container className="d-flex p-0 my-2 justify-content-center">
        <Button onClick={handleCompare}>Compare</Button>
      </Container>
    </Container>
  )
}
