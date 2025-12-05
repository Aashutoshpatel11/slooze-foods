'use client'
import FoodItemsList from '@/app/components/FoodItemsList'
import getPrevPath from '@/utils/getPrevPath'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'

function page() {
  const status = useSelector((state:any) => state.auth.status)

  
  return (
    <>
      {
        status? (
          <div className='xs:px-0 sm:px-15 md:px-20 lg:px-25 xl:px-30 pt-10 z-20' >
            <FoodItemsList />
          </div>

        ) : (
          <div className="hero bg-neutral min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Login now!</h1>
                <p className="py-6">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                  quasi. In deleniti eaque aut repudiandae et a id nisi.
                </p>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default page