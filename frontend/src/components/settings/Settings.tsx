import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useUser } from '@clerk/clerk-react'
const Settings = () => {
  const { user } = useUser()
  return (
    <>
      <Tabs defaultValue="personal">
        <TabsList>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="language">Language</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">First name:</TabsContent>
        <TabsContent value="notifications">notifications BRO</TabsContent>
        <TabsContent value="language">language BRO</TabsContent>
      </Tabs>
      <button
        onClick={() => {
          console.log(user)
        }}
      >
        TEST
      </button>
    </>
  )
}

export default Settings
