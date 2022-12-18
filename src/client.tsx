import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { Routes } from 'generouted/react-location'

import MainLoader from './components/Loaders/MainLoader'

function Client() {
  return (
    <StrictMode>
      <Routes defaultPendingMs={0} defaultPendingElement={<MainLoader />} defaultErrorElement={<p>Błąd</p>} />
    </StrictMode>
  )
}

const app = document.getElementById('app') as Element
const root = createRoot(app)

if (app.hasChildNodes()) hydrateRoot(app, <Client />)
else root.render(<Client />)
