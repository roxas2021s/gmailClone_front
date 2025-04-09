
import React, { useEffect,useState } from 'react';
import Message from './Message';
import { useSelector } from 'react-redux';

function Messages() {

  const emails= useSelector(store => store.appSlice.emails);
  const searchEmail = useSelector(store => store.appSlice.searchEmail);
  const [tempEmails,setTempEmails] = useState(emails);

  useEffect(()=>{
    const filteredEamil = emails.filter((email)=>{
      return email.subject.toLowerCase().includes(searchEmail.toLowerCase()) || email.to.toLowerCase().includes(searchEmail.toLowerCase()) || email.message.toLowerCase().includes(searchEmail.toLowerCase())
    })
    setTempEmails(filteredEamil);
    
  },[emails,searchEmail])

  return (
    <div className='flex flex-col items-between justify-between  hover:text-[black]'>
      {
        tempEmails && tempEmails.map((email,index)=>(
          <Message key={index} email={email}/>
        
        ))
      }
       
        
    </div>
  )
}

export default Messages;
