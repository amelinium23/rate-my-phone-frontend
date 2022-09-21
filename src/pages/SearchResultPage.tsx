import axios from 'axios'
import { FunctionComponent, useEffect, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import { NewsItem } from '../components/Items/NewsItem'
import { ReviewItem } from '../components/Items/ReviewItem'
import { setIsLoading } from '../contexts/Actions'
import { useStore } from '../contexts/Store'
import { SearchResult } from '../types/SearchResult'

const getSearchResults = async (searchString: string) => {
  const res = await axios.get('/device/search', {
    params: { query: searchString },
  })
  return res.data
}

export const SearchResultPage: FunctionComponent = () => {
  const { dispatch } = useStore()
  const { query } = useParams()
  const [searchResults, setSearchResults] = useState<SearchResult>({})

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setIsLoading(dispatch, true)
        const results = await getSearchResults(query ? query : '')
        setSearchResults(results)
      } catch (err: any) {
        toast.error(err.message)
      } finally {
        setIsLoading(dispatch, false)
      }
    }
    fetchSearchResults()
  }, [])

  return (
    <Container className="my-2">
      <h5 className="text-center">Search result</h5>
      <Row>
        {Object.entries(searchResults).map(([key, value]) => {
          let title = key.charAt(0).toUpperCase() + key.slice(1)
          return (
            <>
              <h5 key={title}>{title.replace('_', ' ')}</h5>
              {value?.length === 0 && (
                <p key={`no-result-found-p-${Math.round(Math.random() * 100)}`}>
                  No results found
                </p>
              )}
              {value &&
                value.map((item) => {
                  return (
                    <>
                      <Col
                        key={`col-${Math.round(Math.random() * 100)}`}
                        md={4}
                      >
                        {'news_title' in item ? (
                          <NewsItem key={item.news_title} news={item} />
                        ) : (
                          <ReviewItem key={item.review_title} review={item} />
                        )}
                      </Col>
                    </>
                  )
                })}
            </>
          )
        })}
      </Row>
    </Container>
  )
}
