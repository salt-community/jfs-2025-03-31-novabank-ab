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
import { useState, type Dispatch, type SetStateAction } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
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
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  })

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
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,

    globalFilterFn: 'includesString',
    state: {
      pagination,
    },
  })

  return (
    <>
      <input
        value={table.getState().globalFilter ?? ''}
        onChange={(e) => table.setGlobalFilter(e.target.value)}
        placeholder="Global filter Search..."
      />
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

      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>
        Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
        {table.getRowCount().toLocaleString()} Rows
      </div>
    </>
  )
}
