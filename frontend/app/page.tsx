"use client"

import { useState } from "react"
import Header from "./_components/header"
import Search from "./_components/search"

import axiosClient from "./_services/axiosClient"
import { NFes } from "./_interfaces/dataInterface"
import useAxios from "./_hooks/useAxios"
import InvoiceList from "./_components/invoiceList"

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
        <section className="col-span-2 grow px-5 py-6">
          <div className="mb-6 flex w-full justify-between max-md:flex-col max-md:gap-3">
            <h2 className="text-lg font-semibold">Suas NF-es</h2>
            <Search value={searchTerm} onChange={handleSearchChange} />
          </div>
          <InvoiceList
            invoices={invoices}
            error={error ?? ""}
            loading={loading}
          />
        </section>
        <section className="h-full bg-[#F9FAFC]"></section>
      </div>
    </main>
  )
}
