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
import type { TransactionResponse } from '@/types'

type Props = {
  data: TransactionResponse
}
export function AdminTransactionsTable({ data }: Props) {
  return (
    <Table>
      <TableCaption>A list of all transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Transaction id</TableHead>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>DateTime</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.content.map((d) => (
          <TableRow className="cursor-pointer" key={d.transactionId}>
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
  )
}
