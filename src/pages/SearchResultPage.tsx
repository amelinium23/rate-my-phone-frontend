import axios from 'axios'
import { FunctionComponent, useEffect, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { NewsItem } from '../components/Items/NewsItem'
import { ReviewItem } from '../components/Items/ReviewItem'
import { setIsLoading } from '../contexts/Actions'
import { useStore } from '../contexts/Store'
import { SearchResult } from '../types/SearchResult'

interface LocationState {
  searchString: string
}

const getSearchResults = async (searchString: string) => {
  const res = await axios.get('/device/search', {
    params: { query: searchString },
  })
  return res.data
}

export const SearchResultPage: FunctionComponent = () => {
  const { dispatch } = useStore()
  const { state: locationState } = useLocation()
  const { searchString } = locationState as LocationState
  const [searchResults, setSearchResults] = useState<SearchResult>({})

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setIsLoading(dispatch, true)
        const results = await getSearchResults(searchString)
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
              <h5>{title.replace('_', ' ')}</h5>
              {value &&
                value.map((item) => {
                  return (
                    <>
                      <Col md={4}>
                        {'news_title' in item ? (
                          <NewsItem news={item} />
                        ) : (
                          <ReviewItem review={item} />
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
