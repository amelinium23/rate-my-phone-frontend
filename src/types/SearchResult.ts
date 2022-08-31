export interface SearchResult {
  [key: string]: News[] | Review[] | null
}

export interface News {
  news_url: string
  news_title: string
  news_image: string
}

export interface Review {
  review_url: string
  review_title: string
  review_image: string
}
