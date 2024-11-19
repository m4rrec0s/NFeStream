"use client"

import { useParams, useRouter } from "next/navigation"
import useAxios from "@/app/_hooks/useAxios"
import axiosClient from "@/app/_services/axiosClient"
import { NFes } from "@/app/_interfaces/dataInterface"
import { Button } from "@/app/_components/ui/button"
import { ChevronLeft } from "lucide-react"
import { formatCurrency } from "@/app/_helpers/currencyConverter"
import { dateConverter } from "@/app/_helpers/dateConverter"

const NfesPage = () => {
  const { id } = useParams()
  const router = useRouter()

  const {
    data: invoices,
    loading,
    error,
  } = useAxios<NFes[]>({
    axiosClient,
    method: "get",
    url: `/nfes?id=${id}`,
  })

  if (loading) return <div>Carregando...</div>
  if (error)
    return (
      <div>{typeof error === "string" ? error : "Erro ao carregar dados"}</div>
    )
  const invoice = invoices ? invoices[0] : null

  if (!invoice) {
    return <div>Dados não encontrados</div>
  }

  return (
    <section className="flex h-screen w-screen flex-col bg-gray-50">
      <div className="w-full border-b border-gray-300 bg-white px-5 py-4 shadow-sm">
        <Button
          onClick={() => router.back()}
          className="text-2xl font-bold"
          variant="ghost"
        >
          <ChevronLeft size={24} />
        </Button>
      </div>

      <div className="flex flex-col items-center overflow-y-auto px-5 py-6 md:px-10">
        <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg">
          <header className="mb-4 border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Nota Fiscal #{invoice.numeroNFe}
            </h1>
            <p className="text-sm text-gray-500">
              Emitida por: {invoice.emitente.nome}
            </p>
          </header>

          <section className="mb-3">
            <h2 className="text-lg font-semibold text-gray-700">Detalhes</h2>
            <p className="text-sm text-gray-500">
              Emitente: {invoice.emitente.nome} - CNPJ: {invoice.emitente.cnpj}
            </p>
            <p className="text-sm text-gray-500">
              Destinatário: {invoice.destinatario.nome} - CNPJ:{" "}
              {invoice.destinatario.cnpj}
            </p>
            <p className="text-sm text-gray-500">
              Data de Emissão:{" "}
              <span className="font-semibold text-gray-700">
                {dateConverter(invoice.dataEmissao)}
              </span>
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700">Impostos</h2>
            <p className="text-sm text-gray-500">
              Cofins: {formatCurrency(invoice.impostos.cofins)}
            </p>
            <p className="text-sm text-gray-500">
              Pis: {formatCurrency(invoice.impostos.pis)}
            </p>
            <p className="text-sm text-gray-500">
              IPI: {formatCurrency(invoice.impostos.ipi)}
            </p>
            <p className="text-sm text-gray-500">
              ICMS: {formatCurrency(invoice.impostos.icms)}
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700">Produtos</h2>
            <ul className="mt-4 space-y-4">
              {invoice.produtos.map((produto) => (
                <li
                  key={produto.codigo}
                  className="flex justify-between rounded-lg bg-gray-100 p-4"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {produto.descricao}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantidade: {produto.quantidade}
                    </p>
                  </div>
                  <p className="font-medium text-gray-700">
                    {formatCurrency(produto.valorTotal)}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-700">Resumo</h2>
            <div className="mt-4 flex justify-between border-t pt-4">
              <p className="font-medium text-gray-700">Valor Total</p>
              <p className="font-bold text-gray-800">
                {formatCurrency(invoice.valorTotal)}
              </p>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

export default NfesPage
