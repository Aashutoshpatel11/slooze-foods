'use client'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login, logout } from "@/store/authSlice"
import { useRouter } from "next/navigation"
import axios from "axios"

import getPrevPath from "@/utils/getPrevPath"
import CartComponent from "@/app/components/CartComponent"
import OrderComponent from "@/app/components/OrdersComponent"
import { Toaster } from "react-hot-toast"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const {prevPath} = getPrevPath()
  const dispatch = useDispatch()
  const [showCart, setShowCart] = useState(false)
  const [showOrders, setShowOrders] = useState(false)
  const user = useSelector((state:any)=> state.auth.userData)
  const status = useSelector((state:any)=> state.auth.status)
  const route = useRouter()

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

    const handleLogout = async() => {
      try {
        const res = await axios.get(`http://localhost:3000/api/user/log-out`)
        if(res.data.success){
          dispatch(logout())
          route.push('/region')
        }
      } catch (error:any) {
        console.log("LOGOUT ERROR", error);
        throw new Error(error)
      }
    }
   
  return (
    <div className='h-screen w-screen ' >
      <div className="sticky top-0" >
        <div className="navbartext-neutral-content bg-neutral px-8 py-2 flex items-center justify-between">
          <div className="btn btn-ghost text-xl">Slooze Foods
            <div className="badge badge-soft badge-primary">{user?.role}</div>
          </div>
          
          <div className="" >
            <button onClick={() => setShowCart(true) } className="tab">Cart</button>
            <button onClick={() => setShowOrders(true) } className="tab">Orders</button>
            {status && <button onClick={() => handleLogout() } className="tab btn btn-sm btn-error ">Log out</button> }
          </div>
        </div>
        
      </div>
      {showCart && <CartComponent setShowCart={setShowCart} />}
      {showOrders && <OrderComponent setShowOrders={setShowOrders} />}
      <section className="" >{children}</section>
      <Toaster />
    </div>
  )
}