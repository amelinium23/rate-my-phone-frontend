export interface Device {
  device_image: string
  device_name: string
  key: string
}

export interface Phone extends Device {
  id: number
  device_type?: string
}
