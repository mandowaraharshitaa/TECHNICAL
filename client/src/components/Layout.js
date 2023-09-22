import React, { useState } from 'react'
import '../layout.css'
import {Link, useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';
const Layout = ({children}) => {
    const [collapsed,setcollapsed]=useState(false);
    const {user}=useSelector((state)=>state.user);
    const location = useLocation();
    const userMenu=[
        {
            name:'Home',
            path:'/',
            icon:'ri-home-line'
        },
        {
          name:'Appointments',
          path:'/appointments',
          icon:'ri-list-check'  
        },
        {
            name:'Apply Doctor',
            path:'/apply-doctor',
            icon:'ri-add-box-line'
        },
        {
            name:"Profile",
            path:'/profile',
            icon:'ri-user-line'
        },
        {
            name:'Logout',
            path:'/logout',
            icon:'ri-logout-box-r-line'
        }

    ];
    const menuToBeRendered=userMenu
  return (
    <div className='main p-2'>
       
       <div className='d-flex layout'>
         <div className={`${collapsed?'collapsed-sidebar':'sidebar'}`}>
            <div className='sidebar-header'>
                <h1>DR</h1>
            </div>
            <div className='menu'>
                {
                    menuToBeRendered.map((menu)=>{
                        const isActive=location.pathname===menu.path
                        return <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                                  <i className={menu.icon}></i>
                                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                                </div>
                    }
                    )
                }

            </div>
         </div>

         <div className='content'>
            <div className='header'>
                {collapsed? (
                     <i className='ri-close-circle-fill header-action-icon' onClick={()=>setcollapsed(false)}></i>
                ):
                <i className='ri-close-circle-fill header-action-icon' onClick={()=>setcollapsed(true)}></i>}
              <div className='d-flex align-items-center'>
                <i className='ri-notification-line header-action-icon'></i>
                <Link className='anchor' to="/profile">{user?.name}</Link>
                </div>  
            </div>
            <div className='body'>
                {children}
            </div>
         </div>

         

       </div>
    </div>
  )
}

export default Layout
