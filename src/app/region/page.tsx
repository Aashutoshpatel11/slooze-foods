'use client'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { add } from '@/store/permissionSlice'
import { useEffect } from 'react'
import { login } from '@/store/authSlice'
import axios from 'axios'

 function Regionpage() {

    const route = useRouter()
    const dispatch = useDispatch()

    const handleRegionSelection = async(e:any) => {
        console.log(e.target.value)
        dispatch(add({country: e.target.value}))
        route.push(`/region/${e.target.value}/sign-in`)
    }
    const getCurrentUser = async()=>{
        try {
            const response = await axios.get(`${process.env.SERVER_URL}/api/user/current-user`)
            if(response.data.success){
                dispatch(login({userData: response.data.data._doc}))
                console.log("USERSTOREDDATA::", response.data.data._doc);
                
                route.push(`/region/${response.data.data._doc.country}/dashboard`)
            }
            console.log(response.data.data._doc);
            
        } catch (error:any) {
            throw new Error(error)
        }
    }

    useEffect( () => {
        getCurrentUser()
    }, )


  return (
    <div className='h-screen w-screen flex justify-center items-center ' >
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                <h1 className="text-5xl font-bold text-primary ">Ordering is Simple!</h1>
                <p className="py-6">
                   From signature appetizers and seasonal specials to classic entrées and decadent desserts, every dish is made with the finest, freshest ingredients. Start browsing below!
                </p>
                <br />
                <br />
                <br />
                <div className='flex gap-4 justify-center items-center ' >
                    <button 
                    className='btn btn-lg btn-ghost'
                    value={"INDIA"}
                    onClick={ (e) => handleRegionSelection(e) }
                    >INDIA</button>
                    <div className='h-4 border-l-2 border-white/50' ></div>
                    <button 
                    value={"AMERICA"}
                    className='btn btn-lg btn-ghost'
                    onClick={ (e) => handleRegionSelection(e) }
                    >America</button>
                </div>
                <br />
                <div className="text-sm">Select your region</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Regionpage