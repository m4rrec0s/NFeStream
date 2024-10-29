import { NFes } from "../_interfaces/dataInterface"
import InvoiceItem from "./invoiceItem"

interface InvoiceListProps {
  invoices: NFes[] | null
  error: string
  loading: boolean
}

const InvoiceList = ({ invoices, error, loading }: InvoiceListProps) => {
  if (loading)
    return (
      <div className="h-full w-full">
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
        </div>
      </div>
    )
  if (error)
    return (
      <div className="h-full w-full">
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    )

  return (
    <div className="border-t border-gray-200">
      {Array.isArray(invoices) ? (
        invoices.map((invoice: NFes) => (
          <InvoiceItem key={invoice.id} invoice={invoice} />
        ))
      ) : (
        <div>Nenhuma NF-e encontrada</div>
      )}
    </div>
  )
}

export default InvoiceList
