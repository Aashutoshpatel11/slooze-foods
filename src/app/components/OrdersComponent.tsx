import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

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

  const handleEdit = async() => {
    try {
      setIsDisabled(false)
    } catch (error) {
      
    }
  }

  return (
    <div className='fixed top-0 left-0 h-screen w-screen z-10 bg-black/30 backdrop-blur-sm flex justify-end'>
  
      <div className='h-full bg-base-100 w-1/2 max-w-md p-8 flex flex-col justify-between'>
        
        <div>
          <h1 className="text-lg font-bold mb-6">Orders</h1>

          <div className="flex flex-col gap-4 mb-8">
            
          {orders && [...orders].reverse().map( (order:any) => (
            <div key={order._id} className="flex justify-between items-center border-b border-white/30 pb-2">
              <span className="font-medium">{order._id}</span>
              <div className='flex items-center gap-4' >
                <select className='text-sm font-light bg-base-100 text-white/50'
                disabled={isDisabled} 
                value={orderpayment || order.paymentMethod}
                onChange={ (e) => setOrderPayment(e.target.value) }
                >
                  <option value="COD">Cod</option>
                  <option value="DEBIT">Debit</option>
                  <option value="COD">Credit</option>
                  <option value="DEBIT">Upi</option>
                </select>
                <button
                onClick={ (e) => handleEdit() }
                className='btn btn-sm btn-soft' >Edit</button>
              </div>
            </div>
          ) ) }

          </div>

        </div>

        <div>

          <div className='flex justify-between' >
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