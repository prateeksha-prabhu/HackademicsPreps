import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'  // Use our updated App component
import { BrowserRouter } from 'react-router-dom'
import ParentContextProvider from './context/ParentContext.jsx'

// Add Font Awesome for icons
import '@fortawesome/fontawesome-free/css/all.min.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ParentContextProvider>
      <App />
    </ParentContextProvider>
  </BrowserRouter>
)
