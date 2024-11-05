import styles from "./Home.module.css";
import { MdOutlineTimer } from "react-icons/md";
// import HomeDetails from "../../components/homeDetails/HomeDetails";
// import ServiceAndProductSec from "../../serviceAndProduct/ServiceAndProductSec";
import { Link, useNavigate } from "react-router-dom";
import { authSelector } from "../../redux/authReducer";
import { useSelector } from "react-redux";


export default function Home(){

    const { user, isLoggedIn } = useSelector(authSelector);
    const navigate = useNavigate();

    function handleRedirectLansPage(){
        if(user && isLoggedIn){
            navigate(`/user/applyLoan/${user._id}`);

        }else{
            navigate("/signin")
        }
    }


    return(

        <>
        <div className={styles.homePageContainer}>
            <div className={styles.firstHeader}>

                <div className={styles.trendIcon}>
                    <img src="./images/trend.png" alt="Trand"  />
                </div>
               
                <h1>Rate drop alert</h1>
            </div>

        <div className={styles.mainBannerColleps}>
            <h1 className={styles.mainHeading}>The rate drop you’ve <br/> been waiting for</h1>


            <div className={styles.bannerImg}>
                <img src="https://media.better.com/better-com/homepage/rate-drop-notify.webp" 
                className={styles.homeBanerImage} />

            </div>

        </div>


             <div className={styles.startAproveDiv}>
                <button onClick={()=>handleRedirectLansPage()}>
                    {/* <Link to={`/user/applyLoan/${user._id}`}>

                       
                    </Link> */}
                     Start my approve
                   
                </button>
                <p className={styles.startPara}>
                    <MdOutlineTimer className={styles.timerIcons} />
                    <span>3 min | No credit impact</span>
                </p>

            </div>


        <div className={styles.ratingBox}>

            <div className={styles.ratingHeader}>
                <img src="./images/google.png" alt="google" className={styles.googleIcon}/>
                <img src="./images/star.png" alt="fullrate" className={styles.fullSter} />
                <img src="./images/star.png" alt="fullrate" className={styles.fullSter} />
                <img src="./images/star.png" alt="fullrate" className={styles.fullSter} />
                <img src="./images/star.png" alt="fullrate" className={styles.fullSter} />
                <img src="./images/rating.png" alt="halfrate" className={styles.halfSter} />
            </div>

            <p className={styles.ratingInfo}>4.6 Stars | 3177 Google reviews</p>

            </div>

        </div>

        {/* <HomeDetails />
        <ServiceAndProductSec /> */}
    </>)

}