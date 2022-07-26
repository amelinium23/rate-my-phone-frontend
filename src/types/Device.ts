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
