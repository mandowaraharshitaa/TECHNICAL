import React, { useEffect } from 'react'
import { Navigate, useNavigate  } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { setUser } from '../redux/userSlice'
import { hideLoading, showLoading } from '../redux/alertsSlice'

const ProtectedRoute = (props) => {
    const {user}=useSelector((state)=>state.user); 
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const getUser=async()=>{
        try{
            dispatch(showLoading())
            const response=await  axios.post('/api/users/get-user-info-by-id',
            {token:localStorage.getItem('token')}, {
          headers:
          
          {
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        
         } )
         dispatch(hideLoading())
         if(response.data.success)
         {
            dispatch(setUser(response.data.data))

         }
         else{
            navigate("/login")
         }

        }
        catch(error)
        {      dispatch(hideLoading())
              navigate("/login")
        }


    }


     useEffect(()=>{
        if(!user){
            getUser();
        }

    },[])
    if(localStorage.getItem('token')){
        return props.children;
    }
    else{
        return <Navigate to="/login"/>
    }
  
}

export default ProtectedRoute