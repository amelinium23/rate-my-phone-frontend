import { FunctionComponent } from 'react'
import { Pagination } from 'react-bootstrap'
import { setPageNumber } from '../contexts/Actions'
import { useStore } from '../contexts/Store'

interface PaginationComponentProps {
  currentPage: number
  dataLength: number
  pageSize: number
}

export const PaginationComponent: FunctionComponent<
  PaginationComponentProps
> = ({ currentPage, dataLength, pageSize }) => {
  const { dispatch } = useStore()
  const pageNumbers = Array.from(
    { length: dataLength / pageSize },
    (_, k) => k + 1
  )

  const onPrevPage = () => {
    setPageNumber(dispatch, currentPage - 1)
  }

  const onNextPage = () => {
    setPageNumber(dispatch, currentPage + 1)
  }

  const onPageClick = (pageNumber: number) => {
    setPageNumber(dispatch, pageNumber)
  }

  return (
    <Pagination size="sm">
      <Pagination.Prev
        disabled={currentPage === pageNumbers[0]}
        onClick={onPrevPage}
      />
      {pageNumbers.map((pageNumber) => (
        <Pagination.Item
          onClick={() => onPageClick(pageNumber)}
          active={currentPage === pageNumber}
          key={pageNumber}
        >
          {pageNumber}
        </Pagination.Item>
      ))}
      <Pagination.Next
        disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
        onClick={onNextPage}
      />
    </Pagination>
  )
}
