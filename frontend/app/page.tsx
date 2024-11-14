"use client"

import { useState, useEffect, useRef } from "react"
import Header from "./_components/header"
import Search from "./_components/search"
import { NFes } from "./_interfaces/dataInterface"
import { formatCurrency } from "./_helpers/currencyConverter"
import { CheckCircleIcon, EditIcon, SearchIcon } from "lucide-react"
import Banner from "./_components/banner"
import InvoiceItem from "./_components/invoiceItem"
import InvoiceList from "./_components/invoiceList"
import useAxios from "./_hooks/useAxios"
import axiosClient from "./_services/axiosClient"

const Home = () => {
  // search
  const [searchTerm, setSearchTerm] = useState<string>("")
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }
  const [loadingList, setLoadingList] = useState<boolean>(true)

  const { data, loading, error } = useAxios<NFes[]>({
    axiosClient,
    method: "get",
    url: `/nfes`,
  })

  const montherinvoices = data?.filter(
    (invoice) =>
      new Date(invoice.dataEmissao).getMonth() === new Date().getMonth() &&
      new Date(invoice.dataEmissao).getFullYear() === new Date().getFullYear(),
  )

  const user = "Marcos Henrique"

  return (
    <main className="flex h-screen w-screen flex-col [&::-webkit-scrollbar]:hidden">
      <Header />
      <div className="grid grid-cols-3 overflow-y-scroll max-md:grid-cols-1 md:grow">
        <section className="flex flex-col overflow-hidden px-5 py-6 md:col-span-2 md:grow">
          <div className="mb-6 flex w-full items-center justify-between max-md:flex-col max-md:gap-3">
            <h2 className="text-lg font-semibold">Suas NF-es</h2>
            <Search value={searchTerm} onChange={handleSearchChange} />
          </div>
          <InvoiceList isLoading={(value) => setLoadingList(value)} />
        </section>
        <section className="flex-grow overflow-hidden bg-[#F9FAFC] max-md:hidden">
          <div className="ml-5 flex h-full flex-col justify-between overflow-hidden overflow-y-auto rounded-lg bg-white px-6 py-6 shadow-lg [&::-webkit-scrollbar]:hidden">
            <div>
              <Banner
                user={user}
                montherinvoices={montherinvoices}
                isLoading={loading}
              />
              <h2 className="mt-3 text-lg font-semibold text-gray-700">
                Resumo
              </h2>
              <div className="mt-3 flex flex-col gap-3">
                {loading && (
                  <div
                    role="status"
                    className="flex h-full w-full items-center justify-center"
                  >
                    <svg
                      aria-hidden="true"
                      className="h-8 w-8 animate-spin fill-purple-600 text-gray-200 dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}

                {error && (
                  <div className="h-full w-full">
                    <div className="flex h-full w-full items-center justify-center">
                      <div className="text-red-500">
                        Ocorreu um erro: {error}
                      </div>
                    </div>
                  </div>
                )}

                {!loading && !error && (
                  <>
                    <div className="flex items-center justify-between rounded-lg bg-gray-100 p-2 shadow-sm">
                      <p className="text-sm text-gray-500">Total de NF-es</p>
                      <p className="text-base font-semibold text-gray-800">
                        {data?.length}
                      </p>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-gray-100 p-2 shadow-sm">
                      <p className="text-sm text-gray-500">
                        Total de NF-es autorizadas
                      </p>
                      <p className="text-base font-semibold text-gray-800">
                        {
                          data?.filter(
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
                          data?.filter(
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
                          data
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
                  </>
                )}
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

export default Home
