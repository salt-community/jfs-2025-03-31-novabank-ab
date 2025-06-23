'use client'

import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useAdminAccounts } from '@/hooks/useAdminAllAccounts'

export const description = 'A mixed bar chart'

const chartConfig = {
  accounts: {
    label: 'Accounts',
  },
  personal: {
    label: 'Personal',
    color: 'var(--chart-1)',
  },
  savings: {
    label: 'Savings',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

export function ChartBarMixed() {
  const { data, error, isLoading } = useAdminAccounts()

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>
  }
  if (!data) {
    return <div>No data found.</div>
  }

  const savings = data.accounts.filter((a) => (a.type = 'SAVINGS')).length
  const personal = data.accounts.filter((a) => (a.type = 'PERSONAL')).length

  const chartData = [
    { browser: 'personal', accounts: personal, fill: 'var(--color-personal)' },
    { browser: 'savings', accounts: savings, fill: 'var(--color-savings)' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account types</CardTitle>
        <CardDescription>Account type distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="accounts" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="accounts" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
