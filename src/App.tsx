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

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product)
    setIsDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false)
    setSelectedProduct(null)
  }

  const handleDateRangeChange = (dateRange: any) => {
    inventory.updateDateRange(dateRange)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onDateRangeChange={handleDateRangeChange} />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Error Alert */}
        {inventory.error && (
          <ErrorAlert
            error={inventory.error}
            onDismiss={inventory.clearError}
            className="mb-4"
          />
        )}

      
        {inventory.isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 shadow-xl">
              <LoadingSpinner size="lg" text="Loading data..." />
            </div>
          </div>
        )}

        {/* KPI Cards */}
        <KPICards kpis={inventory.kpis} />
        
        {/* Chart Section */}
        <ChartSection 
          chartData={inventory.chartData} 
          selectedRange={inventory.selectedDateRange}
          isLoading={inventory.isLoading}
        />
        
        {/* Products Section */}
        <div className="card">
          <FiltersRow 
            filters={inventory.filters}
            warehouses={inventory.warehouses}
            onFiltersChange={inventory.updateFilters}
            isLoading={inventory.isLoading}
          />
          
          <ProductsTable 
            products={inventory.products}
            pagination={inventory.pagination}
            onProductSelect={handleProductSelect}
            onPaginationChange={inventory.updatePagination}
            onPageChange={inventory.goToPage}
            isLoading={inventory.isLoading}
          />
        </div>
      </main>

      <ProductDrawer
        isOpen={isDrawerOpen}
        product={selectedProduct}
        onClose={handleDrawerClose}
        isUpdating={inventory.isUpdating}
      />
    </div>
  )
}

export default App
