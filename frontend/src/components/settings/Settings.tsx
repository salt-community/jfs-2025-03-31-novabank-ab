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
        <div className="ml-5 mt-5">
          <TabsContent value="personal">
            <h3 className="text-xl mb-2">First name:</h3>
            <input
              className="bg-gray-200 rounded-xs p-1 w-[10vw]"
              type="text"
              value={user?.firstName ?? ''}
            ></input>
          </TabsContent>
        </div>
        <TabsContent value="notifications">notifications BRO</TabsContent>
        <TabsContent value="language">language BRO</TabsContent>
      </Tabs>
    </>
  )
}

export default Settings
