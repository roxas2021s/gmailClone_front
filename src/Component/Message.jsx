

import React, { useEffect } from 'react';
import { RiStarLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmailImportant } from '../redux/appSlice';
import axios from 'axios';



function Message({email}) {

    const navigate = useNavigate();


    let token = useSelector(store=>store.appSlice.token);
    const openMail =()=>{
        navigate(`/mail/${email._id}`);
        window.localStorage.setItem('to',`${email.to}`);
        window.localStorage.setItem('subject',`${email.subject}`);
        window.localStorage.setItem('message',`${email.message}`);
        window.localStorage.setItem('createAt',`${email.createAt}`);
       
    }
   
    let dispatch = useDispatch();
     
 

      const updateEmails = async() =>{
            const config = {
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            };
    
            try{
                const response = await axios.get('https://gmail-clone-backend-qgdb.onrender.com/email',config);
    
                const data = await response.data;

                console.log("get the email successfully");
                console.log("daa",data);
                dispatch(setEmailImportant(data))
               
    
            }catch(e){
                console.log("Error fetch emails ",e);
            }
        }
    
        useEffect(()=>{
            updateEmails();
        },[])

    const [starred,setStarred] = useState(false); 
   

  let handleStarEmail = async(id) =>{
    setStarred(!starred);
    
    
    let updateObject = {
        isImportant: starred || false
    }

    try{
        let response = await axios.put(`https://gmail-clone-backend-qgdb.onrender.com/email/update/${id}`,updateObject);

        let result = await response.data;

        console.log(result);
        console.log("udpate email is successfully..");
       
        updateEmails();

    }catch(e){
        console.log("udpate email is not success",e);
    }
    
  }
 
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
            <div onClick={()=>handleStarEmail(email._id)} className='flex-none text-gray-600 shadow-md'>
                 <RiStarLine color={`${starred == true ? 'yellow':'black'}`}  className='w-5 h-5 '/>
                
            </div>
            <div onClick={openMail}  className='flex-1 ml-4 '>
              <p className=' truncate inline-block max-w-full'>{ email.message }</p> 
            </div>
          
        </div>
        <div className="flex-none items-center  text-gray-600 text-sm  ">
                <p>{new Date(email.createAt).toLocaleString()}</p>
            </div>
    </motion.div>

    )
  
}

export default Message;
