import { Component } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw } from 'lucide-react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Dashboard Error:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 px-4"
          role="alert"
        >
          <div className="w-16 h-16 rounded-2xl bg-danger/10 flex items-center justify-center mb-6">
            <AlertTriangle className="w-8 h-8 text-danger" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-heading font-bold text-secondary mb-2">
            Something went wrong
          </h2>
          <p className="text-sm text-gray-500 text-center max-w-md mb-8">
            An unexpected error occurred while loading this page. Please try again.
          </p>
          <button
            onClick={this.handleRetry}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </motion.div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
