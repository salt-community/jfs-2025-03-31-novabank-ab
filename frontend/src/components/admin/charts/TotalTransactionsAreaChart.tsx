'use client'

import * as React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import type { ChartConfig } from '@/components/ui/chart'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAdminTransactions } from '@/hooks/useAdminTransactions'

const fakeTransactions = [
  {
    transactionId: 'a1b2c3d4-1001',
    fromAccountId: 'acc-001',
    toAccountId: 'acc-002',
    date: '2025-01-01T09:15:00',
    amount: 120.5,
    description: 'Groceries',
    userNote: 'Supermarket',
    ocrNumber: 'OCR03001',
    type: 'COMPLETED',
    status: null,
  },
  {
    transactionId: 'a1b2c3d4-1002',
    fromAccountId: 'acc-003',
    toAccountId: 'acc-004',
    date: '2025-01-15T14:22:00',
    amount: 250.0,
    description: 'Car payment',
    userNote: 'Car loan',
    ocrNumber: 'OCR03002',
    type: 'COMPLETED',
    status: null,
  },
  {
    transactionId: 'a1b2c3d4-1003',
    fromAccountId: 'acc-005',
    toAccountId: 'acc-006',
    date: '2025-02-01T11:00:00',
    amount: 75.25,
    description: 'Dining out',
    userNote: 'Restaurant',
    ocrNumber: 'OCR03003',
    type: 'COMPLETED',
    status: null,
  },
  {
    transactionId: 'a1b2c3d4-1004',
    fromAccountId: 'acc-002',
    toAccountId: 'acc-003',
    date: '2025-02-14T10:30:00',
    amount: 180.0,
    description: 'Monthly rent',
    userNote: 'Rent Feb 2025',
    ocrNumber: 'OCR03004',
    type: 'COMPLETED',
    status: null,
  },
  {
    transactionId: 'a1b2c3d4-1005',
    fromAccountId: 'acc-004',
    toAccountId: 'acc-005',
    date: '2025-03-01T16:45:00',
    amount: 90.0,
    description: 'Utilities payment',
    userNote: 'Water bill',
    ocrNumber: 'OCR03005',
    type: 'COMPLETED',
    status: null,
  },
  {
    transactionId: 'a1b2c3d4-1006',
    fromAccountId: 'acc-006',
    toAccountId: 'acc-001',
    date: '2025-03-15T13:10:00',
    amount: 210.75,
    description: 'Invoice payment',
    userNote: 'Invoice #54321',
    ocrNumber: 'OCR03006',
    type: 'COMPLETED',
    status: null,
  },
  {
    transactionId: 'a1b2c3d4-1007',
    fromAccountId: 'acc-001',
    toAccountId: 'acc-004',
    date: '2025-04-01T08:00:00',
    amount: 300.0,
    description: 'Salary',
    userNote: 'April salary',
    ocrNumber: 'OCR03007',
    type: 'COMPLETED',
    status: null,
  },
  {
    transactionId: 'a1b2c3d4-1008',
    fromAccountId: 'acc-002',
    toAccountId: 'acc-005',
    date: '2025-04-14T12:30:00',
    amount: 60.0,
    description: 'Dining out',
    userNote: 'Lunch',
    ocrNumber: 'OCR03008',
    type: 'COMPLETED',
    status: null,
  },
  {
    transactionId: 'a1b2c3d4-1009',
    fromAccountId: 'acc-003',
    toAccountId: 'acc-006',
    date: '2025-05-01T19:20:00',
    amount: 145.5,
    description: 'Groceries',
    userNote: 'Supermarket',
    ocrNumber: 'OCR03009',
    type: 'COMPLETED',
    status: null,
  },
  {
    transactionId: 'a1b2c3d4-1010',
    fromAccountId: 'acc-004',
    toAccountId: 'acc-001',
    date: '2025-05-15T09:45:00',
    amount: 200.0,
    description: 'Monthly rent',
    userNote: 'Rent May 2025',
    ocrNumber: 'OCR04001',
    type: 'COMPLETED',
    status: null,
  },
  {
    transactionId: 'a1b2c3d4-1011',
    fromAccountId: 'acc-005',
    toAccountId: 'acc-002',
    date: '2025-06-01T15:30:00',
    amount: 110.0,
    description: 'Utilities payment',
    userNote: 'Electricity bill',
    ocrNumber: 'OCR04002',
    type: 'COMPLETED',
    status: null,
  },
  {
    transactionId: 'a1b2c3d4-1012',
    fromAccountId: 'acc-006',
    toAccountId: 'acc-003',
    date: '2025-06-10T17:55:00',
    amount: 95.25,
    description: 'Invoice payment',
    userNote: 'Invoice #67890',
    ocrNumber: 'OCR04003',
    type: 'COMPLETED',
    status: null,
  },
  {
    transactionId: '2fcbbb39-06f2-4d67-a054-2da86129ee28',
    fromAccountId: 'c1b35a93-9671-43c1-a0fe-aa4c2e9d2aec',
    toAccountId: '3587b71d-5845-4ba3-b667-e556bdf845be',
    date: '2025-06-12T08:42:57',
    amount: 188.0,
    description: 'Monthly rent',
    userNote: 'Rent June 2025',
    ocrNumber: 'OCR00001',
    type: 'COMPLETED',
    status: null,
  },
  {
    transactionId: 'fa70865e-e018-410a-99a1-018ea90a3ce6',
    fromAccountId: '3587b71d-5845-4ba3-b667-e556bdf845be',
    toAccountId: '7915a5bd-ddcc-4a40-8343-dee3a2188cf0',
    date: '2025-06-15T09:15:00',
    amount: 632.5,
    description: 'Utilities payment',
    userNote: 'Electricity bill',
    ocrNumber: 'OCR00002',
    type: 'COMPLETED',
    status: null,
  },
  {
    transactionId: '62e1632f-e075-4add-984f-a3a7787efb83',
    fromAccountId: '7915a5bd-ddcc-4a40-8343-dee3a2188cf0',
    toAccountId: '67d254c1-1532-4cf4-8d4f-55ef8fe12717',
    date: '2025-06-18T10:30:00',
    amount: 670.25,
    description: 'Invoice payment',
    userNote: 'Invoice #12345',
    ocrNumber: 'OCR00003',
    type: 'COMPLETED',
    status: null,
  },
  // ...add more transactions for each day as needed
]

type Transaction = {
  date: string
  amount: number
  // ...other fields
}

type ChartPoint = {
  date: string
  volume: number
  value: number
}

function transactionsToChartData(transactions: Transaction[]): ChartPoint[] {
  // Group by date (YYYY-MM-DD)
  const grouped: Record<string, { volume: number; value: number }> = {}

  transactions.forEach((tx) => {
    const date = tx.date.slice(0, 10) // 'YYYY-MM-DD'
    if (!grouped[date]) {
      grouped[date] = { volume: 0, value: 0 }
    }
    grouped[date].volume += 1
    grouped[date].value += tx.amount
  })

  // Convert to array and sort by date
  return Object.entries(grouped)
    .map(([date, { volume, value }]) => ({ date, volume, value }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

export function TotalTransactionsAreaChart() {
  const [timeRange, setTimeRange] = React.useState('90d')
  const chartConfig = {
    volume: {
      label: 'volume',
      color: 'black',
    },
    value: {
      label: 'value',
      color: 'black',
    },
  } satisfies ChartConfig

  const { data, error, isLoading } = useAdminTransactions()

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>
  }
  if (!data) {
    return <div>No data found.</div>
  }
  const chartMappedData = transactionsToChartData(fakeTransactions)

  const filteredData = chartMappedData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date()
    let daysToSubtract = 90
    if (timeRange === '30d') {
      daysToSubtract = 30
    } else if (timeRange === '7d') {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>TRANSACTIONS</CardTitle>
          <CardDescription>TOTAL TRANSACTIONS</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillvalue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-value)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-value)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillvolume" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-volume)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-volume)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="volume"
              type="natural"
              fill="url(#fillvolume)"
              stroke="var(--color-volume)"
              stackId="a"
            />
            <Area
              dataKey="value"
              type="natural"
              fill="url(#fillvalue)"
              stroke="var(--color-value)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
