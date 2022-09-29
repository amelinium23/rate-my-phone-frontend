import { ChangeEvent, Dispatch, FunctionComponent } from 'react'
import { Form } from 'react-bootstrap'

import { Action, useStore } from '../../context'

interface SortModeSelectProps {
  sortMode: string
  sortModes: string[]
  onSortModeChange: (dispatch: Dispatch<Action>, sortMode: string) => void
}

export const SortModeSelect: FunctionComponent<SortModeSelectProps> = ({
  sortMode,
  sortModes,
  onSortModeChange,
}) => {
  const { dispatch } = useStore()

  const handleSortModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const sortMode = e.target.value
    onSortModeChange(dispatch, sortMode)
  }

  return (
    <Form.Select size="sm" value={sortMode} onChange={handleSortModeChange}>
      {sortModes.map((sortMode: string) => (
        <option key={sortMode}>
          {sortMode.charAt(0).toLocaleUpperCase() + sortMode.slice(1)}
        </option>
      ))}
    </Form.Select>
  )
}
