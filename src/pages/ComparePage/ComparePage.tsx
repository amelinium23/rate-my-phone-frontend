import { useCallback, useEffect, useState } from 'react'
import { Container, Image, Table } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { AutoComplete } from '../../components/AutoComplete'
import { setIsLoading, useStore } from '../../context'
import { getComparison } from '../../services/ComparePageService'
import { getDevices } from '../../services/PhoneAutoCompleteService'
import { ApiPhoneResponse, DeviceDetails } from '../../types'
import { upperFirstLetter } from '../../utils/helperFunctions'

type DeviceIds = { [key: string]: string }

export const ComparePage = () => {
  const { state, dispatch } = useStore()
  const [deviceIds, setDeviceIds] = useState<DeviceIds>({
    first: '',
    second: '',
    third: '',
  })
  const getMemoizedDevices = useCallback(async () => await getDevices(), [])
  const [devices, setDevices] = useState({
    data: [],
    total: 300,
    totalPhones: 1,
  } as ApiPhoneResponse)

  const [comparison, setComparison] = useState<{
    [key: string]: DeviceDetails
  }>({})

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setIsLoading(dispatch, true)
        const res = await getMemoizedDevices()
        setDevices(res)
      } catch (e) {
        toast.error((e as Error).message)
      } finally {
        setIsLoading(dispatch, false)
      }
    }
    fetchDevices()
  }, [])

  useEffect(() => {
    const fetchComparison = async () => {
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
    fetchComparison()
  }, [deviceIds])

  console.log(deviceIds)
  console.log(comparison)

  return (
    !state.isLoading && (
      <Container className="p-0 my-2">
        <h5 className="text-center">Compare devices</h5>
        <Container className="d-flex p-0 justify-content-center">
          {Object.entries(deviceIds).map(([orderKey, deviceId]) => (
            <AutoComplete
              key={orderKey}
              deviceIds={deviceIds}
              setDeviceIds={setDeviceIds}
              orderKey={orderKey}
              devices={devices}
              deviceId={deviceId}
            />
          ))}
        </Container>
        {state.isLoading ? null : (
          <>
            <Container className="d-flex my-2 justify-content-center">
              {Object.keys(comparison).length > 0 && (
                <Table bordered hover>
                  <thead>
                    <tr>
                      {Object.values(deviceIds).map(
                        (deviceId) =>
                          deviceId !== '' && (
                            <td key={deviceId}>
                              <p className="text-center">
                                {comparison[deviceId]?.device_name}
                              </p>
                              <div className="d-flex justify-content-center">
                                <Image
                                  src={comparison[deviceId]?.device_image}
                                  height="30%"
                                />
                              </div>
                            </td>
                          )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Object.values(deviceIds)
                        .filter((deviceKey) => deviceKey !== '')
                        .map((deviceKey) => (
                          <td className="text-center" key={deviceKey}>
                            {comparison[deviceKey]?.device_name}
                          </td>
                        ))}
                    </tr>
                    {Object.keys(comparison).length > 0 &&
                      Object.values(comparison).map((deviceDetails) =>
                        Object.entries(deviceDetails).map(([key, value]) => (
                          <tr key={key}>
                            <td>{upperFirstLetter(key.replace(/_/g, ' '))}</td>
                            <td>{JSON.stringify(value)}</td>
                          </tr>
                        ))
                      )}
                  </tbody>
                </Table>
              )}
            </Container>
          </>
        )}
      </Container>
    )
  )
}
