import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { gql } from 'graphql-tag'

// Mock data
const mockProducts = [
  { "id": "P-1001", "name": "12mm Hex Bolt", "sku": "HEX-12-100", "warehouse": "BLR-A", "stock": 180, "demand": 120 },
  { "id": "P-1002", "name": "Steel Washer", "sku": "WSR-08-500", "warehouse": "BLR-A", "stock": 50, "demand": 80 },
  { "id": "P-1003", "name": "M8 Nut", "sku": "NUT-08-200", "warehouse": "PNQ-C", "stock": 80, "demand": 80 },
  { "id": "P-1004", "name": "Bearing 608ZZ", "sku": "BRG-608-50", "warehouse": "DEL-B", "stock": 24, "demand": 120 },
  { "id": "P-1005", "name": "Aluminum Plate", "sku": "ALM-10-200", "warehouse": "BLR-A", "stock": 150, "demand": 90 },
  { "id": "P-1006", "name": "Rubber Gasket", "sku": "RUB-05-300", "warehouse": "PNQ-C", "stock": 200, "demand": 180 },
  { "id": "P-1007", "name": "Copper Wire", "sku": "COP-02-1000", "warehouse": "DEL-B", "stock": 75, "demand": 100 },
  { "id": "P-1008", "name": "Plastic Housing", "sku": "PLA-15-150", "warehouse": "BLR-A", "stock": 60, "demand": 120 },
  { "id": "P-1009", "name": "Steel Rod", "sku": "STE-20-80", "warehouse": "PNQ-C", "stock": 45, "demand": 60 },
  { "id": "P-1010", "name": "Ceramic Insulator", "sku": "CER-08-120", "warehouse": "DEL-B", "stock": 30, "demand": 45 }
]

const mockWarehouses = [
  { id: "BLR-A", name: "BLR-A", location: "Texas" },
  { id: "PNQ-C", name: "PNQ-C", location: "New York" },
  { id: "DEL-B", name: "DEL-B", location: "Los Angeles" }
]

// Chart data for different date ranges
const mockChartData7d = [
  { date: "2024-01-01", stock: 1200, demand: 980 },
  { date: "2024-01-02", stock: 1180, demand: 1020 },
  { date: "2024-01-03", stock: 1150, demand: 1050 },
  { date: "2024-01-04", stock: 1120, demand: 1080 },
  { date: "2024-01-05", stock: 1090, demand: 1100 },
  { date: "2024-01-06", stock: 1060, demand: 1120 },
  { date: "2024-01-07", stock: 1030, demand: 1140 }
]

const mockChartData14d = [
  { date: "2023-12-25", stock: 1350, demand: 920 },
  { date: "2023-12-26", stock: 1320, demand: 940 },
  { date: "2023-12-27", stock: 1290, demand: 960 },
  { date: "2023-12-28", stock: 1260, demand: 980 },
  { date: "2023-12-29", stock: 1230, demand: 1000 },
  { date: "2023-12-30", stock: 1200, demand: 1020 },
  { date: "2023-12-31", stock: 1170, demand: 1040 },
  { date: "2024-01-01", stock: 1200, demand: 980 },
  { date: "2024-01-02", stock: 1180, demand: 1020 },
  { date: "2024-01-03", stock: 1150, demand: 1050 },
  { date: "2024-01-04", stock: 1120, demand: 1080 },
  { date: "2024-01-05", stock: 1090, demand: 1100 },
  { date: "2024-01-06", stock: 1060, demand: 1120 },
  { date: "2024-01-07", stock: 1030, demand: 1140 }
]

const mockChartData30d = [
  { date: "2023-12-09", stock: 1500, demand: 800 },
  { date: "2023-12-10", stock: 1480, demand: 820 },
  { date: "2023-12-11", stock: 1450, demand: 840 },
  { date: "2023-12-12", stock: 1420, demand: 860 },
  { date: "2023-12-13", stock: 1390, demand: 880 },
  { date: "2023-12-14", stock: 1360, demand: 900 },
  { date: "2023-12-15", stock: 1330, demand: 920 },
  { date: "2023-12-16", stock: 1300, demand: 940 },
  { date: "2023-12-17", stock: 1270, demand: 960 },
  { date: "2023-12-18", stock: 1240, demand: 980 },
  { date: "2023-12-19", stock: 1210, demand: 1000 },
  { date: "2023-12-20", stock: 1180, demand: 1020 },
  { date: "2023-12-21", stock: 1150, demand: 1040 },
  { date: "2023-12-22", stock: 1120, demand: 1060 },
  { date: "2023-12-23", stock: 1090, demand: 1080 },
  { date: "2023-12-24", stock: 1060, demand: 1100 },
  { date: "2023-12-25", stock: 1350, demand: 920 },
  { date: "2023-12-26", stock: 1320, demand: 940 },
  { date: "2023-12-27", stock: 1290, demand: 960 },
  { date: "2023-12-28", stock: 1260, demand: 980 },
  { date: "2023-12-29", stock: 1230, demand: 1000 },
  { date: "2023-12-30", stock: 1200, demand: 1020 },
  { date: "2023-12-31", stock: 1170, demand: 1040 },
  { date: "2024-01-01", stock: 1200, demand: 980 },
  { date: "2024-01-02", stock: 1180, demand: 1020 },
  { date: "2024-01-03", stock: 1150, demand: 1050 },
  { date: "2024-01-04", stock: 1120, demand: 1080 },
  { date: "2024-01-05", stock: 1090, demand: 1100 },
  { date: "2024-01-06", stock: 1060, demand: 1120 },
  { date: "2024-01-07", stock: 1030, demand: 1140 }
]

// Function to get chart data based on date range
const getChartDataByRange = (range) => {
  switch (range) {
    case '7d':
      return mockChartData7d
    case '14d':
      return mockChartData14d
    case '30d':
      return mockChartData30d
    default:
      return mockChartData7d
  }
}

// GraphQL Schema
const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    sku: String!
    warehouse: String!
    stock: Int!
    demand: Int!
  }

  type Warehouse {
    id: ID!
    name: String!
    location: String!
  }

  type ChartDataPoint {
    date: String!
    stock: Int!
    demand: Int!
  }

  type KPI {
    totalStock: Int!
    totalDemand: Int!
    fillRate: Float!
  }

  type Query {
    products(search: String, warehouse: String, status: String, page: Int = 1, pageSize: Int = 10): [Product!]!
    warehouses: [Warehouse!]!
    chartData(range: String!): [ChartDataPoint!]!
    kpis: KPI!
  }

  type Mutation {
    updateProductDemand(productId: ID!, newDemand: Int!): Product!
    transferStock(productId: ID!, quantity: Int!, destinationWarehouse: String!): Product!
  }
`

// Resolvers
const resolvers = {
  Query: {
    products: (_, { search, warehouse, status, page = 1, pageSize = 10 }) => {
      let filtered = [...mockProducts]

      // Apply filters
      if (search) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.sku.toLowerCase().includes(search.toLowerCase()) ||
          product.id.toLowerCase().includes(search.toLowerCase())
        )
      }

      if (warehouse) {
        filtered = filtered.filter(product => product.warehouse === warehouse)
      }

      if (status) {
        filtered = filtered.filter(product => {
          if (status === 'healthy') return product.stock > product.demand
          if (status === 'low') return product.stock === product.demand
          if (status === 'critical') return product.stock < product.demand
          return true
        })
      }


      const startIndex = (page - 1) * pageSize
      const endIndex = startIndex + pageSize
      return filtered.slice(startIndex, endIndex)
    },

    warehouses: () => mockWarehouses,

    chartData: (_, { range }) => {
      return getChartDataByRange(range)
    },

    kpis: () => {
      const totalStock = mockProducts.reduce((sum, product) => sum + product.stock, 0)
      const totalDemand = mockProducts.reduce((sum, product) => sum + product.demand, 0)
      const fillRate = totalDemand > 0 
        ? (mockProducts.reduce((sum, product) => sum + Math.min(product.stock, product.demand), 0) / totalDemand) * 100
        : 0

      return {
        totalStock,
        totalDemand,
        fillRate: Math.round(fillRate * 100) / 100
      }
    }
  },

  Mutation: {
    updateProductDemand: (_, { productId, newDemand }) => {
      const product = mockProducts.find(p => p.id === productId)
      if (!product) {
        throw new Error('Product not found')
      }

      // Simulate API delay
      return new Promise((resolve) => {
        setTimeout(() => {
          product.demand = newDemand
          resolve(product)
        }, 500)
      })
    },

    transferStock: (_, { productId, quantity, destinationWarehouse }) => {
      const product = mockProducts.find(p => p.id === productId)
      if (!product) {
        throw new Error('Product not found')
      }

      if (product.stock < quantity) {
        throw new Error('Insufficient stock')
      }

  
      return new Promise((resolve) => {
        setTimeout(() => {
          product.stock -= quantity
          resolve(product)
        }, 500)
      })
    }
  }
}

const createMockServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  })

  console.log(`🚀 Mock GraphQL server ready at ${url}`)
  return server
}

async function startServer() {
  try {
    await createMockServer()
    console.log('✅ Mock GraphQL server started successfully!')
    console.log('🌐 GraphQL Playground: http://localhost:4000/graphql')
    console.log('📊 Dashboard: http://localhost:3000')
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
