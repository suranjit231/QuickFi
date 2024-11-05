import { useState } from "react";
import styles from "./signupForm.module.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { signupApiAsync, authSelector } from "../../redux/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

 
export default function SignupForm() {
  const [ name, setName ] = useState("");
  const [ email, setEmail] = useState("");
  const [ password, setPassword] = useState("");
  const [ contact, setContact ] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authLoading } = useSelector(authSelector);



  //======== function handle signup form submit ==========//
  async function handleSignupFormSubmit(e){
    try{
      e.preventDefault();

      if(!name || !email || !password || !contact){
          toast.error("All fields required")
      }

      const result = await dispatch(signupApiAsync({name, email, password, contact}));

      if(result.type === "auth/signupApi/fulfilled"){
        toast.success("signup sucessfully")
        clearInput();
        navigate("/signin");
     }


    }catch(error){
      toast.error(error.message);

    }

  }


  //======= function clearInput ==========//
  function clearInput(){
    setName("");
    setEmail("");
    setPassword("");
    setContact("");
  }




  return (
    <div className={styles.signupFormContainer}>
      <form onSubmit={(e)=>handleSignupFormSubmit(e)} className={styles.signupForm}>
        <h2 className={styles.formHeader}>Create Your Account</h2>

        <div className={styles.formGroup}>
          <FaUser />
          <input value={name} onChange={(e)=>setName(e.target.value)}
           type="text" placeholder="Full Name" required />
        </div>

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

        <div className={styles.formGroup}>
            <FaPhone />
          <input value={contact} onChange={(e)=>setContact(e.target.value)}
           type="text" placeholder="Mobile" required />
        </div>

        <button type="submit" className={styles.submitButton} disabled={authLoading}>
            {authLoading ? <ClipLoader size={15} color={"#fff"} /> : "Sign Up"}
        </button>


        <div className={styles.formLinks}>
          <Link to="/signin">Already have an account?</Link>
          <Link>Forgot password?</Link>
        </div>
      </form>
    </div>
  );
}
