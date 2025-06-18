import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetUser, useUpdateUser } from '@/hooks'
import { useUser } from '@clerk/clerk-react'
import { useState } from 'react'
import Spinner from '../generic/Spinner'

const Settings = () => {
  const [editingEmail, setEditingEmail] = useState<boolean>(false)
  const [editingPhone, setEditingPhone] = useState<boolean>(false)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [cardNotifications, setCardNotifications] = useState(false)
  const [atmNotifications, setAtmNotifications] = useState(false)
  const [depositNotifications, setDepositNotifications] = useState(false)
  const [language, setLanguage] = useState('English')
  const { user } = useUser()
  const { data: userFromApi, isLoading, isError } = useGetUser(user?.id)
  const [emailField, setEmailField] = useState<string>('')
  const [phoneNumberField, setPhoneNumberField] = useState<string>('')
  const updateUserMutation = useUpdateUser()


  if (isLoading) return <Spinner />
  if (isError)
    return <div className="p-8 text-red-500">Failed loading user details</div>

  const updateUser = (whatToUpdate: string) => {
    if (userFromApi) {
      if (whatToUpdate === 'email') {
        updateUserMutation.mutate({
          email: emailField,
          firstName: userFromApi.firstName,
          lastName: userFromApi.lastName,
          phoneNumber: userFromApi.phoneNumber,
          role: 'USER',
          status: 'ACTIVE',
        })
      } else if (whatToUpdate === 'phonenumber') {
        updateUserMutation.mutate({
          email: userFromApi.email,
          firstName: userFromApi.firstName,
          lastName: userFromApi.lastName,
          phoneNumber: phoneNumberField,
          role: 'USER',
          status: 'ACTIVE',
        })
      }
    }
  }

  return (
    <>
      <Tabs defaultValue="personal">
        <TabsList>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>
        <div className="ml-5 mt-5">
          <TabsContent value="personal">
            <h3 className="text-xl mb-2">First name:</h3>
            <input
              readOnly
              className="bg-gray-300 rounded-xs p-1 w-[15vw] mb-2"
              type="text"
              value={userFromApi?.firstName ?? ''}
            ></input>
            <h3 className="text-xl mb-2">Last name:</h3>
            <input
              readOnly
              className="bg-gray-300 rounded-xs p-1 w-[15vw] mb-2"
              type="text"
              value={userFromApi?.lastName ?? ''}
            ></input>
            <h3 className="text-xl mb-2">Email:</h3>
            <div className="flex items-center text-center align-middle">
              <input
                onChange={(e) => setEmailField(e.target.value)}
                readOnly={!editingEmail}
                className={`${editingEmail ? `bg-gray-200` : `bg-gray-300`} rounded-xs p-1 w-[15vw] mb-2`}
                type="text"
                defaultValue={userFromApi?.email}
              ></input>
              <p
                className="ml-2 mb-2 text-blue-500"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (editingEmail) {
                    updateUser('email')
                  }
                  setEditingEmail((prev) => !prev)
                }}
              >
                {editingEmail ? 'Save' : 'Edit'}
              </p>
            </div>
            <h3 className="text-xl mb-2">Phone Number:</h3>
            <div className="flex items-center text-center align-middle">
              <input
                onChange={(e) => setPhoneNumberField(e.target.value)}
                readOnly={!editingPhone}
                className={`${editingPhone ? `bg-gray-200` : `bg-gray-300`} rounded-xs p-1 w-[15vw] mb-2`}
                type="text"
                defaultValue={userFromApi?.phoneNumber}
              />
              <p
                className="ml-2 mb-2 text-blue-500"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (editingPhone) {
                    updateUser('phonenumber')
                  }
                  setEditingPhone((prev) => !prev)
                }}
              >
                {editingPhone ? 'Save' : 'Edit'}
              </p>
            </div>
          </TabsContent>
        </div>
        <TabsContent value="general">
          <div className="flex flex-row">
            <h3 className="text-xl mb-2 w-[15vw]">SMS notifications</h3>
            <input
              type="checkbox"
              className="ml-2 mb-1"
              checked={smsNotifications}
              onChange={(e) => setSmsNotifications(e.target.checked)}
            />
          </div>
          <div className="flex flex-row">
            <h3 className="text-xl mb-2 w-[15vw]">Email notifications</h3>
            <input
              type="checkbox"
              className="ml-2 mb-1"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
            />
          </div>
          <hr className="mt-3 mb-3 w-[12vw] h-0.5 bg-gray-300 border-0" />
          <div className="flex flex-row">
            <h3 className="text-xl mb-2 w-[15vw]">
              Card transactions notifications
            </h3>
            <input
              type="checkbox"
              className="ml-2 mb-1"
              checked={cardNotifications}
              onChange={(e) => setCardNotifications(e.target.checked)}
            />
          </div>
          <div className="flex flex-row">
            <h3 className="text-xl mb-2 w-[15vw]">
              ATM withdrawals notifications
            </h3>
            <input
              type="checkbox"
              className="ml-2 mb-1"
              checked={atmNotifications}
              onChange={(e) => setAtmNotifications(e.target.checked)}
            />
          </div>
          <div className="flex flex-row">
            <h3 className="text-xl mb-2 w-[15vw]">Deposits notifications</h3>
            <input
              type="checkbox"
              className="ml-2 mb-1"
              checked={depositNotifications}
              onChange={(e) => setDepositNotifications(e.target.checked)}
            />
          </div>
          <hr className="mt-3 mb-3 w-[12vw] h-0.5 bg-gray-300 border-0" />
          <div className="flex flex-row">
            <h3 className="text-xl mb-2 w-[13vw]">Language</h3>
            <select
              className="w-[5vw]"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Swedish">Swedish</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-[#FFB20F] mt-5 hover:bg-[#F5A700] text-black font-semibold shadow-sm px-5 py-2 rounded hover:cursor-pointer transition-colors w-[10vw]"
          >
            Save Preferences
          </button>
        </TabsContent>
      </Tabs>
    </>
  )
}

export default Settings
