import { StoreIcon } from "lucide-react"
import { NFes } from "../_interfaces/dataInterface"

interface InvoiceItemProps {
  invoice: NFes
}

const InvoiceItem = ({ invoice }: InvoiceItemProps) => {
  return (
    <div key={invoice.id} className="flex items-center gap-3">
      <div className="rounded-full bg-blue-500 p-4">
        <StoreIcon size={20} color="white" />
      </div>
      <div className="flex flex-col">
        <h3 className="text-base font-medium">{invoice.emitente.nome}</h3>
        {invoice.produtos.length > 1 ? (
          <p className="text-sm font-light">
            {invoice.produtos.length} Produtos
          </p>
        ) : (
          <p className="text-sm font-light">
            {invoice.produtos.length} Produto
          </p>
        )}
      </div>
    </div>
  )
}

export default InvoiceItem
