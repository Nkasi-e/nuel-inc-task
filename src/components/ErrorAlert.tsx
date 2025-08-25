import { X } from 'lucide-react'

interface ErrorAlertProps {
  message: string
  onClose: () => void
}

const ErrorAlert = ({ message, onClose }: ErrorAlertProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg animate-fade-in">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-5 h-5 bg-red-400 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">!</span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <p className="text-sm text-red-700 mt-1">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default ErrorAlert
