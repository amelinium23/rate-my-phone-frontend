import { ChangeEvent, Dispatch } from 'react'
import { Form } from 'react-bootstrap'

import { Action, useStore } from '../../context'

interface PageSizePickerProps {
  pageSize: number
  pageSizes: number[]
  onPageSizeChange: (dispatch: Dispatch<Action>, pageSize: number) => void
}

export const PageSizePicker = ({
  pageSize,
  pageSizes,
  onPageSizeChange,
}: PageSizePickerProps) => {
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
