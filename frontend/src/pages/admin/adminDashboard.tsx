import ApplicantStatusCards from '@/components/admin/ApplicantStatusCards'
import { ChartBarMixed } from '@/components/admin/charts/ChartBarMixed'
import { ChartRadialStacked } from '@/components/admin/charts/ChartRadialStacked'
import { TotalTransactionsAreaChart } from '@/components/admin/charts/TotalTransactionsAreaChart'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AdminDashboard() {
  return (
    <div className="space-y-20 ">
      <Tabs defaultValue="users" className="space-y-4 pt-8 ">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="totalTransactions">
            Transactions Volume
          </TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <ChartRadialStacked />
        </TabsContent>
        <TabsContent value="accounts">
          <ChartBarMixed />
        </TabsContent>
        <TabsContent value="totalTransactions">
          <TotalTransactionsAreaChart />
        </TabsContent>
      </Tabs>
      <ApplicantStatusCards />
    </div>
  )
}
