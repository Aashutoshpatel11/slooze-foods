'use client'
import React, { use, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import getPrevPath from '@/utils/getPrevPath'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'


type Inputs = {
  fullname: string
  email: string
  password: string
  role: string
  country: string
}

function page({params,}: {params: Promise<{ region: string }>}) {

  const {region} = use(params)
  const router = useRouter()
  const {prevPath} = getPrevPath()

  const [signingUp, setSigningUp] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    setSigningUp(true)
    data.country = region
    data.role = data.role.toUpperCase()
    
    try {
      const response = await axios.post(`http://localhost:3000/api/user/sign-up`, data)
      if( response.data.success ){
        router.push(`${prevPath}sign-in`)
      }
      return response
    } catch (error:any) {
      toast.error( "Please fill up all details" )
      setSigningUp(false)
      throw new Error(error)
    }
  }
  
  return (
    <div className='h-screen w-screen flex justify-center items-center ' >
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Sign up</legend>
            <label className="label">Already have an account? <Link className='hover:text-accent' href={`${prevPath}sign-in`} >signin</Link></label>
            <br />

            <label className="label">Fullname</label>
            <input {...register("fullname")} type="text" className="input" placeholder="" />

            <label className="label">Email</label>
            <input {...register("email")} type="text" className="input" placeholder="" />

            <label className="label">Password</label>
            <input {...register("password")} type="text" className="input" placeholder="" />


            <label className="label">Role</label>
            <select defaultValue="Member" {...register("role")} className="select select-ghost">
                <option disabled={true}>Pick a role</option>
                <option>Admin</option>
                <option>Manager</option>
                <option>Member</option>
            </select>

            <br />

            <label className="label">{signingUp && "signing up..."}</label>
            <button 
            className='btn btn-accent'
            disabled= {signingUp}
            >Sign Up</button>

            </fieldset>
          </form>
          <Toaster />
    </div>
  )
}

export default page