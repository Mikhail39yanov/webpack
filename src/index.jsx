import React from 'react'
import ReactDom from 'react-dom'
import './normalize.scss'
import { Header } from './Header'

window.addEventListener('load', () => {
  const container = document.getElementById('app-root')
  ReactDom.render(<Header />, container)
})
