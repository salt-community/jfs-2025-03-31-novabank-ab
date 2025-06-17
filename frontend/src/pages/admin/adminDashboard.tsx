import ApplicantStatusCards from '@/components/admin/ApplicantStatusCards'
import ActiveUsersAreaChart from '@/components/admin/charts/ActiveUsersAreaChart'
import CashFlowAreaChart from '@/components/admin/charts/CashFlowAreaChart'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AdminDashboard() {
  return (
    <div className="space-y-20 ">
      <Tabs defaultValue="activeUsers">
        <TabsList>
          <TabsTrigger value="cashFlow">Cash Flow</TabsTrigger>
          <TabsTrigger value="activeUsers">Active Users</TabsTrigger>
        </TabsList>
        <TabsContent value="activeUsers">
          <ActiveUsersAreaChart />
        </TabsContent>
        <TabsContent value="cashFlow">
          <CashFlowAreaChart />
        </TabsContent>
      </Tabs>
      <ApplicantStatusCards />
    </div>
  )
}
