import React, { createContext, useContext, useState } from 'react'
import AlertMsg from '../components/common/AltertMsg'


const AlertContext=createContext()
export const AlertMsgContext = ({children}) => {
    const [msg,setMsg]=useState("")

    const alertMsg=(newMsg)=>{
        setMsg(newMsg)
    }

  return (
    <AlertContext.Provider value={{alertMsg}}>
        <AlertMsg msg={msg} setMsg={setMsg}/>
        {children}
    </AlertContext.Provider>

  )
}

export const useAlert=()=>useContext(AlertContext)
