import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import Header from './components/Header'

// Import your publishable key
const PUBLISHABLE_KEY = "pk_test_c3F1YXJlLXJlcHRpbGUtMTQuY2xlcmsuYWNjb3VudHMuZGV2JA";

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk publishable key to the .env.local file')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      {/* <Header /> */}
      <App />
    </ClerkProvider>
  </React.StrictMode>,
)