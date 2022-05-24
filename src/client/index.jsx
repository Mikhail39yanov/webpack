// import * as React from 'react'
// import * as ReactDom from 'react-dom'
// import { Header } from '../shared/Header'
import * as React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { Header } from '../shared/Header'

window.addEventListener('load', () => {
  // const container = document.getElementById('app-root')
  // ReactDom.hydrate(<Header />, container)
  const container = document.getElementById('app-root')
  const root = hydrateRoot(container, <Header />)
})
