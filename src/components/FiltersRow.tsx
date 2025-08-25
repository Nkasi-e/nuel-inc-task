import { FilterState, Warehouse } from '../types'
import { Search, Filter, X } from 'lucide-react'
import LoadingSpinner from './LoadingSpinner'

interface FiltersRowProps {
  filters: FilterState
  warehouses: Warehouse[]
  onFiltersChange: (filters: Partial<FilterState>) => void
  isLoading?: boolean
}

const FiltersRow = ({ filters, warehouses, onFiltersChange, isLoading = false }: FiltersRowProps) => {
  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'healthy', label: 'Healthy' },
    { value: 'low', label: 'Low' },
    { value: 'critical', label: 'Critical' }
  ]

  const clearFilters = () => {
    onFiltersChange({ search: '', warehouse: '', status: '' })
  }

  const hasActiveFilters = filters.search || filters.warehouse || filters.status

  return (
    <div className="border-b border-gray-200 pb-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Products</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isLoading}
          >
            <X className="w-4 h-4" />
            <span>Clear filters</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Box */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, SKU, or ID..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
            className={`input-field pl-10 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <LoadingSpinner size="sm" />
            </div>
          )}
        </div>

        {/* Warehouse Dropdown */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <select
            value={filters.warehouse}
            onChange={(e) => onFiltersChange({ warehouse: e.target.value })}
            className={`input-field pl-10 appearance-none cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            <option value="">All Warehouses</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <select
            value={filters.status}
            onChange={(e) => onFiltersChange({ status: e.target.value })}
            className={`input-field pl-10 appearance-none cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FiltersRow
