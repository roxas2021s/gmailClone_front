import React, { useState } from 'react'
import { FaCaretDown, FaUserFriends } from 'react-icons/fa';
import {  GoTag } from 'react-icons/go';
import { IoMdMore } from 'react-icons/io';
import { IoRefresh } from 'react-icons/io5';
import { MdInbox, MdOutlineCropSquare,MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import Messages from './Messages';
import { AnimatePresence } from 'framer-motion';

const mailType = [
    {
        icon:<MdInbox size={"20px"}/>,
        text:"Primary"
    },
    {
        icon:<GoTag size={"20px"}/>,
        text:"Promotions"
    },
    {
        icon:<FaUserFriends size={"20px"}/>,
        text:"Social"
    }
]

function Inbox() {

    const [mailTypeSelected,setMailTypeSelected] = useState(0);

    const [toggle,setToggle] = useState(false);
    let handleRefresh=()=>{
        addEventListener('click',()=>{
            window.location.reload()
        })
    }

  return (
    <div className='flex-1 bg-white rounded-xl mx-5 overflow-auto'>
        <div className='flex items-center justify-between px-4'>
           <div className='flex items-center gap-2 text-gray-700 py-2'>
                <div className=' flex items-center g-2 p-2 text-md hover:bg-gray-200 rounded-md cursor-pointer  '>
                    <input type="checkbox" size="25px" className=" cursor-pointer " />
                    <FaCaretDown title='select' onClick={()=>setToggle(!toggle)} size="20px"  className=" hover:bg-gray-100" />
                    <AnimatePresence>
                        { toggle &&  (
                            <dropdown className="absolute flex flex-col items-start left-50 z-60 top-23 m-2 p-3 text-sm w-[140px] h-[35%]  border-1 border-white bg-[snow] shadow-lg rounded-md">
                                <p className='p-1 w-[100%] hover:bg-gray-200'>All</p>
                                <p className='p-1 w-[100%] hover:bg-gray-200'>None</p>
                                <p className='p-1 w-[100%] hover:bg-gray-200'>Read</p>
                                <p className='p-1 w-[100%] hover:bg-gray-200'>Unread</p>
                                <p className='p-1 w-[100%] hover:bg-gray-200'>Starred</p>
                                <p className='p-1 w-[100%] hover:bg-gray-200'>UnStarred</p>
                             </dropdown>
                                )
                        }
                    </AnimatePresence>
                </div>
                <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                    <IoRefresh onClick={()=>handleRefresh()} title='refresh' size={"20px"}/>
                </div>
                <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                    <IoMdMore size={"20px"}/>
                </div>
           </div>
           <div className="flex items-center gap-2">
                <p className='text-sm texat-gray-500'>1-50 of 1000</p>
                <button className="hover:rounded-full cursor-pointer"><MdOutlineKeyboardArrowLeft size={"24px"}/></button>
                <button><MdOutlineKeyboardArrowRight className="hover:rounded-full cursor-pointer" size={"20px"}/></button>
           </div>
        </div>
        <div className='h-[90vh] overflow-y-auto'>
                <div className='flex items-center gap-2'>
                    {
                        mailType.map((item,index)=>{
                            return (
                                <button 
                                    key={index}
                                    className={`${mailTypeSelected === index ? 'border-b-4 border-b-blue-600 text-blue-600 ' : ' border-b-4 border-b-transparent' } flex items-center gap-5 w-50 hover:bg-gray-100 p-2 ml-2 `}
                                    onClick={()=>setMailTypeSelected(index)}
                                >
                                    {item.icon}
                                    <span>{item.text}</span>
                                </button>
                            )
                        })
                    }
                </div>
                <div>
                    <Messages/>
                </div>
        </div>
    </div>
  )
}

export default Inbox;
