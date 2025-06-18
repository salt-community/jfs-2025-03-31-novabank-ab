import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import clsx from 'clsx'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useTranslation } from 'react-i18next'
import { useNavigate } from '@tanstack/react-router'

type Props = {
  label: string
  value: string
  subText?: string
  fineText: string
  trajectory: string
  badgeColor: string
  redirectLink: string
}

export default function ApplicationStatusCard({
  label,
  value,
  subText,
  fineText,
  trajectory,
  badgeColor,
  redirectLink,
}: Props) {
  const trendUp = () => (trajectory.substring(0, 0) === '-' ? true : false)
  const icon = (className: string) =>
    trendUp() ? (
      <TrendingUpIcon className={className} />
    ) : (
      <TrendingDownIcon className={className} />
    )
  const { t } = useTranslation('adminApplicationStatusCards')
  const navigate = useNavigate()

  return (
    <Card
      onClick={() => navigate({ to: '/' + redirectLink })}
      className="@container/card  hover:bg-base-200 cursor-pointer"
    >
      <CardHeader className="relative">
        <CardDescription>
          <Badge
            className={clsx({
              'bg-yellow-600': badgeColor === 'yellow',
              'bg-red-600': badgeColor === 'red',
              'bg-green-600': badgeColor === 'green',
            })}
          >
            {label}
          </Badge>
        </CardDescription>
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
          {subText ? subText : trendUp() ? t('trend.up') : t('trend.down')}

          {icon('size-4')}
        </div>
        <div className="text-muted-foreground">{fineText}</div>
      </CardFooter>
    </Card>
  )
}
