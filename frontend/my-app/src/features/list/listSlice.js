import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"



export const createUser=createAsyncThunk("createUser",async(data, { rejectWithValue })=>{
   try{
  
 const response=await axios.post("http://localhost:3070/api/category",data,{
    headers:{
        "authentication":localStorage.getItem("token")
    }
 })
 console.log("res",response.data)
  return response.data

   }
   catch(err){
    return rejectWithValue(err)
   }
})

export const updateUser=createAsyncThunk("updateUser",async(form, { rejectWithValue },)=>{
    try{
   
  const response=await axios.put(`http://localhost:3070/api/update/${form.id}`,form,{
    headers:{
        "authentication":localStorage.getItem("token")
    }
 })
   return response.data
    }
    catch(err){
     return rejectWithValue(err)
    }
 })
export const getUser=createAsyncThunk("getUser",async( _,{ rejectWithValue })=>{
    try{
   
  const result=await axios.get('http://localhost:3070/api/get',{
    headers:{
        "authentication":localStorage.getItem("token")
    }
 })
    return result.data

    }
    catch(err){
     return rejectWithValue(err)
    }
 })
 export const deleteUser=createAsyncThunk("deleteUser",async( id,{ rejectWithValue })=>{
    try{
   
  const result=await axios.delete(`http://localhost:3070/api/delete/${id}`,{
    headers:{
        "authentication":localStorage.getItem("token")
    }
 })
    return result.data

    }
    catch(err){
     return rejectWithValue(err)
    }
 })
const initialState={
    users:[],
    loading:false,
    error:null,
}

export const listSlice=createSlice({
    name:"listSlice",
     initialState,
     extraReducers: (builder) => {
        builder
       
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
               console.log("action",action.payload)
               if (!Array.isArray(state.users)) state.users = [];
                state.loading = false;
                state.users = [...state.users,action.payload];
                
            })
            .addCase(createUser.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
               console.log("a",action.payload)
                state.loading = false;
                state.users = action.payload
            })
            .addCase(getUser.rejected, (state) => {
                state.loading = false;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {               
                state.loading = false;
                state.users = state.users.filter((ele=>ele._id!==action.payload._id))
            })
            .addCase(deleteUser.rejected, (state) => {
                state.loading = false;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
               
                state.loading = false;
                state.users = state.users.map((ele)=>{
                    if(ele._id === action.payload._id){
                        return {...ele,...action.payload}
                    }else{
                        return {...ele}
                    }
                })
            })
            .addCase(updateUser.rejected, (state) => {
                state.loading = false;
            })
    },
})

export default listSlice.reducer