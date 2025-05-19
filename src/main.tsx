
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App'
import './index.css'
// Import i18n configuration first
import './i18n'

// Get Clerk publishable key from environment variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_replace-with-your-actual-key";

if (!PUBLISHABLE_KEY || PUBLISHABLE_KEY === "pk_test_replace-with-your-actual-key") {
  console.warn("Missing Clerk Publishable Key. Add it to your .env file or replace it directly in main.tsx")
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>
);
