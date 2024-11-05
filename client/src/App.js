import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { NavContextProvider } from "./context/NavContext";
import Home from "./pages/home/Home";
import SignupFrom from "./pages/auth/signupForm";
import SigninForm from "./pages/auth/signinForm";
import { checkedLoggedInApiAsync } from "./redux/authReducer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { errorSelector, clearError } from "./redux/errorReducer";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import UserDashboard from "./pages/userdashboard/UserDashboard";
import CustomerProtectedRoute from "./protector/userProtector";
import ApplyLoansForm from "./pages/loansForm/ApplyLoansForm";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProtectedRoute from "./protector/adminProtector";


function App() {

  const dispatch = useDispatch();
  const { errorMessage } = useSelector(errorSelector);

  useEffect(() => {
      //====== show toast message if there is any error ============//
      if (errorMessage) {
          toast.error(errorMessage);
          
          //=== clear error after 3sec ==============//
          const timer = setTimeout(() => {
              dispatch(clearError());
          }, 3000);

          //==== clear on unmout phase ==========//
          return () => clearTimeout(timer);
      }
  }, [errorMessage, dispatch]);



  //======== checked is userLoggedin when page refesh or reload =============//
  useEffect(()=>{
      dispatch(checkedLoggedInApiAsync());

  },[dispatch])


  const router = createBrowserRouter([
    {path:"/", element:<Navbar />, children:[

      {index:true, element:<Home />},
      {path:"signup", element:<SignupFrom />},

      {path:"signin", element:<SigninForm />},

      {path:"user/dashboard/:userId", element:<CustomerProtectedRoute>
              <UserDashboard />
      </CustomerProtectedRoute>},

      { path:"user/applyLoan/:userId", element:<CustomerProtectedRoute>
        <ApplyLoansForm />
      </CustomerProtectedRoute>},

      { path:"admin/dashboard/:userId", element:<AdminProtectedRoute>
            <AdminDashboard />
      </AdminProtectedRoute>}

    ]}


  ])



  return (
    <div className="App">
      <NavContextProvider>
        <RouterProvider router={router} />

      </NavContextProvider>

      <ToastContainer className="custom-toast-container"/>
      
      
    </div>
  );
}

export default App;
