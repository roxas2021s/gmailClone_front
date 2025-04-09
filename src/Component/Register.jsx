import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setRegister } from '../redux/appSlice';
import Login from './Login';


function Register() {

    const register = useSelector(store => store.appSlice.register);
    const dispatch = useDispatch();


    const [registerData,setRegisterData] = useState({
        username:"",
        name:"",
        password:""
    })

    const handleRegister = async(e) =>{
        e.preventDefault();

        const newRegister ={
            username:registerData.username,
            name:registerData.name,
            password:registerData.password
        };

        const response = await fetch('https://gmail-clone-backend-qgdb.onrender.com/register',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newRegister)
        });

        const data = await response.json();

        if(response.status == 200){
            console.log("user register successfully");
            console.log(data);
            setRegisterData({
                username:"",
                name:"",
                password:""
            });
            dispatch(setRegister(true));
        }else{
            console.log("failled to user register");
            console.log(data);
        }

    }
  

  return (
        <div>
            {
                register ? (
                    <Login/>
                ):(
                    <div className='container w-[100vw] h-[100vh] flex items-center justify-center '>
                        <div className='flex flex-col w-[400px] h-[350px] ml-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg border-white shadow-md'>
                            <form onSubmit={handleRegister} className='flex flex-col  '>
                                <input type='email'
                                    placeholder='Enter your username.. '
                                    className='w-[300px] m-5 p-2 border-1 border-[snow] bg-[snow] rounded-md text-md outline-none  '
                                    value={registerData.username}
                                    onChange={(e)=>setRegisterData({...registerData,username:e.target.value})}
                                    required
                                />
                                <input type='text'
                                    placeholder='Enter name '
                                    className='w-[300px] m-5 p-2 border-1 border-[snow] bg-[snow] rounded-md text-md outline-none  '
                                    value={registerData.name}
                                    onChange={(e)=>setRegisterData({...registerData,name:e.target.value})}
                                    required
                                />
                                <input type='password'
                                    placeholder='Enter your password '
                                    className='w-[300px] m-5 p-2 border-1 border-[snow] bg-[snow] rounded-md text-md outline-none  '
                                    value={registerData.password}
                                    onChange={(e)=>setRegisterData({...registerData,password:e.target.value})}
                                    required
                                />
                                <button type='submit' className='ml-5 p-1 w-[100px] bg-[snow] border-snow rounded-lg hover:text-[green] shadow-lg cursor-pointer'>Register</button>
                                
                            </form>
                                <p className='text-[blue] m-2 p-2 '>Already register <button onClick={()=>dispatch(setRegister(true))} className='bg-[snow] border-1 pl-1 w-[90px] rounded-md cursor-pointer hover:text-[green]'>login</button></p>
                        </div>
                        
                    </div>
                )
            }
            
        </div>
    
  )
}

export default Register;
