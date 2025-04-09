import React from 'react'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { RiStarLine } from 'react-icons/ri';

const ImportantEmail = ({email}) =>{
  
    return (
      <div >

          {
            email.important ? (
              null
            ):(
           
              <motion.div 
                initial={{opacity:0,y:20}}
                animate={{opacity:1, y:0}}
                transition={{duration:0.5}}
                className='flex items-start justify-between border-b border-gray-200 px-4 m-2 text-sm hover:cursor-pointer hover:shadow-md'
              >
              <div className='flex items-center gap-3 m-1'>
                  <div className='flex-none text-gray-600'>
                      <input type='checkbox'  size={'20px'} className='box '/>
                  </div>
                  <div className='flex-none text-gray-600 shadow-md'>
                       <RiStarLine color='yellow'  size={'20px'} className='w-5 h-5 '/>
                  </div>
                  <div className='flex-1 ml-4 '>
                    <p className=' truncate inline-block max-w-full'>{email.message} </p> 
                  </div>
              </div>
              <div className="flex-none items-center  text-gray-600 text-sm  ">
                      <p>{new Date(email.createAt).toLocaleString()}</p>
              </div>
              </motion.div>
          
            )
          }
      </div>
    )
  
}

function Starred() {

  const emailImportant = useSelector(store => store.appSlice.emailImportant);

  console.log(emailImportant);

 return (
  <div className='flex flex-col w-[100%] bg-[white]'>
      { emailImportant.map((email,index)=>
       <ImportantEmail email={email} key={index}/>
          
        )
        
      }
  </div>
 )

 
}

export default Starred;
