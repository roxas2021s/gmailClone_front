import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { setDraftEmails, setOpen } from '../redux/appSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setEmails } from '../redux/appSlice';

function SendMail() {
  
    const [formData,setFormData] = useState({
        to:"",
        subject:"",
        message:""
    });

    const open = useSelector(store => store.appSlice.open);
    const dispatch = useDispatch();
    const token = useSelector(store => store.appSlice.token);
    

    const changeHandler = (e) =>{
        setFormData({...formData, [e.target.name]:e.target.value})
    };

    const fetchEmails = async() =>{
        const config = {
            headers:{
                'Authorization':`Bearer ${token}`
            }
        };

        try{
            const response = await axios.get('https://gmail-clone-backend-qgdb.onrender.com/email',config);

            const data = await response.data;
            console.log("get the email successfully");
            console.log(data);
            dispatch(setEmails(data));

        }catch(e){
            console.log("Error fetch emails ",e);
        }
    }



    useEffect(()=>{
        fetchEmails();
    },[])

 
    const submitEmail = async(e)=>{
       e.preventDefault();

       const config = {
            headers:{
                'Authorization':`Bearer ${token}`
            }
       }
       const newEmail = {
            to:formData.to,
            subject:formData.subject,
            message:formData.message
       };

       try{

        const response = await axios.post('https://gmail-clone-backend-qgdb.onrender.com/email',newEmail,config);

        console.log("email send successfully..");
        console.log(response.data);
        setFormData({
            to:"",
            subject:"",
            message:""
        });
        dispatch(setOpen(false));
        fetchEmails();

       }catch(e){
        console.log("error email send..",e);
       }
    }

    const handleDraftEmails = async(e) =>{
        e.preventDefault();

        const config = {
            headers:{
                'Authorization':`Bearer ${token}`
            }
       }
       const newEmail = {
            to:formData.to,
            subject:formData.subject,
            message:formData.message
       };

       try{

        const response = await axios.post('https://gmail-clone-backend-qgdb.onrender.com/draft',newEmail,config);

        console.log("email send successfully..");
        console.log(response.data);
        setFormData({
            to:"",
            subject:"",
            message:""
        });
        dispatch(setOpen(false));
        fetchEmails();

       }catch(e){
        console.log("error email send..",e);
       }

    }

  return (
    <div className= {`${ open ? 'block' :'hidden'}  bg-white max-w-6xl shadow-xl shadow-slate-600 rounded-t-md `}>
      <div className='flex px-3 py-3 bg-[#F2F6FC] justify-between rounded-t-md'>
         <h1>New Message</h1>
            <div onClick={handleDraftEmails} className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                <RxCross2 size={"15px"}/>
            </div>
      </div>
      <form onSubmit={submitEmail} className='flex flex-col p-3 gap-2'>
            <input 
                type="text"
                name="to"
                value={formData.to} 
                placeholder='To' 
                className='outline-none py-1'
                onChange={changeHandler}
            />
            <input 
                type="text" 
                name='subject'
                value={formData.subject} 
                placeholder="Subject" 
                className='outline-none py-1'
                onChange={changeHandler}    
            />
            <textarea 
                name="message" 
                value={formData.message} 
                onChange={changeHandler}
                cols={"30"} 
                rows={"10"} 
                className='outline-none py-1'>

            </textarea>
            <button type='submit' className=' bg-[#085700] rounded-full w-fit px-4 text-white font-medium cursor-pointer '>Send</button>
      </form>
    </div>
  )
}

export { SendMail};
