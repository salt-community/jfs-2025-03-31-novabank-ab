const BASE_URL = import.meta.env.VITE_BASE_URL

export async function createAccount(
  account: { type: string; abbrevation: string },
  token: string,
): Promise<boolean> {
  const response = await fetch(BASE_URL.concat('account/'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(account),
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to create account')
  }

  return response.ok
}
