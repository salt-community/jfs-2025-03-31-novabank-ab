export async function login(token: string): Promise<boolean> {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  try {
    const res = await fetch(BASE_URL.concat('auth/login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('Backend login failed', res.status, errText)
      return false
    }

    return true
  } catch (err) {
    console.error('Backend login error:', err)
    return false
  }
}
