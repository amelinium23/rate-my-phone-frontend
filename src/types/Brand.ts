export interface Brand {
  brand_id: number
  brand_name: string
  key: string
}

export interface BrandResponse {
  total_pages: number
  brands: Brand[]
}
