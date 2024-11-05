import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react';

// Replace this with your actual Clerk publishable key.
const PUBLISHABLE_KEY = 'pk_test_c3F1YXJlLXJlcHRpbGUtMTQuY2xlcmsuYWNjb3VudHMuZGV2JA';

// Ensure that the publishable key is provided
if (!PUBLISHABLE_KEY) {
  throw new Error('Clerk publishable key is missing.');
}

// Type assertion is not needed here as we already know 'root' is an HTMLElement
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found.');
}

ReactDOM.createRoot(rootElement).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
);
