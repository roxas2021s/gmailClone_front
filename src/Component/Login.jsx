import { useDispatch } from "react-redux";
import { setRegister, setToken, setUser } from "../redux/appSlice";
import { useState } from "react";
import { VscEye } from "react-icons/vsc";

const Login = ()=>{
    const dispatch= useDispatch();
   

    const [loginData,setLoginData] = useState({
        username:"",
        password:""
    });
    
    const handleLogin = async(e)=>{
        e.preventDefault();

        console.log("user logged starting");
        const response = await fetch('https://gmail-clone-backend-qgdb.onrender.com/login',{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify(loginData)

        });

        const data = await response.json();

        if(response.status == 200){
            console.log("user logged success..");
            console.log(data);
            setLoginData({
                username:"",
                password:""
            })
            dispatch(setToken(data.token));
            dispatch(setUser(data.username));

            window.localStorage.setItem('token',data.token);
            window.localStorage.setItem('name',data.username);
        }
        else{
            alert("please enter correct username and password !");
            console.log("failed to logging user");
            console.log(data);
            
        }


    }
    const [show ,setShow] = useState(false);

    return (
        <div>
            <div className='container w-[100vw] h-[100vh] flex items-center justify-center '>
                <div onSubmit={handleLogin} className='flex flex-col w-[400px] h-[300px] ml-2 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-lg border-white shadow-md'>
                    <form className='flex flex-col  '>
                        <input type='email'
                            placeholder='Enter your username.. '
                            className='w-[300px] m-5 p-2 border-1 border-[snow] bg-[snow] rounded-md text-md outline-none  '
                            value={loginData.username}
                            onChange={(e)=>setLoginData({...loginData,username:e.target.value})}
                            required
                        />
                        <div className='flex flex-row items-center w-[300px] m-5 p-2 border-1 border-[snow] bg-[snow] rounded-md   '>
                            <input 
                                type={`${show ? 'text':'password'}`}
                                placeholder='Enter your password '
                                className="flex-1 text-md outline-none "
                                value={loginData.password}
                                onChange={(e)=>setLoginData({...loginData,password:e.target.value})}
                                required
                                
                            />
                            <VscEye onClick={()=>setShow(!show)} className="flex cursor-pointer"/>

                        </div>
                        <button type="submit" className='ml-5 p-1 w-[100px] bg-[snow] border-snow rounded-lg hover:text-[green] shadow-lg cursor-pointer'>Login</button>
                        
                    </form>
                        <p className='text-[blue] m-2 p-2 '>Not register <button onClick={()=>dispatch(setRegister(false))} className='bg-[snow] border-1 pl-1 w-[90px] rounded-md cursor-pointer hover:text-[green]'>register</button></p>
                </div>
                   
            </div> 
        </div>
    )
}


export default Login;