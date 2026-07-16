import { Suspense, lazy } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { DataProvider } from './context/DataProvider'
import ErrorBoundary from './components/common/ErrorBoundary'
import PageLoader from './components/common/PageLoader'

const AppRoutes = lazy(() => import('./routes/AppRoutes'))

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <DataProvider>
              <Suspense fallback={<PageLoader text="Loading application..." />}>
                <AppRoutes />
              </Suspense>
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    borderRadius: '10px',
                  },
                  success: {
                    iconTheme: { primary: '#22C55E', secondary: '#fff' },
                  },
                  error: {
                    iconTheme: { primary: '#EF4444', secondary: '#fff' },
                  },
                }}
              />
            </DataProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
