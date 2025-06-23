import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Transaction, TransactionResponse } from '@/types'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  data: TransactionResponse
  setModalData: Dispatch<SetStateAction<Transaction | undefined>>
  setModalOpen: Dispatch<SetStateAction<boolean>>
}

export function AdminTransactionsTable({
  data,
  setModalData,
  setModalOpen,
}: Props) {
  function handleOnClick(transaction: Transaction) {
    setModalData(transaction)
    setModalOpen((prev) => !prev)
  }

  return (
    <>
      <Table>
        <TableCaption>A list of all transactions.</TableCaption>
        <TableHeader className="bg-amber-300 ">
          <TableRow>
            <TableHead className="w-[100px] font-black">
              Transaction id
            </TableHead>
            <TableHead className="font-black">From</TableHead>
            <TableHead className="font-black">To</TableHead>
            <TableHead className="text-right font-black">Amount</TableHead>
            <TableHead className="font-black">Type</TableHead>
            <TableHead className="font-black">Category</TableHead>
            <TableHead className="font-black">Status</TableHead>
            <TableHead className="font-black">DateTime</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.content.map((d) => (
            <TableRow
              onClick={() => handleOnClick(d)}
              className="cursor-pointer"
              key={d.transactionId}
            >
              <TableCell className="font-medium">{d.transactionId}</TableCell>
              <TableCell className="w-4">{d.fromAccountId}</TableCell>
              <TableCell className="w-4">{d.toAccountId}</TableCell>
              <TableCell className="text-right">{d.amount}</TableCell>
              <TableCell>{d.type}</TableCell>
              <TableCell>{d.category}</TableCell>
              <TableCell>{d.status}</TableCell>
              <TableCell>{d.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  )
}
