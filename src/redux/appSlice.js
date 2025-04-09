import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name:"appSlice",
    initialState:{
        open : false,
        user:window.localStorage.getItem('name'),
        register:false,
        token:null || window.localStorage.getItem('token'),
        emails:[],
        searchEmail:[],
        emailImportant:[],
        draftEmails:[]
    },
    reducers:{
        setOpen : (state , action) =>{
            state.open = action.payload
        },
        setUser : (state,action) =>{
            state.user = action.payload
        },
        setRegister:(state,action)=>{
            state.register = action.payload
        },
        setToken:(state,action)=>{
            state.token = action.payload
        },
        setEmails:(state,action)=>{
            state.emails = action.payload
        },
        setLogout:(state,action)=>{
            state.logout = action.payload
        },
        setSearchEmail:(state,action)=>{
            state.searchEmail = action.payload
        },
        setEmailImportant:(state,action)=>{
            state.emailImportant = action.payload
        },
        setDraftEmails:(state,action)=>{
            state.emailImportant = action.payload
        }
       
    }
});

export const {setOpen, setUser, 
            setRegister,setToken, 
            setEmails,setLogout,
            setSearchEmail,setEmailImportant,
            setDraftEmails
            } = appSlice.actions;
export default appSlice.reducer;