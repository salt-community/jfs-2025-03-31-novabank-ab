import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  useGetAllTransactions,
  useAiSearchBar,
  useGetTransactionsFromIdsGivenByAi,
} from '@/hooks'
import Spinner from '@/components/generic/Spinner'
import type { Account, Transaction } from '@/types'
import useFetchEntries from '@/hooks/useFetchEntries'
import { searchicon } from '@/assets/icons'
import { transformToTransactionEntries } from '../../lib/utils'
import { TransactionItem } from '@/components/generic/transaction-items/Transactiontem'
import AccountFilterDropdown from '@/components/transaction/AccountfilterDropdown'
import AmountFilterFields from '@/components/transaction/AmountFilterFields'
import CategoryFilterDropdown from '@/components/transaction/CategoryFilterDropdown'
import { filtericon } from '@/assets/icons'

export default function TransactionsPage() {
  const { t } = useTranslation('accounts')
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [minAmount, setMinAmount] = useState('')
  const [maxAmount, setMaxAmount] = useState('')
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
  const [showAmountFilter, setShowAmountFilter] = useState(false)

  const { data, isLoading, isError } = useGetAllTransactions(
    page,
    pageSize,
    selectedAccount?.id,
    minAmount,
    maxAmount,
    selectedCategory ?? undefined,
  )

  useEffect(() => {
    setPage(0)
  }, [selectedAccount])

  const transactionsData = data?.content ?? []

  const aiTransformed = transformToTransactionEntries(
    transactionsFromIdsGivenByAi,
  )
  const allTransformed = transformToTransactionEntries(transactionsData)

  const { entries: AIEntries, isLoading: aiLoading } =
    useFetchEntries(aiTransformed)
  const { entries: allEntries, isLoading: allLoading } =
    useFetchEntries(allTransformed)

  if (isError) {
    return (
      <div className="p-8 text-red-500">{t('failedToLoadTransactions')}</div>
    )
  }

  if (isLoading || aiLoading || allLoading) return <Spinner />

  // Safe pagination fallbacks
  const currentPage = data?.number ?? 0
  const totalPages = data?.totalPages ?? 1
  const isFirstPage = data?.first ?? true
  const isLastPage = data?.last ?? true

  return (
    <div className="px-4 sm:px-8 py-6 space-y-12 max-w-5xl mx-auto">
      <h1 className="text-3xl mb-8 sm:mb-15">{t('transactions')}</h1>

      {/* AI Search Bar */}
      <div className="flex justify-start mb-6">
        <div
          className={`
            bg-white border border-black/70 rounded-4xl flex items-center px-3
            w-full
            sm:max-w-none
            transition-[width] duration-300 ease-in-out
            ${searchBarOpen ? 'w-full' : 'sm:w-56'}
          `}
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
                                type: 'INTERNAL_TRANSFER',
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
            onChange={(e) => setAiSearchBarInputContent(e.target.value)}
            className="w-full bg-transparent outline-none p-1"
            onClick={() => setSearchBarOpen(true)}
            placeholder={
              searchBarOpen ? t('whatDoYouWantToFindToday') : t('aiAssistant')
            }
            value={aiSearchBarInputContent}
          />
          <img src={searchicon} alt="Search" className="h-5 w-5" />
        </div>
      </div>

      {/* AI Search Results */}
      {sendQueryToAi.isPending || sendIdsAndGetTransactions.isPending ? (
        <div className="w-full flex items-center justify-center relative px-5 shadow-sm">
          <div className="loader opacity-35 absolute"></div>
        </div>
      ) : (
        transactionsFromIdsGivenByAi.length > 0 && (
          <div
            className={`${heightAiDiv} overflow-y-scroll transition-[max-height] duration-1500 ease-in-out`}
          >
            <h1 className="text-2xl mt-5 mb-3">{t('resultsFromYourSearch')}</h1>
            {sendQueryToAi.isError ||
            sendIdsAndGetTransactions.isError ||
            (transactionsFromIdsGivenByAi.length > 0 &&
              transactionsFromIdsGivenByAi[0].description === 'ERROR') ? (
              <div className="p-4 text-gray-500">
                {t('noTransactionsFound')}
              </div>
            ) : (
              AIEntries.map((tx) => (
                <TransactionItem key={tx.transactionId} transaction={tx} />
              ))
            )}

            <div className="flex justify-center">
              <button
                className="bg-[#FFB20F] mt-5 mb-5 hover:bg-[#F5A700] text-black shadow-sm px-5 py-2 rounded hover:cursor-pointer transition-colors w-[40vw] sm:w-[10vw]"
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
          </div>
        )
      )}

      {/* Filters */}
      <div className="flex gap-2 text-sm mb-10">
        <AccountFilterDropdown
          selectedAccount={selectedAccount}
          setSelectedAccount={setSelectedAccount}
        />
        <CategoryFilterDropdown
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="relative w-40">
          <button
            className={`
                  outline outline-black cursor-pointer rounded-4xl px-3  w-full  
                  text-left h-8 w-full
                `}
            onClick={() => setShowAmountFilter((v) => !v)}
          >
            <div className="flex justify-between items-center">
              {t('amountFilter')}
              <img
                src={filtericon}
                className="w-4 ml-4 h-4"
                alt="filter icon"
              />
            </div>
          </button>
          {showAmountFilter && (
            <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 mt-2 bg-white border shadow-sm rounded-xl shadow-lg p-4 min-w-[200px] max-w-xs w-full z-10">
              <AmountFilterFields
                onApply={(min, max) => {
                  setMinAmount(min)
                  setMaxAmount(max)
                  setPage(0)
                  setShowAmountFilter(false)
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="shadow-md p-4">
        <h1 className="text-2xl">{t('allTransactions')}</h1>
        {/* Transactions List */}
        {allEntries.length === 0 ? (
          <div className="p-4 text-gray-500">{t('noTransactionsFound')}</div>
        ) : (
          allEntries.map((tx) => (
            <TransactionItem key={tx.transactionId} transaction={tx} />
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-5 gap-3">
        <button
          className="w-20 py-2 rounded bg-[#FFB20F] hover:bg-[#F5A700] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isFirstPage}
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
        >
          {t('previous')}
        </button>
        <span className="text-sm text-black">
          {t('page')} {currentPage + 1} / {totalPages}
        </span>
        <button
          className="w-20 py-2 rounded bg-[#FFB20F] hover:bg-[#F5A700] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLastPage}
          onClick={() => setPage((p) => p + 1)}
        >
          {t('next')}
        </button>
      </div>
    </div>
  )
}
