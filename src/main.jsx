import React from 'react'
import './index.css'
import App from './App.jsx'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Không refetch khi focus window
      retry: 1, // Retry 1 lần nếu fail
      staleTime: 5 * 60 * 1000, // Data fresh trong 5 phút
    },
  },
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>  
  </React.StrictMode>,
)
