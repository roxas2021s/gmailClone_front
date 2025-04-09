
import React, { useEffect } from 'react';
import { IoMdMore,IoMdArrowBack } from 'react-icons/io';
import { useState } from 'react';
import { 
    MdKeyboardArrowRight,
    MdKeyboardArrowLeft,
    MdDeleteOutline,
    MdOutlineReport,
    MdOutlineMarkEmailUnread,
    MdOutlineWatchLater,
    MdOutlineAddTask,
    MdOutlineDriveFileMove
  
 } from 'react-icons/md';

import { BiArchiveIn } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setDraftEmails } from '../redux/appSlice';

function Mail() {

  let dispatch = useDispatch();


  const navigate = useNavigate();
  const [selectEmail,setSelectEmail] = useState({
    to:window.localStorage.getItem('to'),
    message:window.localStorage.getItem('message'),
    subject:window.localStorage.getItem('subject'),
    createAt:window.localStorage.getItem('createAt')
  });

  const handleDeleteEmail = async (id) =>{
    confirm("you want delete this email...");
    
    try{
      let response = await axios.delete(`https://gmail-clone-backend-qgdb.onrender.com/delete/${id}`);
      let data = await response.data;
      if(response.status == 200){
        console.log(data);
        dispatch(setDraftEmails(data));
        console.log("delete the email successfully.");
        setSelectEmail({
          to:"",
          message:"",
          subject:"",
          createAt:""
        });
        navigate('/');
        
        let refreshPage = () =>{
          window.location.reload()
        }
        setTimeout(()=>{
          refreshPage();
        },1000)
       
      }else{
        console.log("failed to delete")
      }

    }catch(e){
      console.log("failed to delete email",e)
    }
    
  }
  const {id} = useParams();
  console.log(id);
  return (
    <div className='flex-1 bg-white rounded-xl mx-5'>
      <div className='flex items-center justify-between px-4'>
        <div className="flex items-center gap-2 text-gray-700 p-2">
            <div onClick={()=>navigate('/')} className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
              <IoMdArrowBack size={'20px'}/>
            </div>
            <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
              <BiArchiveIn size={'20px'}/>
            </div>
            <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
              <MdOutlineReport size={'20px'}/>
            </div>
            <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
              <MdDeleteOutline onClick={()=>handleDeleteEmail(id)}  size={'20px'}/>
            </div>
            <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
              <MdOutlineMarkEmailUnread size={'20px'}/>
            </div>
            <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
              <MdOutlineWatchLater size={'20px'}/>
            </div>
            <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
              <MdOutlineAddTask size={'20px'}/>
            </div>
            <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
              <MdOutlineAddTask size={'20px'}/>
            </div>
            <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
              <MdOutlineDriveFileMove size={'20px'}/>
            </div>
            <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
              <IoMdMore size={'20px'}/>
            </div>
        </div>
        <div className='flex items-center gap-2'>
                <button className="hover:rounded-full cursor-pointer"><MdKeyboardArrowLeft size={"24px"}/></button>
                <button><MdKeyboardArrowRight className="hover:rounded-full cursor-pointer" size={"20px"}/></button>
        </div>
      </div>
      <div className='h-[90vh] overflow-y-auto p-4'>
        <div className='flex items-center justify-between bg-white gap-1'>
            <div className='flex items-center gap-2'>
              <h1 className='text-xl font-medium'>{selectEmail.subject}</h1>
              <span className='text-sm bg-gray-200 rounded-md px-2'>inbox</span>
            </div>
            <div className='flex-none text-gray-400 my-5 text-sm'>
              <p>{selectEmail.createAt}</p>
            </div>
        </div>
        <div className='text-gray-500 text-sm'>
            <h1>{selectEmail.to}</h1>
            <span>to me</span>
        </div>
        <div className='my-10'>
          <p>{selectEmail.message}</p>
        </div>
      </div>
    </div>
  )
}

export default Mail;
