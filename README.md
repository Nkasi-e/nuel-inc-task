# SupplySight Dashboard

A modern, responsive inventory management dashboard built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Real-time Dashboard**: Live KPI metrics including total stock, demand, and fill rate
- **Interactive Charts**: Beautiful line charts showing stock vs demand trends
- **Advanced Filtering**: Search by product name, SKU, or ID, filter by warehouse and status
- **Smart Status System**: Automatic status classification (Healthy, Low, Critical) with visual indicators
- **Product Management**: Detailed product views with update demand and transfer stock capabilities
- **Responsive Design**: Mobile-first approach with modern UI/UX patterns
- **Pagination**: Efficient data handling with configurable page sizes

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and building
- **State Management**: Custom hooks with React hooks
- **Mock Data**: Local data simulation for development

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Main header with logo and date range
│   ├── KPICards.tsx    # KPI metrics display
│   ├── ChartSection.tsx # Stock vs demand chart
│   ├── FiltersRow.tsx  # Search and filter controls
│   ├── ProductsTable.tsx # Products data table
│   └── ProductDrawer.tsx # Product detail drawer
├── hooks/              # Custom React hooks
│   └── useInventory.ts # Inventory state management
├── types/              # TypeScript type definitions
│   └── index.ts        # All application types
├── utils/              # Utility functions
│   └── calculations.ts # Business logic calculations
├── data/               # Mock data and constants
│   └── mockData.ts     # Sample inventory data
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <https://github.com/Nkasi-e/nuel-inc-task.git>
cd supplysight-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue shades for main actions and branding
- **Success**: Green shades for positive indicators
- **Warning**: Yellow/Orange shades for caution states
- **Danger**: Red shades for critical situations

### Components
- **Cards**: Consistent card design with shadows and borders
- **Buttons**: Primary and secondary button variants
- **Inputs**: Form inputs with focus states and validation
- **Status Pills**: Color-coded status indicators
- **Tables**: Responsive data tables with hover effects

## 📊 Business Logic

### Status Classification
- **Healthy**: Stock > Demand (Green)
- **Low**: Stock = Demand (Yellow)
- **Critical**: Stock < Demand (Red with row highlighting)

### KPI Calculations
- **Total Stock**: Sum of all product stock levels
- **Total Demand**: Sum of all product demand forecasts
- **Fill Rate**: (Sum of min(stock, demand) / Total demand) × 100%

### Filtering & Pagination
- Real-time search across product name, SKU, and ID
- Warehouse-based filtering
- Status-based filtering
- Configurable pagination (10, 25, 50 items per page)

## 🔧 Customization

### Adding New Products
Edit `src/data/mockData.ts` to add new products to the inventory.

### Modifying Status Rules
Update the `getProductStatus` function in `src/utils/calculations.ts` to change status classification logic.

### Styling Changes
Modify `src/index.css` and `tailwind.config.js` to customize the design system.

## 🚀 Future Enhancements

- **GraphQL Integration**: Replace mock data with real GraphQL API
- **Real-time Updates**: WebSocket integration for live data
- **Advanced Analytics**: More detailed reporting and insights
- **User Authentication**: Role-based access control
- **Mobile App**: React Native companion app
- **Export Features**: PDF/Excel report generation
- **Notifications**: Alert system for critical inventory levels

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or support, please open an issue in the repository.
