export interface Device {
  key: string
  device_image: string
  device_name: string
  device_id: number
  no?: number
  daily_hits: string
  device_type?: string
}

export interface PhoneResponse {
  key: string
  brand_id: number
  brand_name: string
  device_list: Device[]
}

export interface ApiPhoneResponse {
  total: number
  totalPhones: number
  data: PhoneResponse[]
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
  more_specification: MoreSpecification[]
  os_type: string
  prices: Record<string, PriceDetails[]>
  pictures: string[]
  release_date: string
  storage: string
  video: string
}

export interface SpecificationDetails {
  data: string[]
  title: string
}

export interface MoreSpecification {
  title: string
  data: SpecificationDetails[]
}

export interface PriceDetails {
  price: string
  buy_url: string
  shop_image: string
}
