export type CashFlowChartData = {
  chartData: Array<CashFlowData>
}

type CashFlowData = {
  date: string
  cash_in: number
  cash_out: number
}
