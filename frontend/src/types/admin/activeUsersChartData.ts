export type ActiveUsersChartData = {
  chartData: Array<ActiveUsersData>
}

type ActiveUsersData = {
  date: string
  active_users: number
  inactive_users: number
}
