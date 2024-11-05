
import axios from "axios";
import { setError } from "./errorReducer";
import { setLoading, clearLoading } from "./loadingReducer";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    loans:[]
}


export const getAdminReportApiAsync = createAsyncThunk("loans/getAdminReportApi",
    async(data, thunkApi)=>{
        try{

            thunkApi.dispatch(setLoading());

            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/admin/report`, {withCredentials:true});

            console.log("res.data for get admin report api: ", res.data);

            return res.data;

        }catch(error){
            thunkApi.dispatch(setError(error.response.data.message));
            return thunkApi.rejectWithValue(error.response.data.message);

        }finally{
            thunkApi.dispatch(clearLoading());
        }
    }
)


//========== handle loans approved click ===============//
export const loanApprovedApiAsync = createAsyncThunk("loans/loanApprovedApi",
    async(arg, thunkApi)=>{
        try{
            thunkApi.dispatch(setLoading());

            const res = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/admin/approved/${arg}`,
                {}, {withCredentials:true})

            console.log("res.data for approved loans: ", res.data);

            return res.data;
        }catch(error){
            thunkApi.dispatch(setError(error.response.data.message));
            return thunkApi.rejectWithValue(error.response.data.message);

        }finally{
            thunkApi.dispatch(clearLoading());
        }
    }
)



//========== handle loans reject click ===============//
export const loanRejectApiAsync = createAsyncThunk("loans/loanRejectApi",
    async(arg, thunkApi)=>{
        try{
            thunkApi.dispatch(setLoading());

            const res = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/admin/reject/${arg}`,
                {}, {withCredentials:true})

            console.log("res.data for reject loans: ", res.data);

            return res.data;
        }catch(error){
            thunkApi.dispatch(setError(error.response.data.message));
            return thunkApi.rejectWithValue(error.response.data.message);

        }finally{
            thunkApi.dispatch(clearLoading());
        }
    }
)


const adminSlice = createSlice({
    initialState:initialState,
    name:"loans",
    reducers:{},

    extraReducers:(builders)=>{
        builders
        .addCase(getAdminReportApiAsync.fulfilled, (state, action)=>{
            console.log("action.payload for admin report: ", action.payload)
            state.loans = {...action.payload?.data}
        })

        .addCase(loanApprovedApiAsync.fulfilled, (state, action)=>{
            console.log("...action.payload?.data.data: ", action.payload?.data.data)
            state.loans = {...action.payload?.data}
        })

        .addCase(loanRejectApiAsync.fulfilled, (state, action)=>{
            console.log("...action.payload?.data.data: ", action.payload?.data.data)
            state.loans = {...action.payload?.data}
        })


    }
})


export const adminReducer = adminSlice.reducer;
export const adminActions = adminSlice.actions;
export const adminSelector = (state)=>state.adminReducer;