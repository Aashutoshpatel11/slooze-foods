'use client'
import React from 'react'
import { usePathname } from 'next/navigation'

function getPrevPath() {

    const pathname = usePathname()

    let path = pathname.split('/')
    path[path.length-1] = ''
    const prevPath = path.join('/')
    
  return {
    prevPath
  }
}

export default getPrevPath