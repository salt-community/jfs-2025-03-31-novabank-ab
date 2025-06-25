import { useTranslation } from 'react-i18next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetUser, useUpdateUser, useGetUserSettings } from '@/hooks'
import { useUpdateUserSettings } from '@/hooks/useUpdateUserNotifications'
import { useEffect, useState } from 'react'
import type { UserSettings } from '@/types'
import Spinner from '../generic/Spinner'
import { toast } from 'react-toastify'

const Settings = () => {
  const { t } = useTranslation('settings')

  const {
    data: userFromApi,
    isLoading: userFromApiLoading,
    isError: userFromApiError,
  } = useGetUser()

  const {
    data: userSettingsFromApi,
    isLoading: userSettingsLoading,
    isError: userSettingsError,
  } = useGetUserSettings()

  const updateUserMutation = useUpdateUser()
  const updateUserNotifications = useUpdateUserSettings()

  const [editingEmail, setEditingEmail] = useState(false)
  const [editingPhone, setEditingPhone] = useState(false)

  const [userNotificationSettings, setUserNotificationSettings] =
    useState<UserSettings>({
      atmWithdrawalNotifications: false,
      cardTransactionNotifications: false,
      depositNotifications: false,
      emailNotifications: false,
      language: 'en',
      smsNotifications: false,
    })

  const [emailField, setEmailField] = useState('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [phoneError, setPhoneError] = useState<string | null>(null)
  const [phoneNumberField, setPhoneNumberField] = useState('')

  useEffect(() => {
    if (userFromApi) {
      setEmailField(userFromApi.email || '')
      setPhoneNumberField(userFromApi.phoneNumber || '')
    }
  }, [userFromApi])

  if (userFromApiLoading || userSettingsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    )
  }

  if (userFromApiError || userSettingsError) {
    return <div className="p-8 text-red-500">{t('settings.errorLoading')}</div>
  }

  if (!userFromApi || !userSettingsFromApi) {
    return <div className="p-8 text-red-500">{t('settings.errorLoading')}</div>
  }

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isValidPhoneNumber = (phone: string) => /^\+?[0-9]{7,15}$/.test(phone)

  const cancelEmailEdit = () => {
    setEmailField(userFromApi.email || '')
    setEditingEmail(false)
    setEmailError(null)
  }

  const cancelPhoneEdit = () => {
    setPhoneNumberField(userFromApi.phoneNumber || '')
    setEditingPhone(false)
    setPhoneError(null)
  }

  const updateUser = (whatToUpdate: 'email' | 'phonenumber'): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!userFromApi) return reject()

      const userPayload = {
        email: userFromApi.email,
        firstName: userFromApi.firstName,
        lastName: userFromApi.lastName,
        phoneNumber: userFromApi.phoneNumber,
        role: 'USER' as const,
        status: 'ACTIVE' as const,
      }

      if (whatToUpdate === 'email') {
        if (!isValidEmail(emailField)) {
          setEmailError('Invalid email')
          return reject()
        }

        setEmailError(null)

        updateUserMutation.mutate(
          { ...userPayload, email: emailField },
          {
            onSuccess: () => resolve(),
            onError: () => {
              toast.error('Failed to save email')
              reject()
            },
          },
        )
      }

      if (whatToUpdate === 'phonenumber') {
        if (!isValidPhoneNumber(phoneNumberField)) {
          setPhoneError('Invalid phone number')
          return reject()
        }

        setPhoneError(null)

        updateUserMutation.mutate(
          { ...userPayload, phoneNumber: phoneNumberField },
          {
            onSuccess: () => resolve(),
            onError: () => {
              toast.error('Failed to save phone number')
              reject()
            },
          },
        )
      }
    })
  }

  const handleUpdateSettings = () => {
    updateUserNotifications.mutate(userNotificationSettings, {
      onSuccess: () => toast.success(t('saved')),
      onError: () => toast.error(t('failed')),
    })
  }

  return (
    <div className="min-h-screen overflow-y-auto">
      <Tabs
        defaultValue="personal"
        onValueChange={(value) => {
          if (value === 'general' && userSettingsFromApi) {
            setUserNotificationSettings(userSettingsFromApi)
          }
        }}
      >
        <TabsList>
          <TabsTrigger value="personal">{t('personal')}</TabsTrigger>
          <TabsTrigger value="general">{t('general')}</TabsTrigger>
        </TabsList>

        <div className="max-w-lg w-full shadow-md p-4 mt-5">
          <TabsContent value="personal">

            <div className="hover:cursor-default">
              <h3 className="text-xl md:text-2xl mb-2">Namn</h3>
              <div className="flex gap-1">
                <p className="text-gray-500 text-2xl">
                  {userFromApi.firstName}
                </p>
                <p className="text-gray-500 text-2xl">{userFromApi.lastName}</p>
              </div>
            </div>

            {/* Email Section */}
            <div className="mt-4">
              <h3 className="text-xl md:text-2xl hover:cursor-default mb-2">{t('email')}</h3>
              <div className="flex items-center gap-4 mb-2">
                <input
                  onChange={(e) => setEmailField(e.target.value)}
                  disabled={!editingEmail}
                  className={`${
                    editingEmail
                      ? 'border border-black'
                      : 'border border-transparent bg-gray-100'
                  } w-full rounded-xs p-1 shadow-sm`}
                  type="text"
                  value={emailField}
                />
                {!editingEmail ? (
                  <button
                    onClick={() => setEditingEmail(true)}
                    className="text-black hover:opacity-70 hover:cursor-pointer"
                  >
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        updateUser('email')
                          .then(() => setEditingEmail(false))
                          .catch(() => {})
                      }
                      className="text-black hover:opacity-70 hover:cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEmailEdit}
                      className="text-red-500 hover:opacity-70 hover:cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              {emailError && (
                <p className="text-red-600 text-sm mb-2">{emailError}</p>
              )}
            </div>

            {/* Phone Section */}
            <div className="mt-4">
              <h3 className="text-xl md:text-2xl hover:cursor-default mb-2">{t('phoneNumber')}</h3>
              <div className="flex items-center gap-4 mb-2">
                <input
                  onChange={(e) => setPhoneNumberField(e.target.value)}
                  disabled={!editingPhone}
                  className={`${
                    editingPhone
                      ? 'border border-black'
                      : 'border border-transparent bg-gray-100'
                  } w-full rounded-xs p-1 shadow-sm`}
                  type="text"
                  value={phoneNumberField}
                />
                {!editingPhone ? (
                  <button
                    onClick={() => setEditingPhone(true)}
                    className="text-black hover:opacity-70 hover:cursor-pointer"
                  >
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        updateUser('phonenumber')
                          .then(() => setEditingPhone(false))
                          .catch(() => {})
                      }
                      className="text-black hover:opacity-70 hover:cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelPhoneEdit}
                      className="text-red-500 hover:opacity-70 hover:cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              {phoneError && (
                <p className="text-red-600 text-sm">{phoneError}</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="general">
            {(
              [
                'smsNotifications',
                'emailNotifications',
                'cardTransactionNotifications',
                'atmWithdrawalNotifications',
                'depositNotifications',
              ] as (keyof Omit<UserSettings, 'language'>)[]
            ).map((key) => (
              <div
                key={key}
                className="flex flex-row items-center justify-between mb-4 w-full"
              >
                <h3 className="text-lg sm:text-xl">{t(key)}</h3>
                <input
                  type="checkbox"
                  className="ml-4 w-5 h-5 cursor-pointer"
                  checked={!!userNotificationSettings[key]}
                  onChange={(e) =>
                    setUserNotificationSettings((prev) => ({
                      ...prev,
                      [key]: e.target.checked,
                    }))
                  }
                />
              </div>
            ))}
            <div className="flex flex-col md:flex-row items-start md:items-center mb-8 w-full">
              <h3 className="text-2xl mb-2 md:mb-0 md:mr-4 w-full md:w-auto">
                {t('language')}
              </h3>
              <select
                className="w-full md:w-40 h-8 shadow-sm border-r-8 border-transparent"
                value={userNotificationSettings.language}
                onChange={(e) =>
                  setUserNotificationSettings((prev) => ({
                    ...prev,
                    language: e.target.value,
                  }))
                }
              >
                <option value="en">{t('english')}</option>
                <option value="sv">{t('swedish')}</option>
              </select>
            </div>
            <div className="flex justify-center mt-5">
              <button
                onClick={handleUpdateSettings}
                type="submit"
                className="bg-[#FFB20F] mt-5 hover:bg-[#F5A700] text-black shadow-sm py-2 rounded-4xl w-full transition-colors"
              >
                {t('savePreferences')}
              </button>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

export default Settings
