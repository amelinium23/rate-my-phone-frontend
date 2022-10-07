import './index.css'

import { Spinner } from 'react-bootstrap'

import { useStore } from '../context/Store'

export const Loader = () => {
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
