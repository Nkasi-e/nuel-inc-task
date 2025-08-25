import { useState } from 'react'
import { useInventory } from './hooks/useInventory'
import Header from './components/Header'
import KPICards from './components/KPICards'
import ChartSection from './components/ChartSection'
import FiltersRow from './components/FiltersRow'
import ProductsTable from './components/ProductsTable'
import ProductDrawer from './components/ProductDrawer'
import ErrorAlert from './components/ErrorAlert'
import LoadingSpinner from './components/LoadingSpinner'
import { Product } from './types'

function App() {
  const inventory = useInventory()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedProduct(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Global Loading Overlay */}
      {inventory.isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-75 z-50 flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-gray-600">Loading inventory data...</p>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {inventory.error && (
        <ErrorAlert 
          message={inventory.error} 
          onClose={inventory.clearError} 
        />
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Header */}
        <Header 
          onDateRangeChange={inventory.updateDateRange}
          selectedRange={inventory.selectedDateRange}
        />

        {/* KPI Cards */}
        <div className="mt-6 sm:mt-8">
          <KPICards kpis={inventory.kpis} />
        </div>

        {/* Chart Section */}
        <div className="mt-6 sm:mt-8">
          <ChartSection 
            chartData={inventory.chartData}
            selectedRange={inventory.selectedDateRange}
            isLoading={inventory.isLoading}
          />
        </div>

        {/* Filters */}
        <div className="mt-6 sm:mt-8">
          <FiltersRow 
            filters={inventory.filters}
            warehouses={inventory.warehouses}
            onFilterChange={inventory.updateFilters}
            isLoading={inventory.isLoading}
          />
        </div>

        {/* Products Table */}
        <div className="mt-6 sm:mt-8">
          <ProductsTable 
            products={inventory.products}
            pagination={inventory.pagination}
            onPageChange={inventory.goToPage}
            onProductClick={handleProductClick}
            isLoading={inventory.isLoading}
          />
        </div>
      </div>

      {/* Product Drawer */}
      <ProductDrawer 
        isOpen={isDrawerOpen}
        product={selectedProduct}
        onClose={handleCloseDrawer}
        isUpdating={inventory.isUpdating}
        onUpdateDemand={inventory.updateDemand}
        onTransferStock={inventory.transferStock}
      />
    </div>
  )
}

export default App
