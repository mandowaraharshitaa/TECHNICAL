import React from 'react';
import {Button, Form,Input} from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';


const Register=() =>{
  const dispatch=useDispatch()
 const navigate=useNavigate();
 const Submit=async(values)=>{
     try{
      dispatch(showLoading())

      const response=await axios.post('/api/users/register',values);
      dispatch(hideLoading())
      if(response.data.success)
      {
            toast.success(response.data.message);
            navigate("/login")
      }
  
      else{
           toast.error(response.data.message);
      }
      

     }
     catch(error)
     {   dispatch(hideLoading());
         console.log(error);
         toast.error("something went wrong");
     }
  }
  return (
    <div className='authentication'>
      <div className='authentication-form card p-3'>
        <h1 className='card-title'>Register</h1>
        <Form layout='vertical' onFinish={Submit}>
               <Form.Item label='Name' name='name'>
                   <Input placeholder='Name'/>
               </Form.Item>
               <Form.Item label='Email' name='email'>
                   <Input placeholder='Email'/>
               </Form.Item>
               <Form.Item label='Password' name='password' >
                   <Input placeholder='Password' type='password'/>
               </Form.Item>
            <Button className='primary-button my-2' htmlType='submit'>REGISTER</Button>
            <Link to='/login' className='anchor '>click here to login</Link>
        </Form>
        
      </div>
    </div>
  )
}

export default Register
