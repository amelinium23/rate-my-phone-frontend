import { ChangeEvent, FunctionComponent, Dispatch } from 'react'
import { Form } from 'react-bootstrap'
import { useStore } from '../contexts/Store'
import { ActionType } from '../contexts/types/StoreTypes'

interface PageSizePickerProps {
  pageSize: number
  pageSizes: number[]
  onPageSizeChange: (dispatch: Dispatch<ActionType>, pageSize: number) => void
}

export const PageSizePicker: FunctionComponent<PageSizePickerProps> = ({
  pageSize,
  pageSizes,
  onPageSizeChange,
}) => {
  const { dispatch } = useStore()

  const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onPageSizeChange(dispatch, parseInt(e.target.value))
  }

  return (
    <Form.Select size="sm" value={pageSize} onChange={handlePageSizeChange}>
      {pageSizes.map((pageSize: number) => (
        <option key={pageSize}>{pageSize}</option>
      ))}
    </Form.Select>
  )
}
