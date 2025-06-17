import ActiveUsersAreaChart from '@/components/admin/charts/ActiveUsersAreaChart'
import CashFlowAreaChart from '@/components/admin/charts/CashFlowAreaChart'
import SectionCard from '@/components/admin/SectionCard'
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
