"use client"

import { useParams, useRouter } from "next/navigation"
import useAxios from "@/app/_hooks/useAxios"
import axiosClient from "@/app/_services/axiosClient"
import { NFes } from "@/app/_interfaces/dataInterface"
import { Button } from "@/app/_components/ui/button"
import { ChevronLeft } from "lucide-react"

const NfesPage = () => {
  const { id } = useParams()
  const router = useRouter()

  const {
    data: invoice,
    loading,
    error,
  } = useAxios<NFes>({
    axiosClient,
    method: "get",
    url: `/nfes/${id}`,
  })

  if (loading) return <div>Carregando...</div>
  if (error) return <div>{error}</div>

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
        <h1 className="text-xl font-bold">Nota Fiscal {invoice?.numeroNFe}</h1>
        <h2 className="text-lg font-medium">
          Emitente: {invoice?.emitente?.nome}
        </h2>
        <p>Valor Total: {invoice?.valorTotal}</p>
      </div>
    </section>
  )
}

export default NfesPage
