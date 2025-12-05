'use client'
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "@/store/authSlice"
import { useRouter } from "next/navigation"
import axios from "axios"

import getPrevPath from "@/utils/getPrevPath"
import CartComponent from "@/app/components/CartComponent"
import OrderComponent from "@/app/components/OrdersComponent"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const {prevPath} = getPrevPath()
  const dispatch = useDispatch()
  const [showCart, setShowCart] = useState(false)
  const [showOrders, setShowOrders] = useState(false)

  const getCurrentUser = async()=>{
      try {
          const response = await axios.get("http://localhost:3000/api/user/current-user")
          if(response.data.success){
              dispatch(login({userData: response.data.data._doc}))
          }
          
      } catch (error:any) {
          throw new Error(error)
      }
  }

    useEffect( () => {
        getCurrentUser()
    }, [])
   
  return (
    <div className='h-screen w-screen ' >
      <div className="sticky top-0" >
        <div className="navbartext-neutral-content bg-neutral px-8 py-2 flex items-center justify-between">
          <div className="btn btn-ghost text-xl">Slooze Foods</div>
          <div className="" >
            <button onClick={() => setShowCart(true) } className="tab">Cart</button>
            <button onClick={() => setShowOrders(true) } className="tab">Orders</button>
          </div>
        </div>
        
      </div>
      {showCart && <CartComponent setShowCart={setShowCart} />}
      {showOrders && <OrderComponent setShowOrders={setShowOrders} />}
      <section className="" >{children}</section>
    </div>
  )
}