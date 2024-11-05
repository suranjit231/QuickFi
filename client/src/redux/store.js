import { configureStore } from "@reduxjs/toolkit";
import { errorReducer } from "./errorReducer";
import { authReducer } from "./authReducer";
import { loadingReducer } from "./loadingReducer";
import { userLoanReducer } from "./loansReducer";
import { adminReducer } from "./adminReducer";


//======== setup redux store ===========//
const store = configureStore({
    reducer:{
        errorReducer:errorReducer,
        authReducer:authReducer,
        loadingReducer:loadingReducer,
        userLoanReducer:userLoanReducer,
        adminReducer:adminReducer
       
    }
})


export default store;