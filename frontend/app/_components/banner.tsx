import Link from "next/link"
import { NFes } from "../_interfaces/dataInterface"
import { Plus, User2Icon } from "lucide-react"

interface BannerProps {
  user: string
  montherinvoices: NFes[] | undefined
}

const Banner = ({ montherinvoices, user }: BannerProps) => {
  return (
    <div className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 p-6 shadow-md">
      <h2 className="text-2xl font-bold text-white">Olá, {user}! 👋</h2>
      {montherinvoices?.length ? (
        <p className="mt-2 text-base text-gray-200">
          Este mês, você emitiu um total de {montherinvoices?.length} NF-es.
          Acompanhe abaixo o resumo das suas contas e fique de olho nas
          pendências.
        </p>
      ) : (
        <p className="mt-2 text-base text-gray-200">
          Este mês, você ainda não fez upload de NF-es. Que tal adicionar uma
          agora mesmo?
        </p>
      )}
      <div className="mt-4 flex gap-4 max-lg:flex-col">
        <Link
          href="/profile"
          className="flex items-center gap-2 rounded bg-black px-4 py-2 text-white shadow-md transition duration-300 hover:bg-gray-800"
        >
          <span>Ver perfil</span>
          <User2Icon size={16} />
        </Link>
        <Link
          href="/upload"
          className="flex items-center gap-2 rounded bg-white px-4 py-2 text-black shadow-md transition duration-300 hover:bg-gray-200"
        >
          <span>Adicionar nova NF-e</span>
          <Plus size={16} />
        </Link>
      </div>
    </div>
  )
}

export default Banner
