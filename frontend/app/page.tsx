"use client"

import { useEffect, useState } from "react"
import Header from "./_components/header"
import Search from "./_components/search"

import axiosClient from "./_services/axiosClient"
import { NFes } from "./_interfaces/dataInterface"
import useAxios from "./_hooks/useAxios"
import InvoiceList from "./_components/invoiceList"
import { formatCurrency } from "./_helpers/currencyConverter"
import { CheckCircleIcon, EditIcon, SearchIcon } from "lucide-react"
import Banner from "./_components/banner"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }
  const [page, setPage] = useState<number>(1)

  const user = "Marcos Henrique"

  const {
    data: invoices,
    loading,
    error,
  } = useAxios<NFes[]>({
    axiosClient,
    method: "get",
    url: `/nfes?page=${page}&_limit=8`,
  })

  const { data: invoicesQuantity } = useAxios<NFes[]>({
    axiosClient,
    method: "get",
    url: `/nfes`,
  })

  const montherinvoices = invoicesQuantity?.filter(
    (invoice) =>
      new Date(invoice.dataEmissao).getMonth() === new Date().getMonth() &&
      new Date(invoice.dataEmissao).getFullYear() === new Date().getFullYear(),
  )

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        console.log("Sentinela visível")
        setPage((prev) => prev + 1)
      }
    })
    intersectionObserver.observe(document.getElementById("sentinel") as Element)
    return () => {
      intersectionObserver.disconnect()
    }
  }, [page])

  return (
    <main className="flex h-screen w-screen flex-col [&::-webkit-scrollbar]:hidden">
      <Header />
      <div className="grid grid-cols-3 overflow-y-scroll max-md:grid-cols-1 md:grow">
        <section className="flex flex-col overflow-hidden px-5 py-6 md:col-span-2 md:grow">
          <div className="mb-6 flex w-full items-center justify-between max-md:flex-col max-md:gap-3">
            <h2 className="text-lg font-semibold">Suas NF-es</h2>
            <Search value={searchTerm} onChange={handleSearchChange} />
          </div>
          <div className="flex-grow overflow-y-auto [&::-webkit-scrollbar]:hidden">
            <InvoiceList
              invoices={invoices}
              error={error ?? ""}
              loading={loading}
            />
            <div id="sentinel" />
          </div>
        </section>
        <section className="flex-grow overflow-hidden bg-[#F9FAFC] max-md:hidden">
          <div className="ml-5 flex h-full flex-col justify-between overflow-hidden overflow-y-auto rounded-lg bg-white px-6 py-6 shadow-lg [&::-webkit-scrollbar]:hidden">
            <div>
              <Banner user={user} montherinvoices={montherinvoices} />
              <h2 className="mt-3 text-lg font-semibold text-gray-700">
                Resumo
              </h2>
              <div className="mt-3 flex flex-col gap-3">
                <div className="flex items-center justify-between rounded-lg bg-gray-100 p-2 shadow-sm">
                  <p className="text-sm text-gray-500">Total de NF-es</p>
                  <p className="text-base font-semibold text-gray-800">
                    {invoicesQuantity?.length}
                  </p>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-100 p-2 shadow-sm">
                  <p className="text-sm text-gray-500">
                    Total de NF-es autorizadas
                  </p>
                  <p className="text-base font-semibold text-gray-800">
                    {
                      invoicesQuantity?.filter(
                        (invoice) =>
                          invoice.status.toUpperCase() === "AUTORIZADA",
                      ).length
                    }
                  </p>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-100 p-2 shadow-sm">
                  <p className="text-sm text-gray-500">
                    Total de NF-es pendentes
                  </p>
                  <p className="text-base font-semibold text-gray-800">
                    {
                      invoicesQuantity?.filter(
                        (invoice) =>
                          invoice.status.toUpperCase() === "PENDENTE",
                      ).length
                    }
                  </p>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-100 p-2 shadow-sm">
                  <p className="text-sm text-gray-500">
                    Conta mais cara do mês de{" "}
                    {new Date().toLocaleString("pt-BR", { month: "long" })}
                  </p>
                  <p className="text-base font-semibold text-gray-800">
                    {formatCurrency(
                      invoicesQuantity
                        ?.filter(
                          (invoice) =>
                            new Date(invoice.dataEmissao).getMonth() ===
                              new Date().getMonth() &&
                            new Date(invoice.dataEmissao).getFullYear() ===
                              new Date().getFullYear(),
                        )
                        .reduce((acc, invoice) => {
                          if (invoice.valorTotal > acc) {
                            return invoice.valorTotal
                          }
                          return acc
                        }, 0) ?? 0,
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-3 rounded-lg bg-gray-200 p-2 shadow-lg">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Dicas
              </h2>
              <div className="flex flex-col gap-3">
                <div className="relative rounded-lg bg-gray-100 p-4 shadow-sm">
                  <h3 className="text-base font-semibold text-gray-900">
                    Utilize filtros de busca
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Use a barra de pesquisa para encontrar rapidamente as NF-es
                    que você precisa.
                  </p>
                  <div className="absolute -right-2 -top-2 rounded-full bg-purple-600 p-2">
                    <SearchIcon className="h-5 w-5 text-gray-100" />
                  </div>
                </div>
                <div className="relative rounded-lg bg-gray-100 p-4 shadow-sm">
                  <h3 className="text-base font-semibold text-gray-900">
                    Verifique o status das NF-es
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Acompanhe o status das suas NF-es para garantir que todas
                    estão autorizadas e sem pendências.
                  </p>
                  <div className="absolute -right-2 -top-2 rounded-full bg-indigo-600 p-2">
                    <CheckCircleIcon className="h-5 w-5 text-gray-100" />
                  </div>
                </div>
                <div className="relative rounded-lg bg-gray-100 p-4 shadow-sm">
                  <h3 className="text-base font-semibold text-gray-900">
                    Mantenha seus dados atualizados
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Certifique-se de que todas as informações das suas NF-es
                    estão corretas e atualizadas.
                  </p>
                  <div className="absolute -right-2 -top-2 rounded-full bg-blue-600 p-2">
                    <EditIcon className="h-5 w-5 text-gray-100" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
