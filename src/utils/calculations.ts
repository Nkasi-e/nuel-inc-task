import { Product, KPI, ProductStatus } from '../types'

export const calculateKPI = (products: Product[]): KPI => {
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0)
  const totalDemand = products.reduce((sum, product) => sum + product.demand, 0)
  
  const fillRate = totalDemand > 0 
    ? (products.reduce((sum, product) => sum + Math.min(product.stock, product.demand), 0) / totalDemand) * 100
    : 0

  return {
    totalStock,
    totalDemand,
    fillRate: Math.round(fillRate * 100) / 100
  }
}

export const getProductStatus = (product: Product): ProductStatus => {
  if (product.stock > product.demand) {
    return {
      status: 'healthy',
      color: 'text-success-800',
      bgColor: 'bg-success-100'
    }
  } else if (product.stock === product.demand) {
    return {
      status: 'low',
      color: 'text-warning-800',
      bgColor: 'bg-warning-100'
    }
  } else {
    return {
      status: 'critical',
      color: 'text-danger-800',
      bgColor: 'bg-danger-100'
    }
  }
}

export const filterProducts = (
  products: Product[],
  search: string,
  warehouse: string,
  status: string
): Product[] => {
  return products.filter(product => {
    const matchesSearch = search === '' || 
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase()) ||
      product.id.toLowerCase().includes(search.toLowerCase())
    
    const matchesWarehouse = warehouse === '' || product.warehouse === warehouse
    
    const productStatus = getProductStatus(product)
    const matchesStatus = status === '' || productStatus.status === status
    
    return matchesSearch && matchesWarehouse && matchesStatus
  })
}

export const paginateProducts = (
  products: Product[],
  currentPage: number,
  pageSize: number
): Product[] => {
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  return products.slice(startIndex, endIndex)
}

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num)
}

export const formatPercentage = (num: number): string => {
  return `${num.toFixed(1)}%`
}
