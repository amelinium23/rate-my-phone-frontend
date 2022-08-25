import axios from 'axios'
import ReactDOM from 'react-dom'
import { StrictMode } from 'react'
import { App } from './App'
import { URL } from './utils/defaults'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.min.css'

axios.defaults.baseURL = URL
  
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
)
