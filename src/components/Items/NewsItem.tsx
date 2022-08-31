import { FunctionComponent } from 'react'
import { Card } from 'react-bootstrap'
import { News } from '../../types/SearchResult'

interface NewsItemProps {
  news: News
}

export const NewsItem: FunctionComponent<NewsItemProps> = ({ news }) => {
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
