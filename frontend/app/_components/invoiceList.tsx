import { useEffect, useRef, useState } from "react"
import { NFes } from "../_interfaces/dataInterface"
import InvoiceItem from "./invoiceItem"

interface InvoiceListProps {
  isLoading: (loading: boolean) => void
}

const InvoiceList = ({ isLoading }: InvoiceListProps) => {
  const [invoices, setInvoices] = useState<NFes[]>([])
  const [page, setPage] = useState<number>(1)
  const [invoicesQuantity, setInvoicesQuantity] = useState<number>(0)
  const [invoicesPage, setInvoicesPage] = useState<number>(10)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    getInvoices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const invoicesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      isLoading(loading && page === 1)
      if (
        invoicesRef.current &&
        invoicesRef.current.scrollTop + invoicesRef.current.clientHeight >=
          invoicesRef.current.scrollHeight &&
        page < totalPage &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1)
      }
    }

    const invoicesDiv = invoicesRef.current
    if (invoicesDiv) {
      invoicesDiv.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (invoicesDiv) {
        invoicesDiv.removeEventListener("scroll", handleScroll)
      }
    }
  }, [page, totalPage, loading, isLoading])

  const getInvoices = () => {
    setLoading(true)
    fetch(
      `http://localhost:3333/nfes?_page=${page}&_per_page=${invoicesPage}`,
      {
        method: "GET",
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setInvoicesQuantity(data.items)
          setTotalPage(data.pages)
          setInvoices([...invoices, ...data.data])
          setLoading(false)
        } else {
          setInvoices([])
        }
      })
      .catch((error) => {
        setError(error.message)
      })
  }

  if (loading)
    return (
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
    )
  if (error)
    return (
      <div className="h-full w-full">
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-red-500">Ocorreu um erro: {error}</div>
        </div>
      </div>
    )

  return (
    <div className="flex-grow overflow-y-auto" ref={invoicesRef}>
      <div className="border-t border-gray-200">
        {invoices?.length ? (
          invoices.map((invoice: NFes) => (
            <InvoiceItem key={invoice.id} invoice={invoice} />
          ))
        ) : (
          <div className="h-full w-full">
            <div className="flex h-full w-full items-center justify-center">
              <h2 className="">Nenhuma NFes encontrada</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InvoiceList
