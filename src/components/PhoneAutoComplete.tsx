import axios from 'axios'
import {
  FunctionComponent,
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react'
import { Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { setIsLoading } from '../contexts/Actions'
import { useStore } from '../contexts/Store'
import { ApiPhoneResponse, Device, PhoneResponse } from '../types/Device'

const getDevices = async () => {
  const res = await axios.get('/device')
  return res.data
}

const changeDevice = async (phone: Device, uid: string) => {
  const res = await axios.put('/user/device', { uid: uid, device: phone })
  return res.data
}

interface PhoneAutoCompleteProps {
  phone: Device
  setIsEditing: Dispatch<SetStateAction<boolean>>
}

export const PhoneAutoComplete: FunctionComponent<PhoneAutoCompleteProps> = ({
  phone,
  setIsEditing,
}) => {
  const { state, dispatch } = useStore()
  const [devices, setDevices] = useState<ApiPhoneResponse>({
    data: [],
    total: 300,
    totalPhones: 1,
  } as ApiPhoneResponse)

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setIsLoading(dispatch, true)
        const res = await getDevices()
        setDevices(res)
      } catch (e) {
        const er = e as Error
        toast.error(er.message)
      } finally {
        setIsLoading(dispatch, false)
      }
    }
    fetchDevices()
  }, [])

  const handleSelectingDevice = async (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedDeviceName = e.target.value
    const selectedDevice = devices.data
      .map((response) => response.device_list)
      .flat()
      .find((device) => device.device_name === selectedDeviceName)
    const uid = state.auth.currentUser?.uid
    if (uid && selectedDevice) {
      try {
        setIsLoading(dispatch, true)
        const res = await changeDevice(selectedDevice, uid)
        toast.success(res)
        setIsEditing(false)
      } catch (e) {
        const er = e as Error
        toast.error(er.message)
      } finally {
        setIsLoading(dispatch, false)
      }
    }
  }

  return (
    <Form.Select value={phone.device_name} onChange={handleSelectingDevice}>
      {devices.data.map(
        (item: PhoneResponse) =>
          item.brand_name !== '' &&
          item.device_list.length > 0 && (
            <optgroup key={item.brand_id} label={item.brand_name}>
              {item.device_list.map((device: Device) => (
                <option key={device.device_id}>{device.device_name}</option>
              ))}
            </optgroup>
          )
      )}
    </Form.Select>
  )
}
