interface SkeletonProps {
  className?: string
  lines?: number
}

const Skeleton = ({ className = '', lines = 1 }: SkeletonProps) => {
  if (lines === 1) {
    return (
      <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
    )
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`animate-pulse bg-gray-200 rounded ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          } ${className}`}
        />
      ))}
    </div>
  )
}

// Specific skeleton components
export const TableSkeleton = () => (
  <div className="space-y-3">
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="flex space-x-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-20" />
      </div>
    ))}
  </div>
)

export const CardSkeleton = () => (
  <div className="card">
    <div className="flex items-center justify-between mb-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
    <Skeleton className="h-8 w-32 mb-2" />
    <Skeleton className="h-4 w-20" />
  </div>
)

export const ChartSkeleton = () => (
  <div className="card">
    <div className="flex items-center justify-between mb-6">
      <div>
        <Skeleton className="h-6 w-48 mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="flex space-x-4">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
    <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
      <Skeleton className="h-8 w-32" />
    </div>
  </div>
)

export default Skeleton
