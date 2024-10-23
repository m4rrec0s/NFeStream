import { ChevronRight, StoreIcon } from "lucide-react"
import { NFes } from "../_interfaces/dataInterface"
import Link from "next/link"

interface InvoiceItemProps {
  invoice: NFes
}

const InvoiceItem = ({ invoice }: InvoiceItemProps) => {
  return (
    <div
      key={invoice.id}
      className="flex items-center justify-between rounded-lg py-1"
    >
      <div className="flex items-center gap-3">
        {invoice.valorTotal > 10000 ? (
          <div className="rounded-full bg-red-500 p-4">
            <StoreIcon size={20} color="white" />
          </div>
        ) : invoice.valorTotal > 6000 ? (
          <div className="rounded-full bg-yellow-500 p-4">
            <StoreIcon size={20} color="white" />
          </div>
        ) : invoice.valorTotal > 4000 ? (
          <div className="rounded-full bg-green-500 p-4">
            <StoreIcon size={20} color="white" />
          </div>
        ) : (
          <div className="rounded-full bg-blue-500 p-4">
            <StoreIcon size={20} color="white" />
          </div>
        )}
        <div className="flex flex-col">
          <h3 className="text-base font-semibold">{invoice.emitente.nome}</h3>
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
      <div className="flex items-center gap-5">
        <h3 className="text-lg font-semibold">R$ {invoice.valorTotal}</h3>
        <Link href={`/nfes/${invoice.id}`} title="Ver NF">
          <ChevronRight size={24} />
        </Link>
      </div>
    </div>
  )
}

export default InvoiceItem
