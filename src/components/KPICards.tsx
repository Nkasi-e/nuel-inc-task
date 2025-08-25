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
      change: '+2.5%',
      changeType: 'positive' as const,
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Demand',
      value: formatNumber(kpis.totalDemand),
      change: '+1.8%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'Fill Rate',
      value: formatPercentage(kpis.fillRate),
      change: '+0.3%',
      changeType: 'positive' as const,
      icon: Target,
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
              <div className="flex items-center mt-2">
                <span className={`text-sm font-medium ${
                  card.changeType === 'positive' ? 'text-success-600' : 'text-danger-600'
                }`}>
                  {card.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">from last period</span>
              </div>
            </div>
            <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default KPICards
