'use client'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import toast from 'react-hot-toast'

function CartComponent({setShowCart}:any, ) {

  const user = useSelector((state:any) => state.auth.userData)
  const [placingOrder, setPlacingOrder] = useState(false)
  const [cartItems, setCartitems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  const getUserCartItems = async() => {
    setTotalPrice(0)
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/user/cart/${user._id}`)
      if(res.data.success){
        setCartitems(res.data.data.cart)
      }
      res.data.data.cart.map( (item:any) => {
        setTotalPrice( prev => prev=prev+item.price )
      } )
      if(res.data.data.cart.length == 0){
        setPlacingOrder(true)
      }
    } catch (error:any) {
      console.log("ERROR FETCHING CART ITEMS::", error);
      throw new Error(error)
    }
  }

  const placeOrder = async() => {
    try {
      setPlacingOrder(true)
      const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/order/create`, {country: user.country})
      
      if(res.data.success){
        cartItems.map(async(item:any)=>{
          const addItemResponse = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/order/add/${res.data.data._id}=${item._id}`)
        })
      }

      const placeOrderRes = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/order/place/${res.data.data._id}`, {country: user.country})

      if( placeOrderRes.data.success ){
        const emptyCartResponse = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/user/make-cart-empy/${user._id}`)
        if( emptyCartResponse.data.success ){
          console.log("CART IS EMPTY", emptyCartResponse);
          getUserCartItems()
          setTotalPrice(0)
          toast.success("Order placed")
        }
      }
      return placeOrderRes
    } catch (error:any) {
      toast.error("Order not placed")
      setPlacingOrder(true)
      console.log("ERROR PLACING ORDER::", error);
      throw new Error(error)
    }
  }

  useEffect( () => {
    getUserCartItems()
  }, [] )

  return (
    <div className='fixed top-0 left-0 h-screen w-screen z-10 bg-black/30 backdrop-blur-sm flex justify-end'>
  
      <div className='h-full bg-base-100 w-1/2 max-w-md p-8 flex flex-col justify-between'>
        
        <div>
          <h1 className="text-lg font-bold mb-6">Your Cart</h1>

          <div className="flex flex-col gap-4 mb-2 text-white/50 text-xs">
            <div className="flex justify-between items-center pb-2">
              <span className="font-medium">Name</span>
              <span>price</span>
            </div>
          </div>

          {
            cartItems && [...cartItems].reverse().map( (item:any) => (
              <div key={item?._id} className="flex flex-col gap-4 mb-8">
                <div className="flex justify-between items-center border-b border-white/30 pb-2">
                  <span className="font-medium">{item.name}</span>
                  <span>{item.price}</span>
                </div>
              </div>
            ) )
          }

        </div>

        <div>
          <div className="flex justify-between items-center text-md font-semibold mb-4">
            <span>Total Amount</span>
            <span>{totalPrice}</span>
          </div>

          <div className='flex justify-between' >
            <button
            onClick={ () => setShowCart(false)}
            className="btn btn-soft text-md">close</button>
            {
              user.role != "MEMBER" && <button
              onClick={ () => placeOrder() }
              disabled={placingOrder}
              className="btn btn-success text-md">Place Order</button>
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export default CartComponent