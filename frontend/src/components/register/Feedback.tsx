import React from 'react'

interface Props {
  isError: boolean
  errorMsg?: string
  isSuccess: boolean
  successMsg?: string
}

export const Feedback: React.FC<Props> = ({
  isError,
  errorMsg,
  isSuccess,
  successMsg,
}) => (
  <div className="mt-3">
    {isError && <p className="text-red-600">Error: {errorMsg}</p>}
    {isSuccess && <p className="text-green-600">{successMsg}</p>}
  </div>
)
