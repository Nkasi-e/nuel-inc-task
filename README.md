# SupplySight Dashboard

A modern, responsive supply chain inventory dashboard built with React, TypeScript, Tailwind CSS, and GraphQL.

## 🚀 Features

- **📊 Real-time KPI Dashboard**: Total Stock, Total Demand, and Fill Rate calculations
- **📈 Interactive Charts**: Stock vs Demand trend visualization with date range selection (7d, 14d, 30d)
- **🔍 Advanced Filtering**: Search by name, SKU, ID with warehouse and status filters
- **📋 Product Management**: Comprehensive product table with pagination
- **🎯 Status Indicators**: Visual status pills (Healthy, Low, Critical) with icons
- **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop
- **⚡ GraphQL API**: Mock GraphQL server with real-time mutations
- **🎨 Modern UI/UX**: Clean, intuitive interface with smooth animations
- **🔄 Real-time Updates**: Live data updates with loading states and error handling

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: Apollo Client (GraphQL)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Backend**: Apollo Server (Mock GraphQL)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <https://github.com/Nkasi-e/nuel-inc-task.git>
   cd supplysight-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development servers**
   ```bash
   # Start both frontend and GraphQL server
   npm run dev:all
   
   # Or start them separately:
   npm run dev:server  # GraphQL server on port 4000
   npm run dev         # Frontend on port 3000
   ```

4. **Open your browser**
   - Dashboard: http://localhost:3000
   - GraphQL Playground: http://localhost:4000/graphql

## 🎯 Usage

### Dashboard Features

1. **Date Range Selection**: Click on 7d, 14d, or 30d chips to update the chart data
2. **KPI Cards**: View real-time metrics for Total Stock, Total Demand, and Fill Rate
3. **Interactive Chart**: Hover over data points to see detailed information
4. **Product Filtering**: 
   - Search by product name, SKU, or ID
   - Filter by warehouse location
   - Filter by status (Healthy, Low, Critical)
5. **Product Table**: 
   - Click on any row to open the product details drawer
   - Navigate through pages with pagination
6. **Product Actions**:
   - View detailed product information
   - Update demand forecasts
   - Transfer stock between warehouses

### GraphQL API

The dashboard includes a mock GraphQL server with the following operations:

**Queries:**
- `products`: Get filtered and paginated products
- `warehouses`: Get all warehouse locations
- `chartData`: Get chart data for selected date range
- `kpis`: Get calculated KPI metrics

**Mutations:**
- `updateProductDemand`: Update product demand forecast
- `transferStock`: Transfer stock between warehouses

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:

- **Mobile** (320px - 640px): Stacked layout, full-width drawer, compact tables
- **Tablet** (641px - 1024px): Balanced layout with side-by-side elements
- **Desktop** (1025px+): Full layout with optimal spacing and navigation

### Responsive Features

- **Adaptive Grids**: KPI cards stack on mobile, side-by-side on larger screens
- **Flexible Charts**: Chart height adjusts based on screen size
- **Mobile Drawer**: Product drawer takes full width on mobile devices
- **Responsive Tables**: Table content adapts to screen size with horizontal scrolling
- **Touch-Friendly**: Optimized touch targets for mobile devices

## 🎨 Design System

### Colors
- **Primary**: Blue (#3b82f6)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Danger**: Red (#ef4444)

### Status Indicators
- 🟢 **Healthy**: Stock > Demand
- 🟡 **Low**: Stock = Demand
- 🔴 **Critical**: Stock < Demand

### Animations
- Smooth slide-in drawer animations
- Fade-in loading states
- Hover effects and transitions

## 🔧 Customization

### Adding New Products
Edit `src/data/mockData.ts` to add new products:

```typescript
export const mockProducts: Product[] = [
  {
    id: "P-1001",
    name: "Product Name",
    sku: "SKU-CODE",
    warehouse: "WAREHOUSE-ID",
    stock: 100,
    demand: 80
  }
  // ... more products
]
```

### Modifying GraphQL Schema
Update the schema in `src/graphql/mockServer.ts` to add new fields or operations.

### Styling Customization
Modify `src/index.css` and `tailwind.config.js` to customize the design system.

## 🚀 Deployment

### Quick Deploy
```bash
# Run the automated deployment script
./deploy.sh
```

### Manual Deployment

#### Frontend (Vercel)
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

3. **Configure Environment Variables**
   - Add `VITE_GRAPHQL_URL` pointing to your backend

#### Backend (Railway/Render)
1. **Deploy to Railway** (Recommended)
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository
   - Deploy the `server.prod.js` file

2. **Or deploy to Render**
   - Go to [render.com](https://render.com)
   - Create a new Web Service
   - Connect your repository

### Architecture
- **Frontend**: Vercel (React + Vite)
- **Backend**: Railway/Render (Node.js + Apollo GraphQL)


## 📈 Future Enhancements

- [ ] Real-time WebSocket connections
- [ ] Advanced analytics and reporting
- [ ] User authentication and authorization
- [ ] Export functionality (PDF, Excel)
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Advanced filtering and sorting
- [ ] Bulk operations
- [ ] Notification system
- [ ] Audit logging

