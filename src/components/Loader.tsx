import { FunctionComponent } from 'react'
import { Spinner } from 'react-bootstrap'
import { useStore } from '../contexts/Store'

import '../css/Loader.css'

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
