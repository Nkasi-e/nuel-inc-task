import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { gql } from 'graphql-tag'

// Mock data
const mockProducts = [
  { id: "P-1001", name: "12mm Hex Bolt", sku: "HEX-12-100", warehouse: "BLR-A", stock: 180, demand: 120 },
  { id: "P-1002", name: "Steel Washer", sku: "WSR-08-500", warehouse: "BLR-A", stock: 50, demand: 80 },
  { id: "P-1003", name: "M8 Nut", sku: "NUT-08-200", warehouse: "PNQ-C", stock: 80, demand: 80 },
  { id: "P-1004", name: "Bearing 608ZZ", sku: "BRG-608-50", warehouse: "DEL-B", stock: 24, demand: 120 },
  { id: "P-1005", name: "Aluminum Plate", sku: "ALM-10-200", warehouse: "BLR-A", stock: 200, demand: 150 },
  { id: "P-1006", name: "Steel Rod", sku: "SRD-05-100", warehouse: "PNQ-C", stock: 75, demand: 90 },
  { id: "P-1007", name: "Copper Wire", sku: "CPW-02-500", warehouse: "DEL-B", stock: 300, demand: 250 },
  { id: "P-1008", name: "Plastic Housing", sku: "PLH-15-50", warehouse: "BLR-A", stock: 40, demand: 60 },
  { id: "P-1009", name: "Rubber Gasket", sku: "RBG-08-300", warehouse: "PNQ-C", stock: 120, demand: 100 },
  { id: "P-1010", name: "Ceramic Insulator", sku: "CRI-12-75", warehouse: "DEL-B", stock: 60, demand: 80 }
]

const mockWarehouses = [
  { id: "BLR-A", name: "BLR-A", location: "Texas" },
  { id: "PNQ-C", name: "PNQ-C", location: "New York" },
  { id: "DEL-B", name: "DEL-B", location: "Los Angeles" }
]

// Chart data generation
const getChartDataByRange = (range) => {
  const days = range === '7d' ? 7 : range === '14d' ? 14 : 30
  const data = []
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    
    data.push({
      date: date.toISOString().split('T')[0],
      stock: Math.floor(Math.random() * 500) + 200,
      demand: Math.floor(Math.random() * 400) + 150
    })
  }
  
  return data
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

  type KPIs {
    totalStock: Int!
    totalDemand: Int!
    fillRate: Float!
  }

  type Query {
    products(search: String, warehouse: String, status: String, page: Int, pageSize: Int): [Product!]!
    warehouses: [Warehouse!]!
    chartData(range: String!): [ChartDataPoint!]!
    kpis: KPIs!
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

      // Apply search filter
      if (search) {
        const searchLower = search.toLowerCase()
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(searchLower) ||
          product.sku.toLowerCase().includes(searchLower) ||
          product.id.toLowerCase().includes(searchLower)
        )
      }

      // Apply warehouse filter
      if (warehouse) {
        filtered = filtered.filter(product => product.warehouse === warehouse)
      }

      // Apply status filter
      if (status) {
        filtered = filtered.filter(product => {
          const productStatus = product.stock > product.demand ? 'healthy' :
                               product.stock === product.demand ? 'low' : 'critical'
          return productStatus === status
        })
      }

      // Apply pagination
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
      const fillRate = totalDemand > 0 ? 
        (mockProducts.reduce((sum, product) => sum + Math.min(product.stock, product.demand), 0) / totalDemand) * 100 : 0

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
      
      product.demand = newDemand
      return product
    },

    transferStock: (_, { productId, quantity, destinationWarehouse }) => {
      const product = mockProducts.find(p => p.id === productId)
      if (!product) {
        throw new Error('Product not found')
      }
      
      if (product.stock < quantity) {
        throw new Error('Insufficient stock')
      }
      
      product.stock -= quantity
      product.warehouse = destinationWarehouse
      return product
    }
  }
}

// Create and start server
const createMockServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, 
    playground: true    
  })

  const { url } = await startStandaloneServer(server, {
    listen: { 
      port: process.env.PORT || 4000,
      host: '0.0.0.0' 
    }
  })

  console.log(`🚀 Mock GraphQL server ready at ${url}`)
  return server
}

// Start server
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
