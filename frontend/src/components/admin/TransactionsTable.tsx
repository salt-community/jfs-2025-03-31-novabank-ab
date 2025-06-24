'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Transaction, TransactionResponse } from '@/types'
import type { Dispatch, SetStateAction } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

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
  const columnHelper = createColumnHelper<Transaction>()

  const columns = [
    columnHelper.accessor('transactionId', {
      header: () => 'Transaction ID',
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      enableSorting: true,
    }),
    columnHelper.accessor('date', {
      header: () => 'Date',
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      footer: (info) => info.column.id,
      enableSorting: true,
    }),
    columnHelper.accessor('amount', {
      header: () => 'Amount',
      cell: (info) =>
        info
          .getValue()
          .toLocaleString('sv-SE', { style: 'currency', currency: 'SEK' }),
      footer: (info) => info.column.id,
      enableSorting: true,
    }),
    columnHelper.accessor('fromAccountId', {
      header: () => 'From Account',
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      enableSorting: true,
    }),
    columnHelper.accessor('toAccountId', {
      header: () => 'To Account',
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      enableSorting: true,
    }),
    columnHelper.accessor('type', {
      header: () => 'Type',
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      enableSorting: true,
    }),
    columnHelper.accessor('status', {
      header: () => 'Status',
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      enableSorting: true,
    }),
    columnHelper.accessor('description', {
      header: () => 'Description',
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      enableSorting: true,
    }),
  ]

  const table = useReactTable({
    data: data.content,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <Table>
        <TableHeader className="bg-amber-300 ">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => {
                  setModalData(row.original)
                  setModalOpen((prev) => !prev)
                }}
                className="cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          {table.getFooterGroups().map((footerGroup) => (
            <TableRow key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableFooter>
      </Table>
    </>
  )
}
