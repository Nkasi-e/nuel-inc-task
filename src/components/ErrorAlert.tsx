import { AlertTriangle, X } from 'lucide-react'

interface ErrorAlertProps {
  error: string
  onDismiss: () => void
  className?: string
}

const ErrorAlert = ({ error, onDismiss, className = '' }: ErrorAlertProps) => {
  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start space-x-3">
        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
        
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800">
            Error
          </h3>
          <p className="text-sm text-red-700 mt-1">
            {error}
          </p>
        </div>
        
        <button
          onClick={onDismiss}
          className="text-red-400 hover:text-red-600 transition-colors duration-200 flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default ErrorAlert
