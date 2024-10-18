"use client"
import axiosClient from "./_services/axiosClient"
import { Product, User } from "./_interfaces/dataInterface"
import useAxios from "./_hooks/useAxios"

export default function Home() {
  const {
    data: products,
    loading,
    error,
  } = useAxios({
    axiosClient,
    method: "get",
    url: "/products",
  })

  const {
    data: users,
    loading: userLoading,
    error: userError,
  } = useAxios({
    axiosClient,
    method: "get",
    url: "/users",
  })

  if (loading) return <div>Carregando...</div>
  if (userLoading) return <div>Carregando...</div>

  if (error) return <div>{error}</div>
  if (userError) return <div>{userError}</div>

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold">NFeStream</h1>
        <div>
          {Array.isArray(products) ? (
            (products as Product[]).map((product: Product) => (
              <div key={product.id} className="border border-gray-500 p-5">
                <h2 className="text-sm font-medium">{product.name}</h2>
                <p className="text-lg font-bold">R$ {product.price}</p>
              </div>
            ))
          ) : (
            <div>Nenhum produto encontrado</div>
          )}
        </div>
        <div>
          {Array.isArray(users) ? (
            (users as User[]).map((user: User) => (
              <div key={user.id} className="border border-gray-500 p-5">
                <h2 className="text-sm font-medium">{user.name}</h2>
                <p className="text-lg font-bold">{user.email}</p>
              </div>
            ))
          ) : (
            <div>Nenhum usuário encontrado</div>
          )}
        </div>
      </div>
    </main>
  )
}
