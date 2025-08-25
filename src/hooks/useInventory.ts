import { useState, useMemo } from 'react'
import { mockProducts, mockWarehouses, getChartDataByRange } from '../data/mockData'
import { Product, FilterState, PaginationState, DateRange } from '../types'
import { calculateKPI, filterProducts, paginateProducts } from '../utils/calculations'

export const useInventory = () => {
  const [products] = useState<Product[]>(mockProducts)
  const [warehouses] = useState(mockWarehouses)
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({ label: "7d", days: 7, value: "7d" })
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    warehouse: '',
    status: ''
  })
  
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    pageSize: 10,
    totalItems: mockProducts.length
  })

 
  const chartData = useMemo(() => {
    return getChartDataByRange(selectedDateRange.value)
  }, [selectedDateRange])


  const kpis = useMemo(() => calculateKPI(products), [products])


  const filteredProducts = useMemo(() => {
    const filtered = filterProducts(products, filters.search, filters.warehouse, filters.status)
    return filtered
  }, [products, filters])


  const paginatedProducts = useMemo(() => {
    const paginated = paginateProducts(filteredProducts, pagination.currentPage, pagination.pageSize)
    return paginated
  }, [filteredProducts, pagination.currentPage, pagination.pageSize])

 
  const totalItems = useMemo(() => filteredProducts.length, [filteredProducts])


  const updatedPagination = useMemo(() => ({
    ...pagination,
    totalItems,
    currentPage: totalItems === 0 ? 1 : Math.min(pagination.currentPage, Math.ceil(totalItems / pagination.pageSize))
  }), [pagination, totalItems])

  const updateFilters = async (newFilters: Partial<FilterState>) => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      setFilters(prev => ({ ...prev, ...newFilters }))
      setPagination(prev => ({ ...prev, currentPage: 1 }))
    } catch (err) {
      setError('Failed to update filters. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const updatePagination = (newPagination: Partial<PaginationState>) => {
    setPagination(prev => ({ ...prev, ...newPagination }))
  }

  const goToPage = (page: number) => {
    const maxPage = Math.ceil(totalItems / pagination.pageSize)
    const validPage = Math.max(1, Math.min(page, maxPage))
    setPagination(prev => ({ ...prev, currentPage: validPage }))
  }

  const updateDateRange = async (newDateRange: DateRange) => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 200))
      
      setSelectedDateRange(newDateRange)
    } catch (err) {
      setError('Failed to update date range. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  return {
    products: paginatedProducts,
    warehouses,
    chartData,
    kpis,
    filters,
    pagination: updatedPagination,
    totalItems,
    selectedDateRange,
    isLoading,
    error,
    isUpdating,
    updateFilters,
    updatePagination,
    goToPage,
    updateDateRange,
    clearError
  }
}
