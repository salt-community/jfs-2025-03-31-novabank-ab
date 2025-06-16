import { ChartAreaInteractive } from '@/components/admin/chart-area-interactive'
import SectionCard from '@/components/admin/SectionCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AdminDashboard() {
  const cashFlowData = [
    { date: '2024-04-01', cash_in: 222, cash_out: 150 },
    { date: '2024-04-02', cash_in: 97, cash_out: 180 },
    { date: '2024-04-03', cash_in: 167, cash_out: 120 },
    { date: '2024-04-04', cash_in: 242, cash_out: 260 },
    { date: '2024-04-05', cash_in: 373, cash_out: 290 },
    { date: '2024-04-06', cash_in: 301, cash_out: 340 },
    { date: '2024-04-07', cash_in: 245, cash_out: 180 },
    { date: '2024-04-08', cash_in: 409, cash_out: 320 },
    { date: '2024-04-09', cash_in: 59, cash_out: 110 },
    { date: '2024-04-10', cash_in: 261, cash_out: 190 },
    { date: '2024-04-11', cash_in: 327, cash_out: 350 },
    { date: '2024-04-12', cash_in: 292, cash_out: 210 },
    { date: '2024-04-13', cash_in: 342, cash_out: 380 },
    { date: '2024-04-14', cash_in: 137, cash_out: 220 },
    { date: '2024-04-15', cash_in: 120, cash_out: 170 },
    { date: '2024-04-16', cash_in: 138, cash_out: 190 },
    { date: '2024-04-17', cash_in: 446, cash_out: 360 },
    { date: '2024-04-18', cash_in: 364, cash_out: 410 },
    { date: '2024-04-19', cash_in: 243, cash_out: 180 },
    { date: '2024-04-20', cash_in: 89, cash_out: 150 },
    { date: '2024-04-21', cash_in: 137, cash_out: 200 },
    { date: '2024-04-22', cash_in: 224, cash_out: 170 },
    { date: '2024-04-23', cash_in: 138, cash_out: 230 },
    { date: '2024-04-24', cash_in: 387, cash_out: 290 },
    { date: '2024-04-25', cash_in: 215, cash_out: 250 },
    { date: '2024-04-26', cash_in: 75, cash_out: 130 },
    { date: '2024-04-27', cash_in: 383, cash_out: 420 },
    { date: '2024-04-28', cash_in: 122, cash_out: 180 },
    { date: '2024-04-29', cash_in: 315, cash_out: 240 },
    { date: '2024-04-30', cash_in: 454, cash_out: 380 },
    { date: '2024-05-01', cash_in: 165, cash_out: 220 },
    { date: '2024-05-02', cash_in: 293, cash_out: 310 },
    { date: '2024-05-03', cash_in: 247, cash_out: 190 },
    { date: '2024-05-04', cash_in: 385, cash_out: 420 },
    { date: '2024-05-05', cash_in: 481, cash_out: 390 },
    { date: '2024-05-06', cash_in: 498, cash_out: 520 },
    { date: '2024-05-07', cash_in: 388, cash_out: 300 },
    { date: '2024-05-08', cash_in: 149, cash_out: 210 },
    { date: '2024-05-09', cash_in: 227, cash_out: 180 },
    { date: '2024-05-10', cash_in: 293, cash_out: 330 },
    { date: '2024-05-11', cash_in: 335, cash_out: 270 },
    { date: '2024-05-12', cash_in: 197, cash_out: 240 },
    { date: '2024-05-13', cash_in: 197, cash_out: 160 },
    { date: '2024-05-14', cash_in: 448, cash_out: 490 },
    { date: '2024-05-15', cash_in: 473, cash_out: 380 },
    { date: '2024-05-16', cash_in: 338, cash_out: 400 },
    { date: '2024-05-17', cash_in: 499, cash_out: 420 },
    { date: '2024-05-18', cash_in: 315, cash_out: 350 },
    { date: '2024-05-19', cash_in: 235, cash_out: 180 },
    { date: '2024-05-20', cash_in: 177, cash_out: 230 },
    { date: '2024-05-21', cash_in: 82, cash_out: 140 },
    { date: '2024-05-22', cash_in: 81, cash_out: 120 },
    { date: '2024-05-23', cash_in: 252, cash_out: 290 },
    { date: '2024-05-24', cash_in: 294, cash_out: 220 },
    { date: '2024-05-25', cash_in: 201, cash_out: 250 },
    { date: '2024-05-26', cash_in: 213, cash_out: 170 },
    { date: '2024-05-27', cash_in: 420, cash_out: 460 },
    { date: '2024-05-28', cash_in: 233, cash_out: 190 },
    { date: '2024-05-29', cash_in: 78, cash_out: 130 },
    { date: '2024-05-30', cash_in: 340, cash_out: 280 },
    { date: '2024-05-31', cash_in: 178, cash_out: 230 },
    { date: '2024-06-01', cash_in: 178, cash_out: 200 },
    { date: '2024-06-02', cash_in: 470, cash_out: 410 },
    { date: '2024-06-03', cash_in: 103, cash_out: 160 },
    { date: '2024-06-04', cash_in: 439, cash_out: 380 },
    { date: '2024-06-05', cash_in: 88, cash_out: 140 },
    { date: '2024-06-06', cash_in: 294, cash_out: 250 },
    { date: '2024-06-07', cash_in: 323, cash_out: 370 },
    { date: '2024-06-08', cash_in: 385, cash_out: 320 },
    { date: '2024-06-09', cash_in: 438, cash_out: 480 },
    { date: '2024-06-10', cash_in: 155, cash_out: 200 },
    { date: '2024-06-11', cash_in: 92, cash_out: 150 },
    { date: '2024-06-12', cash_in: 492, cash_out: 420 },
    { date: '2024-06-13', cash_in: 81, cash_out: 130 },
    { date: '2024-06-14', cash_in: 426, cash_out: 380 },
    { date: '2024-06-15', cash_in: 307, cash_out: 350 },
    { date: '2024-06-16', cash_in: 371, cash_out: 310 },
    { date: '2024-06-17', cash_in: 475, cash_out: 520 },
    { date: '2024-06-18', cash_in: 107, cash_out: 170 },
    { date: '2024-06-19', cash_in: 341, cash_out: 290 },
    { date: '2024-06-20', cash_in: 408, cash_out: 450 },
    { date: '2024-06-21', cash_in: 169, cash_out: 210 },
    { date: '2024-06-22', cash_in: 317, cash_out: 270 },
    { date: '2024-06-23', cash_in: 480, cash_out: 530 },
    { date: '2024-06-24', cash_in: 132, cash_out: 180 },
    { date: '2024-06-25', cash_in: 141, cash_out: 190 },
    { date: '2024-06-26', cash_in: 434, cash_out: 380 },
    { date: '2024-06-27', cash_in: 448, cash_out: 490 },
    { date: '2024-06-28', cash_in: 149, cash_out: 200 },
    { date: '2024-06-29', cash_in: 103, cash_out: 160 },
    { date: '2024-06-30', cash_in: 446, cash_out: 400 },
  ]
  return (
    <div className="space-y-20 ">
      <Tabs defaultValue="activeUsers" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="cashFlow">Cash Flow</TabsTrigger>
          <TabsTrigger value="activeUsers">Active Users</TabsTrigger>
        </TabsList>
        <TabsContent value="activeUsers">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="cashFlow">
          <ChartAreaInteractive chartData={cashFlowData} />
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-3 gap-4">
        <SectionCard
          label="New Customers"
          value="4440"
          trajectory="-13%"
          fineText="Acqusition needs attention"
        />
        <SectionCard
          label="New Customers"
          value="4440"
          trajectory="-13%"
          fineText="Acqusition needs attention"
        />
        <SectionCard
          label="New Customers"
          value="4440"
          trajectory="-13%"
          fineText="Acqusition needs attention"
        />
      </div>
    </div>
  )
}
