import { Product, Warehouse, ChartDataPoint } from '../types'

export const mockProducts: Product[] = [
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

export const mockWarehouses: Warehouse[] = [
  { id: "BLR-A", name: "BLR-A", location: "Texas" },
  { id: "PNQ-C", name: "PNQ-C", location: "New York" },
  { id: "DEL-B", name: "DEL-B", location: "Los Angeles" }
]


export const mockChartData7d: ChartDataPoint[] = [
  { date: "2024-01-01", stock: 1200, demand: 980 },
  { date: "2024-01-02", stock: 1180, demand: 1020 },
  { date: "2024-01-03", stock: 1150, demand: 1050 },
  { date: "2024-01-04", stock: 1120, demand: 1080 },
  { date: "2024-01-05", stock: 1090, demand: 1100 },
  { date: "2024-01-06", stock: 1060, demand: 1120 },
  { date: "2024-01-07", stock: 1030, demand: 1140 }
]

export const mockChartData14d: ChartDataPoint[] = [
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

export const mockChartData30d: ChartDataPoint[] = [
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

export const dateRanges = [
  { label: "7d", days: 7, value: "7d" },
  { label: "14d", days: 14, value: "14d" },
  { label: "30d", days: 30, value: "30d" }
]


export const getChartDataByRange = (range: string): ChartDataPoint[] => {
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
