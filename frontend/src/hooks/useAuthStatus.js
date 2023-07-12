import { useState,useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
export const useAuthStatus=()=>{
    const [loggedIn,setLoggedIn]=useState(false);
    const [checkingIn,setCheckingIn]=useState(true);
    const {user}=useSelector((state)=>state.auth)
    useEffect(()=>{
        if(user){
            setLoggedIn(true)
        }else{
            setLoggedIn(false)
        }
        setCheckingIn(false)
    },[user])
    return {loggedIn,checkingIn}
}