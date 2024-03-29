'use client'

import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios'
import { useState } from 'react'
import { ReloadIcon } from '@radix-ui/react-icons'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setIsSuccessMessage] = useState('')
  const [error, setError] = useState(false)

  async function Subscribe(){
   setIsLoading(true)
   const apiUrl = process.env.NEXT_PUBLIC_API_URL
   const response = await axios.post(`${apiUrl}/newsletter/subscribe`, { email })
   
   if(response.data.success){
    setIsLoading(false)
    setIsSuccessMessage(response.data.message)
    setError(false)
   } else {
    setIsLoading(false)
    setIsSuccessMessage(response.data.message)
    setError(true)
   }
  } 

  function GetEmail(e: React.ChangeEvent<HTMLInputElement>){
    setEmail(e.target.value)
  }

  return (
    <div className='flex flex-col gap-4 border border-gray-300 rounded-sm mt-10 bg-gray-200 text-center py-6 px-20'>
        <span className={error ? 'text-sm text-red-600' : 'text-sm text-green-600'}>{successMessage}</span>
        <span className='font-bold text-lg'>Join the Newsletter</span>
        <form onSubmit={(e)=>e.preventDefault()}>
          <div className='flex flex-col md:flex-row gap-1'>
              <Input onChange={GetEmail} placeholder='Email address' className='bg-white outline-none border border-neutral-300'/>
              {
                isLoading ?
                <Button disabled>
                    <ReloadIcon className="mr-2 animate-spin" /> Please wait
                </Button>
                :
                <Button onClick={Subscribe}>Subscribe</Button>
              }
              
          </div>
        </form>
        
        <span className='text-sm opacity-60'>Subscribe to get blog updates straight to your inbox!</span>
    </div>
  )
}
