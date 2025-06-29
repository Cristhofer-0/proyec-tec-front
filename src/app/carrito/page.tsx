import { Suspense } from "react"
import CartClient from "./CartClient"


export default function CartPage() {
   return (
    <Suspense>
      <CartClient />
    </Suspense>
  )
}