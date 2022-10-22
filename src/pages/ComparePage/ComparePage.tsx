import { useCallback, useEffect, useState } from 'react'
import { Container, Image, Table } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { AutoComplete } from '../../components/AutoComplete'
import { setIsLoading, useStore } from '../../context'
import { getComparison } from '../../services/ComparePageService'
import { getDevices } from '../../services/PhoneAutoCompleteService'
import { ApiPhoneResponse, DeviceDetails } from '../../types'
import { notUsedKeysDetailsPage } from '../../utils/constants'
import { upperFirstLetter } from '../../utils/helperFunctions'

export const ComparePage = () => {
  const { state, dispatch } = useStore()
  const [deviceIds, setDeviceIds] = useState<Record<string, string>>({
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

  const [comparison, setComparison] = useState<Record<string, DeviceDetails>>(
    {}
  )
  const [response, setResponse] = useState<Record<string, DeviceDetails>>({})

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
        setResponse(res)
        const comparison = Object.keys(res).reduce((obj, deviceId) => {
          return {
            ...obj,
            [deviceId]: Object.keys(res[deviceId])
              .filter(
                (key) =>
                  !notUsedKeysDetailsPage.includes(key) && key !== 'device_name'
              )
              .reduce((comparisonDetails, key) => {
                return {
                  ...comparisonDetails,
                  [key]: res[deviceId][key as keyof DeviceDetails],
                }
              }, {}),
          }
        }, {})
        setComparison(comparison)
      } catch (e) {
        toast.error((e as Error).message)
      } finally {
        setIsLoading(dispatch, false)
      }
    }
    fetchComparison()
  }, [deviceIds])

  return !state.isLoading ? (
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
                    <td></td>
                    {Object.values(deviceIds).map(
                      (deviceId) =>
                        deviceId !== '' && (
                          <td key={deviceId}>
                            <p className="text-center">
                              {response[deviceId]?.device_name}
                            </p>
                            <div className="d-flex justify-content-center">
                              <Image
                                src={response[deviceId]?.device_image}
                                height="30%"
                              />
                            </div>
                          </td>
                        )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(comparison[Object.keys(comparison)[0]]).map(
                    (key) => (
                      <tr key={key}>
                        <td>{upperFirstLetter(key.replace(/_/g, ' '))}</td>
                        {Object.keys(comparison).map((deviceKey) => (
                          <td key={deviceKey}>
                            {comparison[deviceKey][
                              key as keyof DeviceDetails
                            ] || 'N/A'}
                          </td>
                        ))}
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            )}
          </Container>
        </>
      )}
    </Container>
  ) : null
}
