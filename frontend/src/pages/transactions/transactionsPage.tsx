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

export default function TransactionsPage() {
  const { t } = useTranslation('accounts')
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [minAmount, setMinAmount] = useState('')
  const [maxAmount, setMaxAmount] = useState('')
  const [page, setPage] = useState(0)
  const pageSize = 10

  const [transactionsFromIdsGivenByAi, setTransactionsFromIdsGivenByAi] = useState<Array<Transaction>>([])

  const [heightAiDiv, setHeightAiDiv] = useState<string>('max-h-0')

  const sendQueryToAi = useAiSearchBar()
  const sendIdsAndGetTransactions = useGetTransactionsFromIdsGivenByAi()

  const [searchBarOpen, setSearchBarOpen] = useState<boolean>(false)
  const [aiSearchBarInputContent, setAiSearchBarInputContent] = useState<string>('')

  const { data, isLoading, isError } = useGetAllTransactions(
    page,
    pageSize,
    selectedAccount?.id,
    minAmount,
    maxAmount,
    selectedCategory ?? undefined,
  )

  // const { data: accounts = [], isLoading: accountsLoading } = useAccounts()

  // const myAccountIds = new Set(accounts?.map((a) => a.id))
  useEffect(() => {
    setPage(0)
  }, [selectedAccount])

  //if (isLoading || accountsLoading) return <Spinner />
  // Provide fallback array to always call hook safely
  const transactionsData = data?.content ?? []

  const aiTransformed = transformToTransactionEntries(transactionsFromIdsGivenByAi)
  const allTransformed = transformToTransactionEntries(transactionsData)

  const { entries: AIEntries, isLoading: aiLoading } = useFetchEntries(aiTransformed)
  const { entries: allEntries, isLoading: allLoading } = useFetchEntries(allTransformed)

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
    <div className="px-4 sm:px-8 py-6 space-y-12">
      <h1 className="text-3xl mb-20">{t('transactions')}</h1>
      <div className="flex h-8 justify-between">
        <div
          className={`${
            searchBarOpen ? 'w-[40%]' : 'w-36'
          } transition-[width] duration-300 ease-in-out bg-white border-1 border-black/70 rounded-4xl flex items-center px-2`}
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
          <img src={searchicon} alt="Search" className=" " />
        </div>
        <div>
          <AccountFilterDropdown
            selectedAccount={selectedAccount}
            setSelectedAccount={setSelectedAccount}
          />
          <CategoryFilterDropdown
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <AmountFilterFields
            onApply={(min, max) => {
              setMinAmount(min)
              setMaxAmount(max)
              setPage(0)
            }}
          />
          <button
            onClick={() => {
              setSelectedAccount(null)
              setSelectedCategory(null)
              setMinAmount('')
              setMaxAmount('')
              setPage(0)
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-1 rounded-4xl text-sm h-8"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      <div className="px-5 shadow-sm">
        {sendQueryToAi.isPending || sendIdsAndGetTransactions.isPending ? (
          <div className="w-full flex items-center justify-center relative">
            <div className="loader opacity-35 absolute"></div>
          </div>
        ) : (
          transactionsFromIdsGivenByAi.length > 0 && (
            <div
              className={`${heightAiDiv} overflow-y-scroll transition-[max-height] duration-1500 ease-in-out`}
            >
              <h1 className="text-2xl mt-5 mb-3">
                {t('resultsFromYourSearch')}
              </h1>
              {sendQueryToAi.isError ||
              sendIdsAndGetTransactions.isError ||
              (transactionsFromIdsGivenByAi.length > 0 &&
                transactionsFromIdsGivenByAi[0].description === 'ERROR') ? (
                <div className="p-4 text-gray-500">
                  {t('noTransactionsFound')}
                </div>
              ) : (
                AIEntries.map((tx) => {
                  return (
                    <TransactionItem key={tx.transactionId} transaction={tx} />
                  )
                })
              )}

              <div className="flex justify-center">
                <button
                  className="bg-[#FFB20F] mt-5 mb-5 hover:bg-[#F5A700] text-black shadow-sm px-5 py-2 rounded hover:cursor-pointer transition-colors w-[10vw]"
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
      </div>
      <div className="px-5 border-1 border-gray-100 shadow-sm p-1">
        <h1 className="text-2xl mt-5 mb-3">{t('allTransactions')}</h1>
        {allEntries.length === 0 ? (
          <div className="p-4 text-gray-500">{t('noTransactionsFound')}</div>
        ) : (
          allEntries.map((tx) => (
            <TransactionItem key={tx.transactionId} transaction={tx} />
          ))
        )}
      </div>

      <div className="flex justify-between items-center mt-5">
        <button
          className="w-20 disabled:cursor-not-allowed cursor-pointer py-2 rounded bg-[#FFB20F] hover:bg-[#F5A700] disabled:opacity-50"
          disabled={isFirstPage}
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
        >
          {t('previous')}
        </button>
        <span className="text-sm text-black">
          {t('page')} {currentPage + 1} / {totalPages}
        </span>
        <button
          className="w-20 disabled:cursor-not-allowed cursor-pointer py-2 rounded bg-[#FFB20F] hover:bg-[#F5A700] disabled:opacity-50"
          disabled={isLastPage}
          onClick={() => setPage((p) => p + 1)}
        >
          {t('next')}
        </button>
      </div>
    </div>
  )
}
