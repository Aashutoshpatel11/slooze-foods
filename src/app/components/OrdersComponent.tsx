import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import OrderCard from './OrderCard'
import toast from 'react-hot-toast'

function OrderComponent({setShowOrders}:any) {

  const user = useSelector((state:any)=> state.auth.userData)
  const [orderpayment, setOrderPayment] = useState("")
  const [orders, setOrders] = useState([])
  const [isDisabled, setIsDisabled] = useState(true)

  const getOrders = async () => {
    try {
      const res = await axios.post(`http://localhost:3000/api/order/get`, {country: user.country})
      if(res.data.success){
        setOrders(res.data.data)
      }
    } catch (error:any) {
      console.log("ERROR GETTING ORDERS::", error);
      throw new Error(error)
    }
  }

  useEffect( () => {
    getOrders()
  }, [] )

  const handleEdit = async(id:string, payment:string, setIsDisabled:any) => {
    try {
        const res = await axios.post(`http://localhost:3000/api/order/place/${id}`, {paymentMethod: payment})
        if(res.data.success){
          setIsDisabled(true)
          getOrders()
          toast.success("Order updated")
        }
    } catch (error:any) {
      throw new Error(error)
    }
  }

  const handleCancelOrder = async(id:string) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/order/cancel/${id}`)
      if(res.data.success){
        getOrders()
        toast.success("Order cancelled")
      }
    } catch (error:any) {
      console.log("Error deleting order::", error);
      throw new Error(error)
    }
  }

  return (
    <div key={1233}  className='fixed top-0 left-0 max-h-screen w-screen z-10 bg-black/30 backdrop-blur-sm flex justify-end'>
  
      <div className='h-screen bg-base-100 w-3/4 max-w-md p-8 flex flex-col justify-between relative'>
        
        <div className='' >
          <h1 className="text-lg font-bold mb-6">Orders</h1>

          <div className="flex flex-col gap-4 mb-8 overflow-y-scroll overflow-x-hidden max-h-[550px] w-full">
            
          {orders && [...orders].reverse().map( (order:any) => (
            <OrderCard 
            key={order._id}
            id={order._id}
            paymentMethod={order.paymentMethod}
            handleEdit={handleEdit}
            handleCancelOrder={handleCancelOrder}
            />
          ) ) }

          </div>

        </div>

        <div className='absolute bottom-0 right-0 w-full bg-base-100 h-20' >
          <div className=' flex items-center w-full h-full justify-start pl-8 ' >
            <button
            onClick={ () => setShowOrders(false)}
            className="btn btn-soft text-md">close</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default OrderComponent