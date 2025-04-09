import React, { useState } from 'react';
import { MdCropSquare } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const Sentfile = ({item}) =>{
  return (
    <motion.div 
    initial={{opacity:0,y:20}}
    animate={{opacity:1, y:0}}
    transition={{duration:0.5}}
        className='flex items-start justify-between border-b border-gray-200 px-4 text-sm hover:cursor-pointer hover:shadow-md'>
        <div className='flex items-center gap-3 m-2'>
            <div className='flex-none text-gray-600'>
                <MdCropSquare size={'18px'} className='w-5 h-5 '/>
            </div>
            <div className='flex-1 ml-4 '>
              <p className='text-gray-600 truncate inline-block max-w-full'>{item.message}</p> 
            </div>
           
        </div>
        <div className="flex-none text-gray-600 text-sm ">
                <p>{new Date(item.createAt).toDateString()}</p>
        </div>
       
    </motion.div>
  )
}

function Sent(){

  const emails = useSelector(store => store.appSlice.emails);
  return (
      <div className='flex flex-col w-[100%] bg-[white]'>
          {
            emails.map((item,index)=>(
              <Sentfile key={index} item ={item}/>
            ))
          }
      </div>
  )
}

export default Sent;
