import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function OrderCard({id, paymentMethod, handleEdit, handleCancelOrder }:any) {
    const user = useSelector((state:any) => state.auth.userData )
    const [payment, setPayment] = useState("")
    const [isDisabled, setIsDisabled] = useState(true)
    useEffect( () => {
        setPayment(paymentMethod)
    }, [] )

  return (
    <div className="flex justify-between items-center border-b border-white/30 pb-2">
        <span className="text-sm ">{id.substring(20,24)}</span>
        <div className='flex items-center gap-4' >
        <select className='text-sm font-light bg-base-100 text-white/50'
        disabled={isDisabled} 
        value={payment}
        onChange={ (e) => setPayment(e.target.value) }
        >
            <option value="COD">Cod</option>
            <option value="DEBIT">Debit</option>
            <option value="CREDIT">Credit</option>
            <option value="UPI">Upi</option>
        </select>
        {
            user.role=="ADMIN" && (isDisabled ? 
            <button
            onClick={ (e) => setIsDisabled(false) }
            className='btn btn-sm btn-soft' >Edit</button>
                :
            <button
            onClick={ (e) => handleEdit(id, payment, setIsDisabled) }
            className='btn btn-sm btn-info' >Update</button>)
        }

        {
            user.role != "MEMBER" && <button
            onClick={ (e) => handleCancelOrder(id) }
            className='btn btn-sm btn-error' >Cancel Order</button>
        }

        </div>
    </div>
  )
}

export default OrderCard