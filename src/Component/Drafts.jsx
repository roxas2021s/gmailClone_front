import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { RiStarLine } from 'react-icons/ri';
import { setDraftEmails } from '../redux/appSlice';
import { useEffect } from 'react';
import axios from 'axios';
import { s } from 'framer-motion/client';

const DraftMail = ({mail}) =>{
  return (
    <motion.div 
    initial={{opacity:0,y:20}}
    animate={{opacity:1, y:0}}
    transition={{duration:0.5}}
    
        className='flex items-start justify-between border-b border-gray-200 px-4 m-2 text-sm hover:cursor-pointer hover:shadow-md'>
        <div className='flex items-center gap-3 m-1'>
            <div className='flex-none text-gray-600'>
                <input type='checkbox'  size={'20px'} className='box '/>
            </div>
            <div>
              <p className="flex-none text-red-400">Draft</p>
            </div>
            <div  className='flex-none text-gray-600 shadow-md'>
                 <RiStarLine   className='w-5 h-5 '/>
                
            </div>
            <div className='flex-1 ml-4 '>
              <p className=' truncate inline-block max-w-full'> {mail.message} </p> 
            </div>
          
        </div>
        <div className="flex-none items-center  text-gray-600 text-sm  ">
                <p>{new Date(mail.createAt).toLocaleString()}</p>
            </div>
    </motion.div>
  )
}

function Drafts() {

    let draftEmails = useSelector(store => store.appSlice.draftEmails);
    const dispatch = useDispatch();
    const token = useSelector(store => store.appSlice.token);
    
    const [emailDraft,setEmailDraft] = useState([])

      const fetchDraftEmails = async() =>{
          const config = {
              headers:{
                  'Authorization':`Bearer ${token}`
              }
          };
  
          try{
              const response = await axios.get('https://gmail-clone-backend-qgdb.onrender.com/draft',config);
  
              const draftData = await response.data;
              console.log("get the email successfully");
              console.log("draft data ",draftData);
              setEmailDraft(draftData);
  
          }catch(e){
              console.log("Error fetch emails ",e);
          }
          
      }

    useEffect(()=>{
        fetchDraftEmails();
    },[]);

 
  return (
    <div className='flex flex-col w-[100%] bg-[white]'>
        {
          emailDraft.map((draftMail,index)=>(
            <DraftMail mail={draftMail} key={index}/>
          ))
        }
    </div>
  
  )
}

export default Drafts
