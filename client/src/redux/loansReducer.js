// userLoanReducer.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setLoading, clearLoading } from "./loadingReducer";
import { setError } from "./errorReducer";
import axios from "axios";

const initialState = {
    userLoans: null,
};

// Async action to apply for a loan
export const applyLoanApiAsync = createAsyncThunk(
    "userLoan/applyLoanApi",
    async (data, thunkApi) => {
        try {
            thunkApi.dispatch(setLoading());
            const res = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/loans/applyLoan`,
                data,
                { withCredentials: true }
            );
            return res.data;
        } catch (error) {
            thunkApi.dispatch(setError(error.response.data.message));
            return thunkApi.rejectWithValue(error.response.data.message);
        } finally {
            thunkApi.dispatch(clearLoading());
        }
    }
);

// Async action to fetch loans for the current user
export const fetchOneLoanByUserApiAsync = createAsyncThunk(
    "userLoan/fetchOneLoanByUserApi",
    async (_, thunkApi) => {
        try {
            thunkApi.dispatch(setLoading());
            const res = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/api/loans/getOne`,
                { withCredentials: true }
            );
            return res.data;
        } catch (error) {
            thunkApi.dispatch(setError(error.response.data.message));
            return thunkApi.rejectWithValue(error.response.data.message);
        } finally {
            thunkApi.dispatch(clearLoading());
        }
    }
);


//========= pay loanTerm async thunk ==============//
export const payLoanTermApiAsync = createAsyncThunk("/loan/payLoanTermApi",
    async(data, thunkApi)=>{
        try{
            thunkApi.dispatch(setLoading());

           const res = await axios.post( `${process.env.REACT_APP_SERVER_URL}/api/loans/payTerm`,
            data, {withCredentials:true});

            console.log("pay loan term api res.data: ", res.data);

            return res.data;

        }catch(error){
            thunkApi.dispatch(setError(error.response.data.message));
            return thunkApi.rejectWithValue(error.response.data.message);

        }finally{
            thunkApi.dispatch(clearLoading());
        }
    }
)

const userLoanSlice = createSlice({
    name: "userLoan",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(applyLoanApiAsync.fulfilled, (state, action) => {
                state.userLoans = {...action.payload?.loans};
            })

            //--------- fetch one data by userId -----------------//
            .addCase(fetchOneLoanByUserApiAsync.fulfilled, (state, action) => {
                state.userLoans = {...action.payload};
            })

            //--------- payloan terms api response update ---------//
            .addCase(payLoanTermApiAsync.fulfilled, (state, action)=>{
             
                state.userLoans = {...action.payload?.loan}
            })

    },
});


export const userLoanReducer = userLoanSlice.reducer;
export const userLoanSelector = (state)=>state.userLoanReducer;
export const userLoanActions = userLoanSlice.actions;

