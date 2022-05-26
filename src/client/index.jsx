import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Header } from '../shared/Header'

window.addEventListener('load', () => {
  const container = document.getElementById('app-root')
  ReactDom.hydrate(<Header />, container)
})
