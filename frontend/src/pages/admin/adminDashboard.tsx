import ApplicantStatusCards from '@/components/admin/ApplicantStatusCards'
import ActiveUsersAreaChart from '@/components/admin/charts/ActiveUsersAreaChart'
import { TotalTransactionsAreaChart } from '@/components/admin/charts/TotalTransactionsAreaChart'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AdminDashboard() {
  return (
    <div className="space-y-20 ">
      <Tabs defaultValue="activeUsers">
        <TabsList>
          <TabsTrigger value="activeUsers">Active Users</TabsTrigger>
          <TabsTrigger value="totalTransactions">
            Transactions Volume
          </TabsTrigger>
        </TabsList>
        <TabsContent value="activeUsers">
          <ActiveUsersAreaChart />
        </TabsContent>
        <TabsContent value="totalTransactions">
          <TotalTransactionsAreaChart />
        </TabsContent>
      </Tabs>
      <ApplicantStatusCards />
    </div>
  )
}
