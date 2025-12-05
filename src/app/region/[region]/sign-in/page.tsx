'use client'
import React, { use, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import getPrevPath from '@/utils/getPrevPath'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { login } from '@/store/authSlice'

type Inputs = {
  email: string
  password: string
}

function page() {

    const router = useRouter()
    const {prevPath} = getPrevPath()

    const dispatch = useDispatch()

    const [signingIn, setSigningIn] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        setSigningIn(true)
        
        try {
            const response = await axios.post(`http://localhost:3000/api/user/sign-in`, data)
                if( response.data.success ){
                    dispatch(login({userData: response.data.data}))
                    router.push(`${prevPath}dashboard`)
                }
            return response
        } catch (error:any) {
            setSigningIn(false)
            throw new Error(error)
        }
    }

  return (
    <div className='h-screen w-screen flex justify-center items-center ' >
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Sign up</legend>
            <label className="label">Create new account? <Link className='hover:text-accent' href={`${prevPath}sign-up`} >signin</Link></label>
            <br />

            <label className="label">Email</label>
            <input {...register("email")} type="text" className="input" placeholder="" />

            <label className="label">Password</label>
            <input {...register("password")} type="text" className="input" placeholder="" />

            <br />
            <label className="label">{ signingIn && "signing in....."}</label>
            <button 
            className='btn btn-accent'
            disabled= {signingIn}
            >Log in</button>

            </fieldset>
          </form>
    </div>
  )
}

export default page