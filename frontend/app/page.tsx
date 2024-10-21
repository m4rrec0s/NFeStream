"use client"

import { useState } from "react"
import Header from "./_components/header"
import Search from "./_components/search"

// import axiosClient from "./_services/axiosClient"
// import { Content } from "./_interfaces/dataInterface"
// import useAxios from "./_hooks/useAxios"
// import InvoiceItem from "./_components/invoiceItem"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }
  // const {
  //   data: invoices,
  //   loading,
  //   error,
  // } = useAxios({
  //   axiosClient,
  //   method: "get",
  //   url: "/content",
  // })

  // if (loading) return <div>Carregando...</div>
  // if (error) return <div>{error}</div>

  return (
    <main className="h-screen w-screen">
      <Header />
      <div className="grid grid-cols-3">
        <section className="col-span-2 px-5 py-6">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold">Suas NF-es</h2>
            <Search value={searchTerm} onChange={handleSearchChange} />
          </div>
        </section>
        <section className="h-full bg-[#F9FAFC]"></section>
      </div>
    </main>
  )
}
