//import { useAdminUser } from '@/hooks/useAdminUsers'
import { GeneralWideAreaChart } from './GeneralWideAreaChart'
import type { GenericChartData } from '@/types/admin/inOutChartData'

export default function ActiveUsersAreaChart() {
  const fakeActiveUsers: GenericChartData = {
    label: 'ACTIVE USERS',
    subtext: 'SHOWING USER ACTIVITY',
    in_name: 'Active Users',
    out_name: 'Inactive Users',
    chartData: [
      { date: '2024-04-01', value_in: 120, value_out: 30 },
      { date: '2024-04-02', value_in: 135, value_out: 28 },
      { date: '2024-04-03', value_in: 140, value_out: 25 },
      { date: '2024-04-04', value_in: 150, value_out: 20 },
      { date: '2024-04-05', value_in: 160, value_out: 18 },
      { date: '2024-04-06', value_in: 158, value_out: 22 },
      { date: '2024-04-07', value_in: 162, value_out: 19 },
      { date: '2024-04-08', value_in: 170, value_out: 17 },
      { date: '2024-04-09', value_in: 175, value_out: 15 },
      { date: '2024-04-10', value_in: 180, value_out: 14 },
      { date: '2024-04-11', value_in: 185, value_out: 13 },
      { date: '2024-04-12', value_in: 190, value_out: 12 },
      { date: '2024-04-13', value_in: 195, value_out: 11 },
      { date: '2024-05-14', value_in: 200, value_out: 10 },
      { date: '2024-06-15', value_in: 205, value_out: 9 },
      { date: '2024-06-16', value_in: 210, value_out: 8 },
      { date: '2024-06-17', value_in: 215, value_out: 7 },
      { date: '2024-05-18', value_in: 220, value_out: 6 },
      { date: '2024-05-19', value_in: 225, value_out: 5 },
      { date: '2024-05-20', value_in: 230, value_out: 4 },
      { date: '2024-05-21', value_in: 235, value_out: 3 },
      { date: '2024-05-22', value_in: 240, value_out: 2 },
      { date: '2024-05-23', value_in: 245, value_out: 2 },
      { date: '2024-05-24', value_in: 250, value_out: 1 },
      { date: '2024-05-25', value_in: 255, value_out: 1 },
      { date: '2024-05-26', value_in: 260, value_out: 1 },
      { date: '2024-05-27', value_in: 265, value_out: 1 },
      { date: '2024-05-28', value_in: 270, value_out: 1 },
      { date: '2024-05-29', value_in: 275, value_out: 1 },
      { date: '2024-05-30', value_in: 280, value_out: 1 },
    ],
  }
  /* const { data, error, isLoading } = useAdminUser()

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>
  }
  if (!data) {
    return <div>No data found.</div>
  }
  console.log(data, data) */
  return (
    <div>
      <GeneralWideAreaChart data={fakeActiveUsers} />
    </div>
  )
}
