import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type Props = {
  label: string
  value: string
  subText?: string
  fineText: string
  trajectory: string
}

export default function SectionCard({
  label,
  value,
  subText,
  fineText,
  trajectory,
}: Props) {
  const trendUp = () => (trajectory.substring(0, 0) === '-' ? true : false)
  const icon = (className: string) =>
    trendUp() ? (
      <TrendingUpIcon className={className} />
    ) : (
      <TrendingDownIcon className={className} />
    )

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardDescription>{label}</CardDescription>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {value}
        </CardTitle>
        <div className="absolute right-4 top-4">
          <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
            {icon('size-4')}
            {trajectory}
          </Badge>
        </div>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {subText
            ? subText
            : trendUp()
              ? 'Trending up this month'
              : 'Trending down this month'}

          {icon('size-4')}
        </div>
        <div className="text-muted-foreground">{fineText}</div>
      </CardFooter>
    </Card>
  )
}
