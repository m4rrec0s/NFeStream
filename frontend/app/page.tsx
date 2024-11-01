"use client"

import { useState } from "react"
import Header from "./_components/header"
import Search from "./_components/search"

import axiosClient from "./_services/axiosClient"
import { NFes } from "./_interfaces/dataInterface"
import useAxios from "./_hooks/useAxios"
import InvoiceList from "./_components/invoiceList"
import { formatCurrency } from "./_helpers/currencyConverter"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const {
    data: invoices,
    loading,
    error,
  } = useAxios<NFes[]>({
    axiosClient,
    method: "get",
    url: `/nfes`,
  })

  return (
    <main className="flex h-screen w-screen flex-col">
      <Header />
      <div className="grid grow grid-cols-3 overflow-y-scroll max-md:grid-cols-1">
        <section className="col-span-2 flex grow flex-col overflow-hidden px-5 py-6">
          <div className="mb-6 flex w-full items-center justify-between max-md:flex-col max-md:gap-3">
            <h2 className="text-lg font-semibold">Suas NF-es</h2>
            <Search value={searchTerm} onChange={handleSearchChange} />
          </div>
          <div className="flex-grow overflow-y-auto">
            <InvoiceList
              invoices={invoices}
              error={error ?? ""}
              loading={loading}
            />
          </div>
        </section>
        <section className="h-full bg-[#F9FAFC] p-5">
          <div className="h-full flex-grow rounded-lg bg-white px-5 py-6">
            <h2 className="text-lg font-semibold">Resumo</h2>
            <div className="mt-6 flex flex-col gap-6">
              <div className="">
                <p className="text-base text-gray-500">Total de NF-es</p>
                <p className="text-xl font-semibold">{invoices?.length}</p>
              </div>
              <div className="">
                <p className="text-base text-gray-500">
                  Total de NF-es autorizadas
                </p>
                <p className="text-xl font-semibold">
                  {
                    invoices?.filter(
                      (invoice) =>
                        invoice.status.toUpperCase() === "AUTORIZADA",
                    ).length
                  }
                </p>
              </div>
              <div className="">
                <p className="text-base text-gray-500">
                  Total de NF-es pendentes
                </p>
                <p className="text-xl font-semibold">
                  {
                    invoices?.filter(
                      (invoice) => invoice.status.toUpperCase() === "PENDENTE",
                    ).length
                  }
                </p>
              </div>
              <div className="">
                <p className="text-base">
                  Conta mais cara do mês de{" "}
                  {new Date().toLocaleString("pt-BR", { month: "long" })}
                </p>
                <p className="text-xl font-semibold">
                  {formatCurrency(
                    invoices
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
                <div></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
