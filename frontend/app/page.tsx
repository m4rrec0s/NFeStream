"use client"
import { useState, useEffect } from "react"
import axiosClient from "./_services/axiosClient"

interface Data {
  id: number
  name: string
  price: number
}

export default function Home() {
  const [data, setData] = useState<Data[]>([])

  useEffect(() => {
    axiosClient
      .get("products")
      .then((res) => {
        console.log(res.data)
        setData(res.data)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <main>
      <h1 className="text-3xl font-bold">NFeStream</h1>
      <div>
        {Array.isArray(data) ? (
          data.map((products) => <div key={products.id}>{products.name}</div>)
        ) : (
          <div>Nenhum produto encontrado</div>
        )}
      </div>
    </main>
  )
}
