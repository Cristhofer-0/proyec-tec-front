// components/NavLink.tsx

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import clsx from "clsx"

interface NavLinkProps {
  href: string
  children: ReactNode
}

export const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={clsx(
        "font-medium transition-colors hover:text-primary",
        isActive && "text-primary underline"
      )}
    >
      {children}
    </Link>
  )
}
