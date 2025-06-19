const BASE_URL = import.meta.env.VITE_BASE_URL

export async function cancelTransaction(token: string, transactionId: string): Promise<boolean> {
  const res = await fetch(BASE_URL.concat("account/", "cancel-scheduled/", transactionId), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  if (!res.ok) {
    throw new Error('Failed to cancel transaction')
  }

  return res.ok
}
