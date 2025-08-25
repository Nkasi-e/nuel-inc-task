import { useState } from 'react'
import { Product } from '../types'
import { getProductStatus, formatNumber } from '../utils/calculations'
import { X, Package, MapPin, BarChart3, Edit, Truck } from 'lucide-react'
import LoadingSpinner from './LoadingSpinner'

interface ProductDrawerProps {
  isOpen: boolean
  product: Product | null
  onClose: () => void
  isUpdating?: boolean
  onUpdateDemand?: (productId: string, newDemand: number) => Promise<void>
  onTransferStock?: (productId: string, quantity: number, destinationWarehouse: string) => Promise<void>
}

const ProductDrawer = ({ 
  isOpen, 
  product, 
  onClose, 
  isUpdating = false,
  onUpdateDemand,
  onTransferStock
}: ProductDrawerProps) => {
  const [activeTab, setActiveTab] = useState<'details' | 'demand' | 'transfer'>('details')
  const [demandForm, setDemandForm] = useState({ newDemand: '' })
  const [transferForm, setTransferForm] = useState({ 
    quantity: '', 
    destinationWarehouse: '' 
  })

  if (!product) return null

  const status = getProductStatus(product)

  // Form validation
  const isDemandFormValid = demandForm.newDemand.trim() !== ''
  const isTransferFormValid = transferForm.quantity.trim() !== '' && transferForm.destinationWarehouse.trim() !== ''

  const handleDemandUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isDemandFormValid || isUpdating || !onUpdateDemand) return
    
    try {
      await onUpdateDemand(product.id, parseInt(demandForm.newDemand))
      setDemandForm({ newDemand: '' })
    } catch (error) {
      // Error is handled by the parent component
      console.error('Failed to update demand:', error)
    }
  }

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isTransferFormValid || isUpdating || !onTransferStock) return
    
    try {
      await onTransferStock(product.id, parseInt(transferForm.quantity), transferForm.destinationWarehouse)
      setTransferForm({ quantity: '', destinationWarehouse: '' })
    } catch (error) {
      // Error is handled by the parent component
      console.error('Failed to transfer stock:', error)
    }
  }

  const tabs = [
    { id: 'details', label: 'Details', icon: Package },
    { id: 'demand', label: 'Update Demand', icon: Edit },
    { id: 'transfer', label: 'Transfer Stock', icon: Truck }
  ]

  return (
    <>
      {/* Backdrop with fade animation */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Drawer with slide animation */}
      <div className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-all duration-500 ease-in-out ${
        isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            disabled={isUpdating}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              disabled={isUpdating}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Content with fade animation */}
        <div className="p-4 sm:p-6 overflow-y-auto h-full animate-fade-in">
          {activeTab === 'details' && (
            <div className="space-y-4 sm:space-y-6">
              {/* Product Info */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center space-x-3">
                    <Package className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-600">SKU: {product.sku}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-600">Warehouse: {product.warehouse}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-600">ID: {product.id}</span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Current Status</h4>
                <span className={`status-pill ${status.bgColor} ${status.color}`}>
                  {status.status.charAt(0).toUpperCase() + status.status.slice(1)}
                </span>
              </div>

              {/* Stock & Demand */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Current Stock</div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">{formatNumber(product.stock)}</div>
                </div>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Current Demand</div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">{formatNumber(product.demand)}</div>
                </div>
              </div>

              {/* Stock Level Indicator */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Stock Level</h4>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      status.status === 'healthy' ? 'bg-success-500' :
                      status.status === 'low' ? 'bg-warning-500' : 'bg-danger-500'
                    }`}
                    style={{ width: `${Math.min((product.stock / product.demand) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {product.stock >= product.demand ? 'Sufficient stock' : 'Stock below demand'}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'demand' && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Update Demand</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Update the demand forecast for this product. This will help in inventory planning.
                </p>
              </div>

              <form onSubmit={handleDemandUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Demand: {formatNumber(product.demand)}
                  </label>
                  <input
                    type="number"
                    placeholder="Enter new demand value"
                    value={demandForm.newDemand}
                    onChange={(e) => setDemandForm({ newDemand: e.target.value })}
                    className="input-field"
                    min="0"
                    required
                    disabled={isUpdating}
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={!isDemandFormValid || isUpdating}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                    isDemandFormValid && !isUpdating
                      ? 'bg-primary-600 hover:bg-primary-700 text-white cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isUpdating ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    'Update Demand'
                  )}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'transfer' && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Transfer Stock</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Transfer stock to another warehouse location.
                </p>
              </div>

              <form onSubmit={handleTransfer} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Stock: {formatNumber(product.stock)}
                  </label>
                  <input
                    type="number"
                    placeholder="Enter quantity to transfer"
                    value={transferForm.quantity}
                    onChange={(e) => setTransferForm({ ...transferForm, quantity: e.target.value })}
                    className="input-field"
                    min="1"
                    max={product.stock}
                    required
                    disabled={isUpdating}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination Warehouse
                  </label>
                  <select
                    value={transferForm.destinationWarehouse}
                    onChange={(e) => setTransferForm({ ...transferForm, destinationWarehouse: e.target.value })}
                    className="input-field"
                    required
                    disabled={isUpdating}
                  >
                    <option value="">Select warehouse</option>
                    <option value="BLR-A">BLR-A</option>
                    <option value="PNQ-C">PNQ-C</option>
                    <option value="DEL-B">DEL-B</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  disabled={!isTransferFormValid || isUpdating}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                    isTransferFormValid && !isUpdating
                      ? 'bg-success-600 hover:bg-success-700 text-white cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isUpdating ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span>Transferring...</span>
                    </>
                  ) : (
                    'Transfer Stock'
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProductDrawer
