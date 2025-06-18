const BASE_URL = import.meta.env.VITE_BASE_URL

export async function createTransaction(
  transactionPayload: {
    fromAccountNo: string
    toAccountNo: string
    type: string
    transactionDate: string
    amount: number
    description: string
    userNote: string
    ocrNumber: string
  },
  token: string,
): Promise<boolean> {
  const response = await fetch(BASE_URL.concat('account/transaction/'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(transactionPayload),
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to create transaction')
  }

  return response.ok
}
