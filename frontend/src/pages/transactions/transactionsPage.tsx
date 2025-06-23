import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  useGetAllTransactions,
  useAiSearchBar,
  useGetTransactionsFromIdsGivenByAi,
} from '@/hooks'
import Spinner from '@/components/generic/Spinner'
import { TransactionItem } from '@/components/generic/transaction-items/TransactionItem'
// import { TransactionFromAi } from '@/components/generic/transaction-items/TransactionFromAi'
import type { Transaction } from '@/types'
import useFetchEntries from '@/hooks/useFetchEntries'

export default function TransactionsPage() {
  const { t } = useTranslation('accounts')
  const [page, setPage] = useState(0)
  const pageSize = 10

  const [transactionsFromIdsGivenByAi, setTransactionsFromIdsGivenByAi] =
    useState<Array<Transaction>>([])

  const [heightAiDiv, setHeightAiDiv] = useState<string>('max-h-0')

  const sendQueryToAi = useAiSearchBar()
  const sendIdsAndGetTransactions = useGetTransactionsFromIdsGivenByAi()

  const [searchBarOpen, setSearchBarOpen] = useState<boolean>(false)
  const [aiSearchBarInputContent, setAiSearchBarInputContent] =
    useState<string>('')

  const { data, isLoading, isError } = useGetAllTransactions(page, pageSize)

  if (isError || !data) {
    return (
      <div className="p-8 text-red-500">{t('failedToLoadTransactions')}</div>
    )
  }

  const { entries: AIEntries, isLoading: aiLoading } = useFetchEntries(
    transactionsFromIdsGivenByAi,
  )
  
  const { entries: allEntries, isLoading: allLoading } = useFetchEntries(
    data.content,
  )

  if (isLoading || aiLoading || allLoading) return <Spinner />

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
                          setTransactionsFromIdsGivenByAi(data)
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
            onChange={(e) => setAiSearchBarInputContent(e.target.value)}
            className="w-full bg-transparent outline-none p-1"
            onClick={() => setSearchBarOpen(true)}
            placeholder={
              searchBarOpen ? t('whatDoYouWantToFindToday') : t('aiAssistant')
            }
            value={aiSearchBarInputContent}
          />
          <p className="ml-2">🔍</p>
        </div>
      </div>

      <div className="px-5 shadow-sm">
        {AIEntries.length > 0 && (
          <div
            className={`${heightAiDiv} overflow-y-scroll transition-[max-height] duration-1500 ease-in-out`}
          >
            <h1 className="text-2xl">{t('resultsFromYourSearch')}</h1>
            {AIEntries.map((tx) => {
              return (
                <TransactionItem
                  key={tx.key}
                  description={tx.description}
                  theAccount={tx.theAccount}
                  accountNoType={tx.accountNoType}
                  amount={tx.amount}
                  time={tx.time}
                  direction={tx.direction}
                  category={tx.category}
                />
              )
            })}

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
        {allEntries.length === 0 ? (
          <div className="p-4 text-gray-500">{t('noTransactionsFound')}</div>
        ) : (
          allEntries.map((tx) => (
            <TransactionItem
              key={tx.key}
              description={tx.description}
              theAccount={tx.theAccount}
              accountNoType={tx.accountNoType}
              amount={tx.amount}
              time={tx.time}
              direction={tx.direction}
              category={tx.category}
            />
          ))
        )}
      </div>

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
