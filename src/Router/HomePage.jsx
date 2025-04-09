import React, { useRef } from 'react';
import Navbar from '../Component/Navbar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Body from '../Component/Body';
import Inbox from '../Component/Inbox';
import Mail from '../Component/Mail';
import {SendMail} from '../Component/SendMail';
import Starred from '../Component/Starred';
import Snoozed from '../Component/Snoozed';
import Sent from '../Component/Sent';
import Drafts from '../Component/Drafts';


const router = createBrowserRouter([
    {
      path:"/",
      element:<Body/>,
      children:[
        {
          path:'/',
          element:<Inbox/>
        },
        {
          path:'/mail/:id',
          element:<Mail/>
        },
        {
          path:'/starred',
          element:<Starred/>
        },
        {
          path:'/Snoozed',
          element:<Snoozed/>
        },
        {
          path:'/Sent',
          element:<Sent/>
        },
        {
          path:'/Drafts',
          element:<Drafts/>
        }
        

      ]
    }
  ])

function HomePage() {
  return (
    <div className='bg-[#F6F8Fc] h-screen w-screen overflow-hidden'>
        
        <Navbar/>
        <RouterProvider router={router}/>
          
        <div className='absolute w-[35%] bottom-0 right-20 z-10'>
       
            <SendMail/>
        </div>
           
    </div>
  )
  
}

export default HomePage;