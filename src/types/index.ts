export interface Product {
  id: string
  name: string
  sku: string
  warehouse: string
  stock: number
  demand: number
}

export interface Warehouse {
  id: string
  name: string
  location: string
}

export interface KPI {
  totalStock: number
  totalDemand: number
  fillRate: number
}

export interface DateRange {
  label: string
  days: number
  value: string
}

export interface FilterState {
  search: string
  warehouse: string
  status: string
}

export interface PaginationState {
  currentPage: number
  pageSize: number
  totalItems: number
}

export interface ProductStatus {
  status: 'healthy' | 'low' | 'critical'
  color: string
  bgColor: string
}

export interface ChartDataPoint {
  date: string
  stock: number
  demand: number
}
