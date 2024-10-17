"use client"
import axiosClient from "./_services/axiosClient"
import { Product } from "./_interfaces/dataInterface"
import useAxios from "./_hooks/useAxios"

export default function Home() {
  const { data, error, loading } = useAxios({
    axiosClient,
    method: "get",
    url: "/products",
  })

  if (loading) return <div>Carregando...</div>
  if (error) return <div>{error}</div>

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold">NFeStream</h1>
        <div>
          {Array.isArray(data) ? (
            (data as Product[]).map((products: Product) => (
              <div key={products.id} className="border border-gray-500 p-5">
                <h2 className="text-sm font-medium">{products.name}</h2>
                <p className="text-lg font-bold">R$ {products.price}</p>
              </div>
            ))
          ) : (
            <div>Nenhum produto encontrado</div>
          )}
        </div>
      </div>
    </main>
  )
}
