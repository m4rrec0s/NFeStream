"use client"

import { useState } from "react"
import Header from "./_components/header"
import Search from "./_components/search"
import InvoiceItem from "./_components/invoiceItem"

import axiosClient from "./_services/axiosClient"
import { NFes } from "./_interfaces/dataInterface"
import useAxios from "./_hooks/useAxios"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }
  const {
    data: invoices,
    loading,
    error,
  } = useAxios({
    axiosClient,
    method: "get",
    url: "/nfes?_page=1&_limit=3",
  })

  if (loading) return <div>Carregando...</div>
  if (error) return <div>{error}</div>

  return (
    <main className="h-screen w-screen">
      <Header />
      <div className="grid grid-cols-3">
        <section className="col-span-2 px-5 py-6">
          <div className="mb-6 flex w-full justify-between">
            <h2 className="text-lg font-semibold">Suas NF-es</h2>
            <Search value={searchTerm} onChange={handleSearchChange} />
          </div>
          <div className="space-y-3">
            {Array.isArray(invoices) ? (
              invoices.map((invoice: NFes) => (
                <InvoiceItem key={invoice.id} invoice={invoice} />
              ))
            ) : (
              <div>Nenhuma NF-e encontrada</div>
            )}
          </div>
        </section>
        <section className="h-full bg-[#F9FAFC]"></section>
      </div>
    </main>
  )
}
