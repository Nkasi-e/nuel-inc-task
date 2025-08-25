import { useState, useEffect, useCallback } from 'react'
import { FilterState, Warehouse } from '../types'
import { Search, Filter } from 'lucide-react'
import LoadingSpinner from './LoadingSpinner'

interface FiltersRowProps {
  filters: FilterState
  warehouses: Warehouse[]
  onFilterChange: (filters: Partial<FilterState>) => void
  isLoading?: boolean
}

const FiltersRow = ({ filters, warehouses, onFilterChange, isLoading = false }: FiltersRowProps) => {
  const [searchValue, setSearchValue] = useState(filters.search)
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(filters.search)

  // Debounce search input to prevent excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue)
    }, 300) // 300ms delay

    return () => clearTimeout(timer)
  }, [searchValue])

  // Update parent when debounced value changes
  useEffect(() => {
    if (debouncedSearchValue !== filters.search) {
      onFilterChange({ search: debouncedSearchValue })
    }
  }, [debouncedSearchValue, filters.search, onFilterChange])

  // Sync local state with parent filters
  useEffect(() => {
    setSearchValue(filters.search)
  }, [filters.search])

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value)
  }, [])

  const handleWarehouseChange = useCallback((warehouse: string) => {
    onFilterChange({ warehouse })
  }, [onFilterChange])

  const handleStatusChange = useCallback((status: string) => {
    onFilterChange({ status })
  }, [onFilterChange])

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Search Box */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {isLoading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <Search className="h-5 w-5 text-gray-400" />
            )}
          </div>
          <input
            type="text"
            placeholder="Search by name, SKU, or ID..."
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={isLoading}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Warehouse Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={filters.warehouse}
              onChange={(e) => handleWarehouseChange(e.target.value)}
              className="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none bg-white"
              disabled={isLoading}
            >
              <option value="">All Warehouses</option>
              {warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={filters.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none bg-white"
              disabled={isLoading}
            >
              <option value="">All Status</option>
              <option value="healthy">Healthy</option>
              <option value="low">Low</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FiltersRow
