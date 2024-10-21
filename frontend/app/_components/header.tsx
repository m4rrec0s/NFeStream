"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../_lib/utils"

const Header = () => {
  const pathname = usePathname()
  const pages = [
    { name: "Home", href: "/" },
    { name: "Upload", href: "/upload" },
  ]

  return (
    <header className="flex w-full items-center justify-between border-b border-gray-300 px-5 py-4">
      <h1 className="text-2xl font-bold">NFeStream</h1>
      <nav className="flex items-center gap-6">
        {pages.map((page) => {
          const isActive = pathname === page.href
          return (
            <Link
              key={page.name}
              href={page.href}
              className={cn({
                "font-semibold": isActive,
                "": !isActive,
              })}
            >
              {page.name}
            </Link>
          )
        })}
      </nav>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  )
}

export default Header
