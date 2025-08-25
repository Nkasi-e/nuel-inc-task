import { Product, ProductStatus } from '../types'

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

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num)
}

export const formatPercentage = (num: number): string => {
  return `${num.toFixed(1)}%`
}
