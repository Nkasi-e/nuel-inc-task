import { Product, PaginationState } from '../types'
import { getProductStatus, formatNumber } from '../utils/calculations'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { TableSkeleton } from './Skeleton'

interface ProductsTableProps {
  products: Product[]
  pagination: PaginationState
  onProductSelect: (product: Product) => void
  onPaginationChange: (pagination: Partial<PaginationState>) => void
  onPageChange: (page: number) => void
  isLoading?: boolean
}

const ProductsTable = ({ 
  products, 
  pagination, 
  onProductSelect, 
  onPaginationChange, 
  onPageChange,
  isLoading = false
}: ProductsTableProps) => {
  const totalPages = Math.ceil(pagination.totalItems / pagination.pageSize)

  const handlePageSizeChange = (newPageSize: number) => {
    onPaginationChange({ pageSize: newPageSize, currentPage: 1 })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-4 h-4 text-success-600" />
      case 'low':
        return <AlertTriangle className="w-4 h-4 text-warning-600" />
      case 'critical':
        return <XCircle className="w-4 h-4 text-danger-600" />
      default:
        return null
    }
  }

  const renderPaginationButtons = () => {
    const buttons = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, pagination.currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    // First page button
    if (startPage > 1) {
      buttons.push(
        <button
          key="first"
          onClick={() => onPageChange(1)}
          className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
          disabled={isLoading}
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>
      )
    }

    // Previous page button
    if (pagination.currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          onClick={() => onPageChange(pagination.currentPage - 1)}
          className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
          disabled={isLoading}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )
    }

    // Page number buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 text-sm rounded ${
            i === pagination.currentPage
              ? 'bg-primary-600 text-white'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
          disabled={isLoading}
        >
          {i}
        </button>
      )
    }

    // Next page button
    if (pagination.currentPage < totalPages) {
      buttons.push(
        <button
          key="next"
          onClick={() => onPageChange(pagination.currentPage + 1)}
          className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
          disabled={isLoading}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )
    }

    // Last page button
    if (endPage < totalPages) {
      buttons.push(
        <button
          key="last"
          onClick={() => onPageChange(totalPages)}
          className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
          disabled={isLoading}
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      )
    }

    return buttons
  }

  if (isLoading) {
    return <TableSkeleton />
  }

  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-900 uppercase tracking-wide text-xs">PRODUCT</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900 uppercase tracking-wide text-xs">SKU</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900 uppercase tracking-wide text-xs">WAREHOUSE</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900 uppercase tracking-wide text-xs">STOCK</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900 uppercase tracking-wide text-xs">DEMAND</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-900 uppercase tracking-wide text-xs">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const status = getProductStatus(product)
              const isCritical = status.status === 'critical'
              
              return (
                <tr
                  key={product.id}
                  onClick={() => onProductSelect(product)}
                  className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                    isCritical ? 'bg-red-50' : ''
                  }`}
                >
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.id}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{product.sku}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{product.warehouse}</td>
                  <td className="py-4 px-4 text-right">
                    <span className="font-medium text-gray-900">{formatNumber(product.stock)}</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="font-medium text-gray-900">{formatNumber(product.demand)}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      {getStatusIcon(status.status)}
                      <span className={`status-pill ${status.bgColor} ${status.color}`}>
                        {status.status.charAt(0).toUpperCase() + status.status.slice(1)}
                      </span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-700">
            Showing {((pagination.currentPage - 1) * pagination.pageSize) + 1} to{' '}
            {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)} of{' '}
            {pagination.totalItems} results
          </span>
          
          <select
            value={pagination.pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="input-field w-20 py-1 px-2 text-sm"
            disabled={isLoading}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          
          <span className="text-sm text-gray-500">per page</span>
        </div>

        <div className="flex items-center space-x-1">
          {renderPaginationButtons()}
        </div>
      </div>
    </div>
  )
}

export default ProductsTable
