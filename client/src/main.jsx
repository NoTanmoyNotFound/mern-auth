import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import { Router } from 'express'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
    <App />
    </Router>
    
  </Provider>,
)
