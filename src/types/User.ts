import { Device } from './Device'

export interface User {
  uid: string
  email: string
  password: string
  photoUrl: string
  display_name: string
  device?: Device
}
