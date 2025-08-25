import { DateRange } from '../types'

interface HeaderProps {
  onDateRangeChange: (dateRange: DateRange) => void
  selectedRange: DateRange
}

const Header = ({ onDateRangeChange, selectedRange }: HeaderProps) => {
  const dateRanges = [
    { label: "7d", days: 7, value: "7d" },
    { label: "14d", days: 14, value: "14d" },
    { label: "30d", days: 30, value: "30d" }
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
    
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">SupplySight</h1>
          </div>

  
          <div className="flex items-center space-x-2">
            {dateRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => onDateRangeChange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedRange.value === range.value
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
