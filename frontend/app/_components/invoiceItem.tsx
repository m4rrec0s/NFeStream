import { NFes } from "../_interfaces/dataInterface"
import Link from "next/link"
import { Badge } from "./ui/badge"
import { formatCurrency } from "../_helpers/currencyConverter"
import { dateConverter } from "../_helpers/dateConverter"

interface InvoiceItemProps {
  invoice: NFes
}

const InvoiceItem = ({ invoice }: InvoiceItemProps) => {
  return (
    <Link
      href={`/nfes/${invoice.id}`}
      className="flex cursor-pointer items-center justify-between rounded-lg border-b border-gray-200 px-2 py-6 hover:bg-gray-100"
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <h3 className="text-base font-semibold">{invoice.emitente.nome}</h3>
          <div>
            <div className="flex gap-2 text-gray-500">
              {invoice.produtos.length > 1 ? (
                <p className="text-sm font-light">
                  {invoice.produtos.length} Produtos
                </p>
              ) : (
                <p className="text-sm font-light">
                  {invoice.produtos.length} Produto
                </p>
              )}
              {" • "}
              <p className="text-sm font-light">
                {formatCurrency(invoice.valorTotal)}
              </p>
            </div>
            <p className="text-sm font-medium text-gray-500">
              {invoice.destinatario.nome}
            </p>
          </div>
        </div>
        {invoice.status === "Autorizada" ? (
          <Badge className="w-fit bg-[#B7FFB7] text-[#1F751F] hover:bg-[#1F751F] hover:text-[#B7FFB7]">
            Autorizada
          </Badge>
        ) : (
          <Badge className="w-fit bg-red-200 text-red-700 hover:bg-red-700 hover:text-red-200">
            Pendente
          </Badge>
        )}
      </div>
      <p className="text-gray-500">{dateConverter(invoice.dataEmissao)}</p>
    </Link>
  )
}

export default InvoiceItem
