
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App'
import './index.css'

// Get Clerk publishable key from environment variables
// In production, you would use import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const PUBLISHABLE_KEY = "pk_test_replace-with-your-actual-key"

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key. Add it to your .env file.")
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>
);
