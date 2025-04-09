
import React, { useEffect, useRef } from 'react';
import { HiOutlineInbox } from "react-icons/hi";
import { LuPencil } from 'react-icons/lu';
import { IoMdStar } from "react-icons/io";
import { MdOutlineDrafts, MdOutlineKeyboardArrowDown, MdOutlineWatchLater } from 'react-icons/md';
import { IoMdSend } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { setOpen } from '../redux/appSlice';
import { useNavigate } from 'react-router-dom';
import { MdLabelImportantOutline } from "react-icons/md";
import { BsChatSquareText } from "react-icons/bs";
import { MdOutlineScheduleSend } from "react-icons/md";
import { LuMails } from "react-icons/lu";
import { RiSpam2Line } from "react-icons/ri";
import { CiTrash } from "react-icons/ci";


const SidebarItems =[
    {
        id:1,
        icon:<HiOutlineInbox size={"24px"}/>,
        text:"Inbox"
    },
    {
        id:2,
        icon:<IoMdStar size={"24px"}/>,
        text:"Starred"
    },
    {
        id:3,
        icon:<MdOutlineWatchLater size={"24px"}/>,
        text:"Snoozed"
    },
    {
        id:4,
        icon:<IoMdSend size={"24px"}/>,
        text:"Sent"
    },
    {
        id:5,
        icon:<MdOutlineDrafts size={"24px"}/>,
        text:"Drafts"
    },
    {
        id:6,
        icon:<MdLabelImportantOutline />,
        text:"Important"
    },
    {
        id:7,
        icon:<BsChatSquareText />,
        text:"Chats"
    },
    {
        id:8,
        icon:<MdOutlineScheduleSend />,
        text:"Scheduled"
    },
    {
        id:9,
        icon:<LuMails />,
        text:"All mail"
    },
    {
        id:10,
        icon:<RiSpam2Line />,
        text:'Spam'
    },
    {
        id:11,
        icon:<CiTrash />,        
        text:"Trash"
    }
    
]

const Button = ({text}) =>{

    const navigate = useNavigate();
    
  
    let handleText = (e) =>{
        let values = e.target.value;
        
        if(values == 'Inbox'){
            navigate('/')
        }else if (values == 'Starred'){
            navigate('/Starred')
        }else if (values == 'Snoozed'){
            navigate('/Snoozed')
        }else if (values == 'Sent'){
            navigate('/Sent')
        }else if (values == 'Drafts'){
            navigate('/Drafts')
        }
        
    }
    
    return (
        <div>
            <button onClick={handleText} value={text}>{text}</button>
        </div>
    )
}

function Sidebar() {

    const dispatch = useDispatch();
   

  return (
    <div className='w-[13%] overflow-y-auto '>
        <div className='p-3'>
            <button onClick={()=>dispatch(setOpen(true))} className='flex items-center gap-2 p-4 rounded-2xl hover:shadow-md bg-[#C2E7FF]'>
                <LuPencil size={"24px"}/>
                Compose
            </button>
        </div>
        {
            SidebarItems.map((item)=>{
                return (
                    
                    <div key={item.id} className='flex items-center gap-3 pl-6 py-1 hover:cursor-pointer hover:bg-gray-200 rounded-full my-2'>
                            {item.icon}
                        <Button  text={item.text}/>
                    </div>
              
                )
            })
            
        }
        
    </div>
  )
}

export default Sidebar;
