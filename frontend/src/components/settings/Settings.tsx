import { useTranslation } from 'react-i18next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetUser, useUpdateUser, useGetUserSettings } from '@/hooks'
import { useUpdateUserSettings } from '@/hooks/useUpdateUserNotifications'
import { useUser } from '@clerk/clerk-react'
import { useState } from 'react'
import type { UserSettings } from '@/types'
import Spinner from '../generic/Spinner'

const Settings = () => {
  const { t } = useTranslation('settings')
  const [editingEmail, setEditingEmail] = useState<boolean>(false)
  const [editingPhone, setEditingPhone] = useState<boolean>(false)
  const [userNotificationSettings, setUserNotificationSettings] =
    useState<UserSettings>({
      atmWithdrawalNotifications: false,
      cardTransactionNotifications: false,
      depositNotifications: false,
      emailNotifications: false,
      language: 'en',
      smsNotifications: false,
    })
  const { user } = useUser()
  const {
    data: userFromApi,
    isLoading: userFromApiLoading,
    isError: userFromApiError,
  } = useGetUser(user?.id)
  const {
    data: userSettingsFromApi,
    isLoading: userSettingsLoading,
    isError: userSettingsError,
  } = useGetUserSettings()
  const [emailField, setEmailField] = useState<string>('')
  const [phoneNumberField, setPhoneNumberField] = useState<string>('')
  const updateUserMutation = useUpdateUser()
  const updateUserNotifications = useUpdateUserSettings()

  if (userFromApiLoading || userSettingsLoading) return <Spinner />
  if (userFromApiError || userSettingsError)
    return <div className="p-8 text-red-500">{t('settings.errorLoading')}</div>

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

  const updateUserSettings = () => {
    updateUserNotifications.mutate(userNotificationSettings)
  }

  return (
    <>
      <Tabs defaultValue="personal">
        <TabsList>
          <TabsTrigger value="personal">{t('personal')}</TabsTrigger>
          <div
            onClick={() => {
              if (userSettingsFromApi) {
                setUserNotificationSettings(userSettingsFromApi)
              }
            }}
          >
            <TabsTrigger value="general">{t('general')}</TabsTrigger>
          </div>
        </TabsList>
        <div className="ml-5 mt-5">
          <TabsContent value="personal">
            <h3 className="text-xl mb-2">{t('firstName')}:</h3>
            <input
              readOnly
              className="bg-gray-300 rounded-xs p-1 w-[15vw] mb-2"
              type="text"
              value={userFromApi?.firstName ?? ''}
            ></input>
            <h3 className="text-xl mb-2">{t('lastName')}:</h3>
            <input
              readOnly
              className="bg-gray-300 rounded-xs p-1 w-[15vw] mb-2"
              type="text"
              value={userFromApi?.lastName ?? ''}
            ></input>
            <h3 className="text-xl mb-2">{t('email')}:</h3>
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
            <h3 className="text-xl mb-2">{t('phoneNumber')}:</h3>
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
            <h3 className="text-xl mb-2 w-[15vw]">{t('smsNotifications')}</h3>
            <input
              type="checkbox"
              className="ml-2 mb-1"
              checked={userNotificationSettings.smsNotifications}
              onChange={(e) =>
                setUserNotificationSettings({
                  atmWithdrawalNotifications:
                    userNotificationSettings.atmWithdrawalNotifications,
                  cardTransactionNotifications:
                    userNotificationSettings.cardTransactionNotifications,
                  depositNotifications:
                    userNotificationSettings.depositNotifications,
                  emailNotifications:
                    userNotificationSettings.emailNotifications,
                  smsNotifications: e.target.checked,
                  language: userNotificationSettings.language,
                })
              }
            />
          </div>
          <div className="flex flex-row">
            <h3 className="text-xl mb-2 w-[15vw]">{t('emailNotifications')}</h3>
            <input
              type="checkbox"
              className="ml-2 mb-1"
              checked={userNotificationSettings.emailNotifications}
              onChange={(e) =>
                setUserNotificationSettings({
                  atmWithdrawalNotifications:
                    userNotificationSettings.atmWithdrawalNotifications,
                  cardTransactionNotifications:
                    userNotificationSettings.cardTransactionNotifications,
                  depositNotifications:
                    userNotificationSettings.depositNotifications,
                  emailNotifications: e.target.checked,
                  smsNotifications: userNotificationSettings.smsNotifications,
                  language: userNotificationSettings.language,
                })
              }
            />
          </div>
          <hr className="mt-3 mb-3 w-[12vw] h-0.5 bg-gray-300 border-0" />
          <div className="flex flex-row">
            <h3 className="text-xl mb-2 w-[15vw]">
              {t('cardTransactionNotifications')}
            </h3>
            <input
              type="checkbox"
              className="ml-2 mb-1"
              checked={userNotificationSettings.cardTransactionNotifications}
              onChange={(e) =>
                setUserNotificationSettings({
                  atmWithdrawalNotifications:
                    userNotificationSettings.atmWithdrawalNotifications,
                  cardTransactionNotifications: e.target.checked,
                  depositNotifications:
                    userNotificationSettings.depositNotifications,
                  emailNotifications:
                    userNotificationSettings.emailNotifications,
                  smsNotifications: userNotificationSettings.smsNotifications,
                  language: userNotificationSettings.language,
                })
              }
            />
          </div>
          <div className="flex flex-row">
            <h3 className="text-xl mb-2 w-[15vw]">
              {t('ATMWithdrawalsNotifications')}
            </h3>
            <input
              type="checkbox"
              className="ml-2 mb-1"
              checked={userNotificationSettings.atmWithdrawalNotifications}
              onChange={(e) =>
                setUserNotificationSettings({
                  atmWithdrawalNotifications: e.target.checked,
                  cardTransactionNotifications:
                    userNotificationSettings.cardTransactionNotifications,
                  depositNotifications:
                    userNotificationSettings.depositNotifications,
                  emailNotifications:
                    userNotificationSettings.emailNotifications,
                  smsNotifications: userNotificationSettings.smsNotifications,
                  language: userNotificationSettings.language,
                })
              }
            />
          </div>
          <div className="flex flex-row">
            <h3 className="text-xl mb-2 w-[15vw]">
              {t('depositNotifications')}
            </h3>
            <input
              type="checkbox"
              className="ml-2 mb-1"
              checked={userNotificationSettings.depositNotifications}
              onChange={(e) =>
                setUserNotificationSettings({
                  atmWithdrawalNotifications:
                    userNotificationSettings.atmWithdrawalNotifications,
                  cardTransactionNotifications:
                    userNotificationSettings.cardTransactionNotifications,
                  depositNotifications: e.target.checked,
                  emailNotifications:
                    userNotificationSettings.emailNotifications,
                  smsNotifications: userNotificationSettings.smsNotifications,
                  language: userNotificationSettings.language,
                })
              }
            />
          </div>
          <hr className="mt-3 mb-3 w-[12vw] h-0.5 bg-gray-300 border-0" />
          <div className="flex flex-row">
            <h3 className="text-xl mb-2 w-[13vw]">{t('language')}</h3>
            <select
              className="w-[5vw]"
              value={`${userNotificationSettings.language === 'en' ? `English` : `Swedish`}`}
              onChange={(e) =>
                setUserNotificationSettings({
                  atmWithdrawalNotifications:
                    userNotificationSettings.atmWithdrawalNotifications,
                  cardTransactionNotifications:
                    userNotificationSettings.cardTransactionNotifications,
                  depositNotifications:
                    userNotificationSettings.depositNotifications,
                  emailNotifications:
                    userNotificationSettings.emailNotifications,
                  smsNotifications: userNotificationSettings.smsNotifications,
                  language: `${e.target.value === 'English' ? `en` : `sv`}`,
                })
              }
            >
              <option value="English">{t('english')}</option>
              <option value="Swedish">{t('swedish')}</option>
            </select>
          </div>
          <button
            onClick={() => {
              updateUserSettings()
            }}
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
