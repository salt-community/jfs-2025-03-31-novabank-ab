import { useTranslation } from 'react-i18next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetUser, useUpdateUser, useGetUserSettings } from '@/hooks'
import { useUpdateUserSettings } from '@/hooks/useUpdateUserNotifications'
import { useUser } from '@clerk/clerk-react'
import { useState } from 'react'
import type { UserSettings } from '@/types'
import Spinner from '../generic/Spinner'
import { toast } from 'react-toastify'

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
    updateUserNotifications.mutate(userNotificationSettings, {
          onSuccess: () => {
            toast.success(t('saved'))
          },
          onError: () => {
            toast.error(t('failed'))
          },
        })
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
        <div className="max-w-lg shadow-sm p-5 mt-5">
          <TabsContent value="personal">
            <h3 className="text-2xl mb-4">{t('firstName')}:</h3>
            <input
              readOnly
              className="shadow-sm p-1 w-100 mb-2"
              type="text"
              value={userFromApi?.firstName ?? ''}
            ></input>
            <h3 className="text-2xl mb-4 mt-4">{t('lastName')}:</h3>
            <input
              readOnly
              className="shadow-sm p-1 w-100 mb-2"
              type="text"
              value={userFromApi?.lastName ?? ''}
            ></input>
            <h3 className="text-2xl mb-4 mt-4">{t('email')}:</h3>
            <div className="flex items-center text-center align-middle">
              <input
                onChange={(e) => setEmailField(e.target.value)}
                readOnly={!editingEmail}
                className={`${editingEmail ? `border-1` : `shadow-sm border-1 border-transparent`} rounded-xs p-1 w-100 mb-2`}
                type="text"
                defaultValue={userFromApi?.email}
              ></input>
              <p
                className="ml-6 text-md text-black hover:opacity-70 underline-offset-5 hover:cursor-pointer"
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
            <h3 className="text-2xl mb-4 mt-4">{t('phoneNumber')}:</h3>
            <div className="flex items-center text-center align-middle">
              <input
                onChange={(e) => setPhoneNumberField(e.target.value)}
                readOnly={!editingPhone}
                className={`${editingPhone ? `border-1` : `shadow-sm border-1 border-transparent`} rounded-xs p-1 w-100 mb-2`}
                type="text"
                defaultValue={userFromApi?.phoneNumber}
              />
              <p
                className="ml-6 text-md text-black hover:opacity-70 underline-offset-5 hover:cursor-pointer"
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
          <TabsContent value="general">
            <div className="flex flex-row items-center mb-8 w-full">
              <h3 className="text-2xl w-100">{t('smsNotifications')}</h3>
              <input
                type="checkbox"
                className="ml-2 mb-1 cursor-pointer"
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
            <div className="flex flex-row items-center mb-8 w-full">
              <h3 className="text-2xl w-100">{t('emailNotifications')}</h3>
              <input
                type="checkbox"
                className="ml-2 mb-1 cursor-pointer"
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
            <div className="flex flex-row items-center mb-8 w-full">
              <h3 className="text-2xl w-100">
                {t('cardTransactionNotifications')}
              </h3>
              <input
                type="checkbox"
                className="ml-2 mb-1 cursor-pointer"
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
            <div className="flex flex-row items-center mb-8 w-full">
              <h3 className="text-2xl w-100">
                {t('ATMWithdrawalsNotifications')}
              </h3>
              <input
                type="checkbox"
                className="ml-2 mb-1 cursor-pointer"
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
            <div className="flex flex-row items-center mb-8 w-full">
              <h3 className="text-2xl w-100">{t('depositNotifications')}</h3>
              <input
                type="checkbox"
                className="ml-2 mb-1 cursor-pointer"
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
            <div className="flex flex-row items-center mb-8 w-full">
              <h3 className="text-2xl w-71">{t('language')}</h3>
              <select
                className="w-35 h-8 shadow-sm"
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
            <div className="flex justify-center mt-5">
              <button
                onClick={() => {
                  updateUserSettings()
                }}
                type="submit"
                className="bg-[#FFB20F] mt-5 hover:bg-[#F5A700] text-black shadow-sm py-2 rounded-4xl hover:cursor-pointer transition-colors w-[10vw]"
              >
                {t('savePreferences')}
              </button>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </>
  )
}

export default Settings
