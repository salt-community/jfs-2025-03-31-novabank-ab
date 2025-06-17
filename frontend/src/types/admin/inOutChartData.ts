export type GenericChartData = {
  chartData: Array<ChartData>
  label: string
  subtext: string
  in_name: string
  out_name: string
}

export type ChartData = {
  date: string
  value_in: number
  value_out: number
}
