import { KPI } from '../types'
import { formatNumber, formatPercentage } from '../utils/calculations'
import { Package, TrendingUp, Target } from 'lucide-react'

interface KPICardsProps {
  kpis: KPI
}

const KPICards = ({ kpis }: KPICardsProps) => {
  const cards = [
    {
      title: 'Total Stock',
      value: formatNumber(kpis.totalStock),
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Demand',
      value: formatNumber(kpis.totalDemand),
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Fill Rate',
      value: formatPercentage(kpis.fillRate),
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm sm:text-base font-medium text-gray-600 mb-1">{card.title}</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{card.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${card.bgColor}`}>
              <card.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${card.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default KPICards
