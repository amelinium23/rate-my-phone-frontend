import { Card } from 'react-bootstrap'

import { News } from '../../types'

interface NewsItemProps {
  news: News
}

export const NewsItem = ({ news }: NewsItemProps) => {
  return (
    <Card className="d-flex justify-content-center my-2">
      <Card.Header>
        <Card.Title>{news.news_title}</Card.Title>
      </Card.Header>
      <a href={news.news_url} target="blank">
        <Card.Img src={news.news_image} alt={news.news_title} />
      </a>
    </Card>
  )
}
