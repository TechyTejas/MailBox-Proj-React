import { createSlice } from "@reduxjs/toolkit";

const initialAuthState={
    isAuthenticated:false,

}

const authslice=createSlice({
  name:"authentication",
  initialState:initialAuthState,
  reducers:{
     isLogin(state,action){
      state.isAuthenticated= true;
      localStorage.setItem("token",action.payload)
     },
     isLogout(state){
      state.isAuthenticated= false;
      localStorage.removeItem("token")
      localStorage.removeItem("email")
     }
    
  },
 
})

export const authActions=authslice.actions;
export default authslice.reducer;