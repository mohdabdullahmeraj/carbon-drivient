import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { Toaster } from '@/components/ui/sonner';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
        <App />
        {/* Global toast system (Sonner) */}
        <Toaster
          richColors
          closeButton
          position="top-right"
        />
      </BrowserRouter>
  </React.StrictMode>
)
