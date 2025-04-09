import React, { useState,useEffect } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";
import { CiCircleQuestion } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { PiDotsNineBold } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchEmail } from '../redux/appSlice';
import { AnimatePresence,motion } from 'framer-motion';
import { setToken } from '../redux/appSlice';
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import { RxAvatar } from "react-icons/rx";



function Navbar() {
  
  const dispatch = useDispatch();
  const user = useSelector(store => store.appSlice.user);
  const [input,setInput] = useState("");
  const [toggle,setToggle] = useState(false);

 
  useEffect(()=>{
    dispatch(setSearchEmail(input));
  },[input])

  const handleLogout = () =>{
    window.localStorage.removeItem('token');
    dispatch(setToken(null));
  }
 
  return (
    <div className='flex items-center justify-between mx-3 h-16'>
      <div className='flex items-center gap-10'>
        <div className='flex items-center gap-2'>
          <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
            <GiHamburgerMenu title='menu' size={"20px"}/>
          </div>
          <img className='w-8'src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThD6A938X2F3kMW50WVmJZtngHfx8eBXFL-w&s" alt="gmail-logo" />
          <h1 className='text-2xl text-grey-500 font-medium'>Gmail</h1>
        </div>
      </div>
        <div className='md:block hidden w-[50%] mr-60'>
          <div className='flex items-center bg-[#EAF1FB] hover:bg-[white] px-2 py-2 rounded-full'>
            <IoIosSearch size={"24px"} className='text-gray-700'/>

            <input
              type="text"
              placeholder='Search Mail'
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              className='rounded-full w-full bg-transparent outline-none px-2 text-md '
            />
          </div>
        </div>
        <div className='md:block hidden'>
            <div className='flex items-center gap-2'>
                <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
                  <CiCircleQuestion title='support' size={"20px"} />
                </div>
                <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
                  <IoSettingsOutline title='settings' size={"20px"} />
                </div>
                <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
                  <PiDotsNineBold title='googleapps' size={"20px"} />
                </div>
                <div className='relative cursor-pointer '>
                  <RxAvatar onClick={()=>setToggle(!toggle)} title='profile' className='w-10 h-10 mx-2'/>
                  <AnimatePresence>
                      {
                          toggle && (
                            <motion.div
                              initial={{opacity:0, scale:0.8}}
                              animate = {{opacity:1,scale:1}}
                              exit={{opacity:0,scale:0.8}}
                              transition={{duration:0.1}}
                              className='absolute flex  justify-center right-5 z-30 shadow-lg bg-gray-200 border-1 border-white w-[400px] h-[300px] rounded-md'
                            >
                                  <div className='flex flex-col justify-center m-5 p-3 w-[90%] h-[80%] '>
                                    <div>
                                      <h1 className='flex justify-center w-[100%] text-[black] my-4 p-2 '>{user}</h1>
                                    </div>
                                    <div className='flex justify-center '>
                                      <RxAvatar title='profile' className='w-15 h-15 mx-2 my-4'/>
                                    </div>

                                    <div className='flex text-[blue] w-[100%] justify-center'>
                                      <h2 className='flex justify-center bold border-1 border-black p-2 w-[200px] rounded-full'>Manage Google Apps</h2>
                                    </div>
                                    <div className='flex flex-row items-center w-[100%]  cursor-pointer my-4'>
                                       
                                    <button className='flex flex-row items-center cursor-pointer w-[50%] border border-gray-300 bg-[white] rounded-l-full p-3 hover:bg-gray-100 ' disabled><MdOutlineAddCircleOutline />Add Account</button>
                                        
                                     
                                        <button onClick={handleLogout} className='flex flex-row cursor-pointer items-center text-[red] w-[50%] border border-gray-300 bg-[white] rounded-r-full p-3 hover:bg-gray-100 '>
                                        <GoSignOut />

                                        Sign Out</button>
                                    </div>
                                  </div>
                            </motion.div>
                          )
                      }
                  </AnimatePresence>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar ;
