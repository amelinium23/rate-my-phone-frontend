export interface Device {
  device_image: string
  device_name: string
  key: string
}

export interface Phone extends Device {
  id: number
  device_type?: string
}

export interface PhoneResponse {
  brand_id: number
  brand_name: string
  device_list: Phone[]
  key: string
}

export interface DeviceDetails extends Device {
  battery: string
  batteryType: string
  body: string
  camera: string
  comment: string
  display_res: string
  display_size: string
  more_information: object[]
  more_specification: object[]
  os_type: string
  prices: object
  pictures: string[]
  release_date: string
  storage: string
  video: string
}
