"use client"

import { useParams, useRouter } from "next/navigation"
import useAxios from "@/app/_hooks/useAxios"
import axiosClient from "@/app/_services/axiosClient"
import { NFes } from "@/app/_interfaces/dataInterface"
import { Button } from "@/app/_components/ui/button"
import { ChevronLeft } from "lucide-react"
import { formatCurrency } from "@/app/_helpers/currencyConverter"

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
    <section className="h-screen w-screen">
      <div className="w-full border-b border-gray-300 px-5 py-4">
        <Button
          onClick={() => router.back()}
          className="text-2xl font-bold"
          variant={"ghost"}
        >
          <ChevronLeft size={24} />
        </Button>
      </div>
      <div className="px-5 py-6">
        <h1 className="text-xl font-bold">Nota Fiscal {invoice.numeroNFe}</h1>
        <h2 className="text-lg font-medium">
          Emitente: {invoice.emitente.nome}
        </h2>
        <p>Valor Total: {formatCurrency(invoice.valorTotal)}</p>
        <div>
          <ul>
            {invoice.produtos.map((produto) => (
              <li key={produto.codigo}>
                <p>{produto.descricao}</p>
                <p>{formatCurrency(produto.valorTotal)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default NfesPage
