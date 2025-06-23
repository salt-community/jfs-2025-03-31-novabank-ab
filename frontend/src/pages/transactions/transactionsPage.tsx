import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  useGetAllTransactions,
  useAccounts,
  useAiSearchBar,
  useGetTransactionsFromIdsGivenByAi,
} from '@/hooks'
import Spinner from '@/components/generic/Spinner'
import { AllTransactionsItem } from '@/components/generic/AllTransactionsItem'
import { TransactionFromAi } from '@/components/generic/TransactionFromAi'
import type { TransactionFromId } from '@/types'
import { NoTransactionItem } from '@/components/generic'

export default function TransactionsPage() {
  const { t } = useTranslation('accounts')
  const [page, setPage] = useState(0)
  const pageSize = 10

  const [transactionsFromIdsGivenByAi, setTransactionsFromIdsGivenByAi] =
    useState<Array<TransactionFromId>>([])

  const [heightAiDiv, setHeightAiDiv] = useState<string>('max-h-0')

  const sendQueryToAi = useAiSearchBar()

  const sendIdsAndGetTransactions = useGetTransactionsFromIdsGivenByAi()

  const [searchBarOpen, setSearchBarOpen] = useState<boolean>(false)

  const [aiSearchBarInputContent, setAiSearchBarInputContent] =
    useState<string>('')

  const { data, isLoading, isError } = useGetAllTransactions(page, pageSize)

  const { data: accounts = [], isLoading: accountsLoading } = useAccounts()

  const myAccountIds = new Set(accounts?.map((a) => a.id))

  if (isLoading || accountsLoading) return <Spinner />
  if (isError || !data) {
    return (
      <div className="p-8 text-red-500">{t('failedToLoadTransactions')}</div>
    )
  }

  const transactionEntries: {
    key: string
    description: string
    accountNoType: string
    amount: number
    time: string
    direction: 'in' | 'out'
    theAccount?: string
  }[] = []

  data.content.forEach((tx) => {
    const fromIsMine = myAccountIds.has(tx.fromAccountId)
    const toIsMine = myAccountIds.has(tx.toAccountId)

    const fromAccount = accounts.find((a) => a.id === tx.fromAccountId)
    const toAccount = accounts.find((a) => a.id === tx.toAccountId)

    if (fromIsMine && toIsMine) {
      // Internal transfer, show both sides

      // Outgoing from "from" account
      transactionEntries.push({
        key: tx.transactionId + '-out',
        description: tx.description,
        accountNoType: tx.type,
        amount: tx.amount,
        time: tx.date,
        direction: 'out',
        theAccount: fromAccount?.type,
      })

      // Incoming to "to" account
      transactionEntries.push({
        key: tx.transactionId + '-in',
        description: tx.description,
        accountNoType: tx.type,
        amount: tx.amount,
        time: tx.date,
        direction: 'in',
        theAccount: toAccount?.type,
      })
    } else if (fromIsMine) {
      // Outgoing from user's account to external
      transactionEntries.push({
        key: tx.transactionId + '-out',
        description: tx.description,
        accountNoType: tx.type,
        amount: tx.amount,
        time: tx.date,
        direction: 'out',
        theAccount: fromAccount?.type,
      })
    } else if (toIsMine) {
      // Incoming to user's account from external
      transactionEntries.push({
        key: tx.transactionId + '-in',
        description: tx.description,
        accountNoType: tx.type,
        amount: tx.amount,
        time: tx.date,
        direction: 'in',
        theAccount: toAccount?.type,
      })
    }
  })

  return (
    <div>
      <h1 className="text-3xl mb-20">{t('allTransactions')}</h1>
      <div className="flex justify-end mb-5">
        <div
          className={`${
            searchBarOpen ? 'w-full' : 'w-36'
          } transition-[width] duration-300 ease-in-out bg-gray-200 rounded-sm flex items-center px-2`}
        >
          <input
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendQueryToAi.mutate(
                  { query: aiSearchBarInputContent },
                  {
                    onSuccess(data) {
                      sendIdsAndGetTransactions.mutate(data, {
                        onSuccess(data) {
                          if (data.length > 0) {
                            setTransactionsFromIdsGivenByAi(data)
                          } else {
                            setTransactionsFromIdsGivenByAi([
                              {
                                amount: 0,
                                category: '',
                                date: 'null',
                                description: 'ERROR',
                                fromAccountId: 'null',
                                ocrNumber: 'null',
                                status: 'null',
                                toAccountId: 'null',
                                transactionId: 'null',
                                type: 'null',
                                userNote: 'null',
                              },
                            ])
                          }
                          setTimeout(() => {
                            setHeightAiDiv('max-h-[2000px]')
                          }, 200)
                        },
                      })
                    },
                  },
                )
                setAiSearchBarInputContent('')
                setSearchBarOpen(false)
              }
              if (e.key === 'Escape') {
                setAiSearchBarInputContent('')
                setSearchBarOpen(false)
              }
            }}
            onChange={(e) => {
              setAiSearchBarInputContent(e.target.value)
            }}
            className="w-full bg-transparent outline-none p-1"
            onClick={() => setSearchBarOpen((prev) => !prev)}
            placeholder={
              searchBarOpen ? t('whatDoYouWantToFindToday') : t('aiAssistant')
            }
            value={aiSearchBarInputContent}
          />
          <p className="ml-2">🔍</p>
        </div>
      </div>

      <div className="px-5 shadow-sm">
        {transactionsFromIdsGivenByAi.length > 0 && (
          <div
            className={`${heightAiDiv} overflow-y-scroll transition-[max-height] duration-1500 ease-in-out`}
          >
            <h1 className="text-2xl">{t('resultsFromYourSearch')}</h1>
            {transactionsFromIdsGivenByAi[0].description === 'ERROR' ? (
              <NoTransactionItem />
            ) : (
              transactionsFromIdsGivenByAi.map((tx) => (
                <TransactionFromAi
                  key={tx.transactionId}
                  amount={tx.amount}
                  date={tx.date}
                  description={tx.description}
                  userNote={tx.userNote}
                  category={tx.category}
                  fromAccountId={tx.fromAccountId}
                  ocrNumber={tx.ocrNumber}
                  status={tx.status}
                  toAccountId={tx.toAccountId}
                  transactionId={tx.transactionId}
                  type={tx.type}
                />
              ))
            )}

            <div className="flex justify-center">
              <button
                className="bg-[#FFB20F] mt-5 hover:bg-[#F5A700] text-black font-semibold shadow-sm px-5 py-2 rounded hover:cursor-pointer transition-colors w-[10vw]"
                onClick={() => {
                  setHeightAiDiv('max-h-0')
                  setTimeout(() => {
                    setTransactionsFromIdsGivenByAi([])
                  }, 1500)
                }}
              >
                {t('close')}
              </button>
            </div>
            <h1 className="text-2xl mt-3 mb-3">{t('allTransactions')}</h1>
          </div>
        )}
        {transactionEntries.length === 0 ? (
          <div className="p-4 text-gray-500">{t('noTransactionsFound')}</div>
        ) : (
          transactionEntries.map((tx) => (
            <AllTransactionsItem
              key={tx.key}
              description={tx.description}
              theAccount={tx.theAccount}
              accountNoType={tx.accountNoType}
              amount={tx.amount}
              time={tx.time}
              direction={tx.direction}
            />
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center px-5 py-4">
        <button
          className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
          disabled={data.first}
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
        >
          {t('previous')}
        </button>

        <span className="text-sm text-gray-600">
          {t('page')} {data.number + 1} / {data.totalPages}
        </span>

        <button
          className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
          disabled={data.last}
          onClick={() => setPage((p) => p + 1)}
        >
          {t('next')}
        </button>
      </div>
    </div>
  )
}
