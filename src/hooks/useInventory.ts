import { useState, useMemo } from 'react'
import { useQuery, useMutation, useApolloClient } from '@apollo/client'
import { GET_PRODUCTS, GET_WAREHOUSES, GET_CHART_DATA, GET_KPIS, UPDATE_PRODUCT_DEMAND, TRANSFER_STOCK } from '../graphql/queries'
import { FilterState, PaginationState, DateRange } from '../types'

export const useInventory = () => {
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
    totalItems: 0
  })

  // GraphQL Queries
  const { data: productsData, loading: productsLoading, error: productsError } = useQuery(GET_PRODUCTS, {
    variables: {
      search: filters.search || undefined,
      warehouse: filters.warehouse || undefined,
      status: filters.status || undefined,
      page: pagination.currentPage,
      pageSize: pagination.pageSize
    },
    fetchPolicy: 'cache-and-network'
  })

  const { data: warehousesData, loading: warehousesLoading } = useQuery(GET_WAREHOUSES, {
    fetchPolicy: 'cache-first'
  })

  const { data: chartData, loading: chartLoading } = useQuery(GET_CHART_DATA, {
    variables: { range: selectedDateRange.value },
    fetchPolicy: 'cache-and-network'
  })

  const { data: kpisData, loading: kpisLoading } = useQuery(GET_KPIS, {
    fetchPolicy: 'cache-and-network'
  })

  // GraphQL Mutations
  const [updateDemand] = useMutation(UPDATE_PRODUCT_DEMAND)
  const [transferStock] = useMutation(TRANSFER_STOCK)
  // const client = useApolloClient()

  // Derived data
  const products = productsData?.products || []
  const warehouses = warehousesData?.warehouses || []
  const chartDataPoints = chartData?.chartData || []
  const kpis = kpisData?.kpis || { totalStock: 0, totalDemand: 0, fillRate: 0 }

  // Update total items when products change
  const totalItems = useMemo(() => {
    return 10 // This should come from the API response
  }, [products])

  // Update pagination when total items change
  const updatedPagination = useMemo(() => ({
    ...pagination,
    totalItems,
    currentPage: totalItems === 0 ? 1 : Math.min(pagination.currentPage, Math.ceil(totalItems / pagination.pageSize))
  }), [pagination, totalItems])

  const updateFilters = async (newFilters: Partial<FilterState>) => {
    try {
      setIsLoading(true)
      setError(null)
      
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
      
      setSelectedDateRange(newDateRange)
    } catch (err) {
      setError('Failed to update date range. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateDemand = async (productId: string, newDemand: number) => {
    try {
      setIsUpdating(true)
      setError(null)
      
      await updateDemand({
        variables: { productId, newDemand },
        refetchQueries: [GET_PRODUCTS, GET_KPIS]
      })
    } catch (err) {
      setError('Failed to update demand. Please try again.')
      throw err
    } finally {
      setIsUpdating(false)
    }
  }

  const handleTransferStock = async (productId: string, quantity: number, destinationWarehouse: string) => {
    try {
      setIsUpdating(true)
      setError(null)
      
      await transferStock({
        variables: { productId, quantity, destinationWarehouse },
        refetchQueries: [GET_PRODUCTS, GET_KPIS]
      })
    } catch (err) {
      setError('Failed to transfer stock. Please try again.')
      throw err
    } finally {
      setIsUpdating(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  // Combine loading states
  const isLoadingData = productsLoading || warehousesLoading || chartLoading || kpisLoading || isLoading

  return {
    products,
    warehouses,
    chartData: chartDataPoints,
    kpis,
    filters,
    pagination: updatedPagination,
    totalItems,
    selectedDateRange,
    isLoading: isLoadingData,
    error: error || productsError?.message,
    isUpdating,
    updateFilters,
    updatePagination,
    goToPage,
    updateDateRange,
    updateDemand: handleUpdateDemand,
    transferStock: handleTransferStock,
    clearError
  }
}
