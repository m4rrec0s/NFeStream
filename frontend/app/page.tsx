"use client"

import { useState } from "react"
import Header from "./_components/header"
import Search from "./_components/search"

import axiosClient from "./_services/axiosClient"
import { NFes } from "./_interfaces/dataInterface"
import useAxios from "./_hooks/useAxios"
import InvoiceList from "./_components/invoiceList"
import { formatCurrency } from "./_helpers/currencyConverter"
import Link from "next/link"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const user = "Marcos Henrique"

  const {
    data: invoices,
    loading,
    error,
  } = useAxios<NFes[]>({
    axiosClient,
    method: "get",
    url: `/nfes`,
  })

  const montherinvoices = invoices?.filter(
    (invoice) =>
      new Date(invoice.dataEmissao).getMonth() === new Date().getMonth() &&
      new Date(invoice.dataEmissao).getFullYear() === new Date().getFullYear(),
  )

  return (
    <main className="flex h-screen w-screen flex-col">
      <Header />
      <div className="grid grid-cols-3 overflow-y-scroll max-md:grid-cols-1 md:grow">
        <section className="flex flex-col overflow-hidden px-5 py-6 md:col-span-2 md:grow">
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
        <section className="h-full flex-grow bg-[#F9FAFC] p-5 max-md:hidden">
          <div className="flex h-full flex-col justify-between rounded-lg bg-white px-5 py-6">
            <div className="">
              <div className="mb-6 rounded-lg bg-purple-600 p-6">
                <h2 className="text-xl font-semibold text-white">
                  Olá, {user}! 👋
                </h2>
                {montherinvoices?.length ? (
                  <p className="text-base text-gray-300">
                    Este mês, você emitiu um total de {montherinvoices?.length}{" "}
                    NF-es. Acompanhe abaixo o resumo das suas contas e fique de
                    olho nas pendências.
                  </p>
                ) : (
                  <p className="text-base text-gray-300">
                    Este mês, você ainda não fez upload de NF-es. Que tal
                    adicionar uma agora mesmo?
                  </p>
                )}
                <div className="mt-4 flex gap-4">
                  <Link
                    href="/allInvoices"
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Ver todas as NF-es
                  </Link>
                  <Link
                    href="/upload"
                    className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-700"
                  >
                    Adicionar nova NF-e
                  </Link>
                </div>
              </div>
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
                        (invoice) =>
                          invoice.status.toUpperCase() === "PENDENTE",
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
                </div>
              </div>
            </div>
            <div>
              <h2 className="mt-6 text-lg font-semibold">Dicas</h2>
              <div className="mt-6 flex flex-col gap-6">
                <div>
                  <p className="text-base text-gray-500">
                    Como organizar suas NF-es
                  </p>
                  <p className="text-sm font-light">
                    Organize suas NF-es por mês para facilitar a busca de
                    informações.
                  </p>
                </div>
                <div>
                  <p className="text-base text-gray-500">
                    Como organizar suas NF-es
                  </p>
                  <p className="text-sm font-light">
                    Organize suas NF-es por mês para facilitar a busca de
                    informações.
                  </p>
                </div>
                <div>
                  <p className="text-base text-gray-500">
                    Como organizar suas NF-es
                  </p>
                  <p className="text-sm font-light">
                    Organize suas NF-es por mês para facilitar a busca de
                    informações.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
