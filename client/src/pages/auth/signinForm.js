import { useState, useEffect } from "react";
import styles from "./signupForm.module.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { authSelector, loginApiAsync } from "../../redux/authReducer";
import { useSelector, useDispatch } from "react-redux";

export default function SigninForm() {
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { authLoading, user, isLoggedIn } = useSelector(authSelector);

    const location = useLocation();

    useEffect(() => {

      if(isLoggedIn && user){

        console.log("location.path: ", location?.state?.from)
  
        if(user.role === "admin"){
          let path = location?.state?.from || `/admin/dashboard/${user._id}`;
          return navigate(path);
  
        }
  
        if(user.role==="customer"){


          //let userLoc = location?.state?.from === `/admin/dashboard/${user._id}`? false : location?.state?.from


          let path = location?.state?.from || `/user/dashboard/${user._id}`;
          return navigate(path);
  
        }
    
      }
     
      
     
    }, [isLoggedIn, user, location.state?.from]);



     //======== function handle signin form submit ==========//
  async function handleSigninFormSubmit(e){
    try{
      e.preventDefault();

      if( !email || !password ){
          toast.error("All fields required")
      }

      const result = await dispatch(loginApiAsync({ email, password}));
      if(result.type === "auth/loginApi/fulfilled"){
        toast.success("login sucessfully")
        clearInput();
     }


    }catch(error){
      toast.error(error.message);

    }

  }


  //======= function clearInput ==========//
  function clearInput(){
  
    setEmail("");
    setPassword("");
  
  }



  return (
    <div className={styles.signupFormContainer}>
      <form onSubmit={(e)=>handleSigninFormSubmit(e)} className={styles.signupForm}>
        <h2 className={styles.formHeader}>Sign In Your Account</h2>
        <div className={styles.formGroup}>
          <FaEnvelope />
          <input value={email} onChange={(e)=>setEmail(e.target.value)}
           type="email" placeholder="Email Address" required />
        </div>

        <div className={styles.formGroup}>
          <FaLock />
          <input value={password} onChange={(e)=>setPassword(e.target.value)}
           type="password" placeholder="Password" required />
        </div>

        <button type="submit" className={styles.submitButton} disabled={authLoading}>
            {authLoading ? <ClipLoader size={15} color={"#fff"} /> : "Sign In"}
        </button>

        <div className={styles.formLinks}>
          <Link to="/signup">Don't have an account?</Link>
          <Link>Forgot password?</Link>
        </div>
      </form>
    </div>
  );
}
