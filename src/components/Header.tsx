import { useState } from 'react'
import { dateRanges } from '../data/mockData'
import { DateRange } from '../types'
import { Calendar, TrendingUp } from 'lucide-react'

interface HeaderProps {
  onDateRangeChange: (range: DateRange) => void
}

const Header = ({ onDateRangeChange }: HeaderProps) => {
  const [selectedRange, setSelectedRange] = useState<DateRange>(dateRanges[0])

  const handleRangeChange = (range: DateRange) => {
    setSelectedRange(range)
    onDateRangeChange(range)
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SupplySight</h1>
              <p className="text-sm text-gray-500">Daily Inventory Dashboard</p>
            </div>
          </div>

          {/* Date Range Selector */}
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div className="flex bg-gray-100 rounded-lg p-1">
              {dateRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => handleRangeChange(range)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                    selectedRange.value === range.value
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
