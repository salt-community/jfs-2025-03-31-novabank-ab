import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useUser } from '@clerk/clerk-react'
import { useState } from 'react'
const Settings = () => {
  const [editingEmail, setEditingEmail] = useState<boolean>(false)
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
              readOnly
              className="bg-gray-200 rounded-xs p-1 w-[15vw] mb-2"
              type="text"
              value={user?.firstName ?? ''}
            ></input>
            <h3 className="text-xl mb-2">Last name:</h3>
            <input
              readOnly
              className="bg-gray-200 rounded-xs p-1 w-[15vw] mb-2"
              type="text"
              value={user?.lastName ?? ''}
            ></input>
            <h3 className="text-xl mb-2">Email:</h3>
            <div className="flex items-center text-center align-middle">
              <input
                readOnly={!editingEmail}
                className={`${editingEmail ? `bg-gray-100` : `bg-gray-200`} rounded-xs p-1 w-[15vw] mb-2`}
                type="text"
                defaultValue={user?.primaryEmailAddress?.emailAddress ?? ''}
              ></input>
              <p
                className="ml-2 mb-2 text-blue-500"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setEditingEmail((prev) => !prev!)
                }}
              >
                {editingEmail ? 'Save' : 'Edit'}
              </p>
            </div>
            <h3 className="text-xl mb-2">Phone Number:</h3>
            <input
              className="bg-gray-200 rounded-xs p-1 w-[15vw] mb-2"
              type="text"
              defaultValue={user?.primaryPhoneNumber?.phoneNumber ?? ''}
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
