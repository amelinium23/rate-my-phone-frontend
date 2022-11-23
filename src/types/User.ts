import { Device } from './Device'

export interface User {
  uid: string
  email: string
  password: string
  photo_url: string
  display_name: string
  device?: Device
}

export interface FirebaseUser {
  uid: string
  display_name: string
  email: string
  photo_url: string
}
