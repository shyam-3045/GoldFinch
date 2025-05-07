import React, { useEffect } from 'react'
import axios from 'axios'
import ScrollIndicator from '../components/layout/ScrollIndicator'

const PageNotFound = () => {
  useEffect(()=>
  {
    const fetchUser=async()=>
    {
      await axios.get()
    }
  })
  return (
    <>
    <h1 className='text-black'>
        404
    </h1>

    
    </>
    
  )
}

export default PageNotFound
