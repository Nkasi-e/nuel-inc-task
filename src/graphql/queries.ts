import { gql } from '@apollo/client'

// Queries
export const GET_PRODUCTS = gql`
  query GetProducts($search: String, $warehouse: String, $status: String, $page: Int, $pageSize: Int) {
    products(search: $search, warehouse: $warehouse, status: $status, page: $page, pageSize: $pageSize) {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`

export const GET_WAREHOUSES = gql`
  query GetWarehouses {
    warehouses {
      id
      name
      location
    }
  }
`

export const GET_CHART_DATA = gql`
  query GetChartData($range: String!) {
    chartData(range: $range) {
      date
      stock
      demand
    }
  }
`

export const GET_KPIS = gql`
  query GetKPIs {
    kpis {
      totalStock
      totalDemand
      fillRate
    }
  }
`

// Mutations
export const UPDATE_PRODUCT_DEMAND = gql`
  mutation UpdateProductDemand($productId: ID!, $newDemand: Int!) {
    updateProductDemand(productId: $productId, newDemand: $newDemand) {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`

export const TRANSFER_STOCK = gql`
  mutation TransferStock($productId: ID!, $quantity: Int!, $destinationWarehouse: String!) {
    transferStock(productId: $productId, quantity: $quantity, destinationWarehouse: $destinationWarehouse) {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`
