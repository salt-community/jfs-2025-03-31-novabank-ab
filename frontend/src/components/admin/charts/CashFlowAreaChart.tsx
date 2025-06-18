//import { useAdminUser } from '@/hooks/useAdminUsers'
import { GeneralWideAreaChart } from './GeneralWideAreaChart'
import type { GenericChartData } from '@/types/admin/inOutChartData'

export default function CashFlowAreaChart() {
  const fakeCashFlow: GenericChartData = {
    label: 'CASH FLOW',
    subtext: 'SHOWING TRANSACTION TRAFFIC',
    in_name: 'Cash In',
    out_name: 'Cash Out',
    chartData: [
      { date: '2024-04-01', value_in: 222, value_out: 150 },
      { date: '2024-04-02', value_in: 97, value_out: 180 },
      { date: '2024-04-03', value_in: 167, value_out: 120 },
      { date: '2024-04-04', value_in: 242, value_out: 260 },
      { date: '2024-04-05', value_in: 373, value_out: 290 },
      { date: '2024-04-06', value_in: 301, value_out: 340 },
      { date: '2024-04-07', value_in: 245, value_out: 180 },
      { date: '2024-04-08', value_in: 409, value_out: 320 },
      { date: '2024-04-09', value_in: 59, value_out: 110 },
      { date: '2024-04-10', value_in: 261, value_out: 190 },
      { date: '2024-04-11', value_in: 327, value_out: 350 },
      { date: '2024-04-12', value_in: 292, value_out: 210 },
      { date: '2024-04-13', value_in: 342, value_out: 380 },
      { date: '2024-04-14', value_in: 137, value_out: 220 },
      { date: '2024-04-15', value_in: 120, value_out: 170 },
      { date: '2024-04-16', value_in: 138, value_out: 190 },
      { date: '2024-04-17', value_in: 446, value_out: 360 },
      { date: '2024-04-18', value_in: 364, value_out: 410 },
      { date: '2024-04-19', value_in: 243, value_out: 180 },
      { date: '2024-04-20', value_in: 89, value_out: 150 },
      { date: '2024-04-21', value_in: 137, value_out: 200 },
      { date: '2024-04-22', value_in: 224, value_out: 170 },
      { date: '2024-04-23', value_in: 138, value_out: 230 },
      { date: '2024-04-24', value_in: 387, value_out: 290 },
      { date: '2024-04-25', value_in: 215, value_out: 250 },
      { date: '2024-04-26', value_in: 75, value_out: 130 },
      { date: '2024-04-27', value_in: 383, value_out: 420 },
      { date: '2024-04-28', value_in: 122, value_out: 180 },
      { date: '2024-04-29', value_in: 315, value_out: 240 },
      { date: '2024-04-30', value_in: 454, value_out: 380 },
      { date: '2024-05-01', value_in: 165, value_out: 220 },
      { date: '2024-05-02', value_in: 293, value_out: 310 },
      { date: '2024-05-03', value_in: 247, value_out: 190 },
      { date: '2024-05-04', value_in: 385, value_out: 420 },
      { date: '2024-05-05', value_in: 481, value_out: 390 },
      { date: '2024-05-06', value_in: 498, value_out: 520 },
      { date: '2024-05-07', value_in: 388, value_out: 300 },
      { date: '2024-05-08', value_in: 149, value_out: 210 },
      { date: '2024-05-09', value_in: 227, value_out: 180 },
      { date: '2024-05-10', value_in: 293, value_out: 330 },
      { date: '2024-05-11', value_in: 335, value_out: 270 },
      { date: '2024-05-12', value_in: 197, value_out: 240 },
      { date: '2024-05-13', value_in: 197, value_out: 160 },
      { date: '2024-05-14', value_in: 448, value_out: 490 },
      { date: '2024-05-15', value_in: 473, value_out: 380 },
      { date: '2024-05-16', value_in: 338, value_out: 400 },
      { date: '2024-05-17', value_in: 499, value_out: 420 },
      { date: '2024-05-18', value_in: 315, value_out: 350 },
      { date: '2024-05-19', value_in: 235, value_out: 180 },
      { date: '2024-05-20', value_in: 177, value_out: 230 },
      { date: '2024-05-21', value_in: 82, value_out: 140 },
      { date: '2024-05-22', value_in: 81, value_out: 120 },
      { date: '2024-05-23', value_in: 252, value_out: 290 },
      { date: '2024-05-24', value_in: 294, value_out: 220 },
      { date: '2024-05-25', value_in: 201, value_out: 250 },
      { date: '2024-05-26', value_in: 213, value_out: 170 },
      { date: '2024-05-27', value_in: 420, value_out: 460 },
      { date: '2024-05-28', value_in: 233, value_out: 190 },
      { date: '2024-05-29', value_in: 78, value_out: 130 },
      { date: '2024-05-30', value_in: 340, value_out: 280 },
      { date: '2024-05-31', value_in: 178, value_out: 230 },
      { date: '2024-06-01', value_in: 178, value_out: 200 },
      { date: '2024-06-02', value_in: 470, value_out: 410 },
      { date: '2024-06-03', value_in: 103, value_out: 160 },
      { date: '2024-06-04', value_in: 439, value_out: 380 },
      { date: '2024-06-05', value_in: 88, value_out: 140 },
      { date: '2024-06-06', value_in: 294, value_out: 250 },
      { date: '2024-06-07', value_in: 323, value_out: 370 },
      { date: '2024-06-08', value_in: 385, value_out: 320 },
      { date: '2024-06-09', value_in: 438, value_out: 480 },
      { date: '2024-06-10', value_in: 155, value_out: 200 },
      { date: '2024-06-11', value_in: 92, value_out: 150 },
      { date: '2024-06-12', value_in: 492, value_out: 420 },
      { date: '2024-06-13', value_in: 81, value_out: 130 },
      { date: '2024-06-14', value_in: 426, value_out: 380 },
      { date: '2024-06-15', value_in: 307, value_out: 350 },
      { date: '2024-06-16', value_in: 371, value_out: 310 },
      { date: '2024-06-17', value_in: 475, value_out: 520 },
      { date: '2024-06-18', value_in: 107, value_out: 170 },
      { date: '2024-06-19', value_in: 341, value_out: 290 },
      { date: '2024-06-20', value_in: 408, value_out: 450 },
      { date: '2024-06-21', value_in: 169, value_out: 210 },
      { date: '2024-06-22', value_in: 317, value_out: 270 },
      { date: '2024-06-23', value_in: 480, value_out: 530 },
      { date: '2024-06-24', value_in: 132, value_out: 180 },
      { date: '2024-06-25', value_in: 141, value_out: 190 },
      { date: '2024-06-26', value_in: 434, value_out: 380 },
      { date: '2024-06-27', value_in: 448, value_out: 490 },
      { date: '2024-06-28', value_in: 149, value_out: 200 },
      { date: '2024-06-29', value_in: 103, value_out: 160 },
      { date: '2024-06-30', value_in: 446, value_out: 400 },
    ],
  }
  /* const { data, error, isLoading } = useAdminUser() //TODO SWTICH TO CORRECT DATA/HOOK HERE
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
      <GeneralWideAreaChart data={fakeCashFlow} />
    </div>
  )
}
