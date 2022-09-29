import './index.css'

import { FunctionComponent } from 'react'
import { Spinner } from 'react-bootstrap'

import { useStore } from '../../context/Store'

export const Loader: FunctionComponent = () => {
  const { state } = useStore()

  const loaderStyle = {
    display: state.isLoading ? 'flex' : 'none',
  }

  return (
    <div style={loaderStyle} className="loadingWrapper">
      <Spinner animation="grow" variant="secondary" />
    </div>
  )
}
