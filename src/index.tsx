import React from 'react'
import ReactDom from 'react-dom'
import './normalize'
import { AppComponent } from './App'

window.addEventListener('load', () => {
  ReactDom.render(<AppComponent />, document.getElementById('app-root'))
})
