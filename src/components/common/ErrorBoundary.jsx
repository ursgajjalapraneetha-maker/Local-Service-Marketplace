import { Component } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, RotateCcw, Home } from 'lucide-react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="min-h-[60vh] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="mx-auto w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle size={36} className="text-red-400" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-secondary mb-2">
              Something went wrong
            </h1>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              An unexpected error occurred. Please try again or return to the
              homepage.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                <RotateCcw size={15} />
                Try Again
              </button>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-secondary text-sm font-semibold rounded-xl border border-gray-200 hover:border-gray-300 transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                <Home size={15} />
                Go Home
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
