import styles from "./Navbar.module.css";
import { IoIosCall } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import DropDownMenu from "../dropdown/DropDownMenu";
import { useNavContext } from "../../context/NavContext";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { authSelector } from "../../redux/authReducer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { logoutApiAsync } from "../../redux/authReducer";


export default function Navbar() {
    const { activeLink, showDropDown, hideDropDown, isSticky, isMobile, isUserSidebar, toggleUserSideBar } = useNavContext();
    const { isLoggedIn, user } = useSelector(authSelector);
    const location = useLocation();

    const [ isApplyPage, setApplyPage] = useState(false);

    console.log("location.path: ", location.pathname)

    useEffect(()=>{
        if(location.pathname === `/user/applyLoan/${user?._id}`){
            setApplyPage(true);

        }else{
            setApplyPage(false);
        }

    },[location.pathname, user])

    const [ showLogoutOptions, setShowLogoutOption ] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleToggleLogoutOptions(){
        setShowLogoutOption(true);
    }

    function closedLogoutOptions(){
        setShowLogoutOption(false)
    }

    function handleNavigateDashboard(){
        navigate(`/admin/dashboard/${user._id}`);
    }

    async function handleLogoutClick() {
       const result = await dispatch(logoutApiAsync());

       if(result){
            navigate("/signin");
       }
        
    }

    const navLinks = [
        { name: 'Apply Now', id: 'applyNow' },
        { name: 'Loan Types', id: 'loanTypes' },
        { name: 'Calculators', id: 'calculators' },
        { name: 'Resources', id: 'resources' }
    ];

    return (
        <>
            <div className={`${styles.navbarContainer} ${isSticky ? styles.sticky : ""}`}>
                <div className={styles.leftNavbar}>
                    <h3 className={styles.navLogo}>
                        <Link to={"/"}>
                             QuickLoan
                        </Link>
                    </h3>
                    {navLinks.map(link => (
                        <p
                            key={link.id}
                            onMouseOver={() => showDropDown(link.id)}
                            onMouseLeave={hideDropDown}
                            className={styles.navLink}
                        >
                            {link.name}
                            {activeLink === link.id && <DropDownMenu />}
                        </p>
                    ))}
                </div>

                <div className={styles.rightNavbar}>
                    <div
                        onMouseOver={() => showDropDown('call')}
                        onMouseLeave={hideDropDown}
                        className={styles.contactLink}
                    >
                        <IoIosCall className={styles.callIcons} />
                        {activeLink === 'call' && <DropDownMenu />}
                    </div>

                    {/* {isLoggedIn && user &&  user?.role==="customer" && (
                        <div className={styles.userIconsContainer}>
                            {!isMobile ? (
                                <Link to={`/user/dashboard/${user._id}`}>
                                    <MdMenu className={styles.dashMenuIcon} />
                                </Link>
                            ) : (
                                isUserSidebar ? (
                                    <IoClose className={styles.menuIcon} onClick={toggleUserSideBar} />
                                ) : (
                                    <MdMenu className={styles.menuIcon} onClick={toggleUserSideBar} />
                                )
                            )}
                        </div>
                    )} */}


                    {/* {isLoggedIn && user &&  user?.role==="customer" &&  isApplyPage && (
                        <div className={styles.userIconsContainer}>
                             <Link to={`/user/dashboard/${user._id}`}>
                                    <MdMenu className={styles.dashMenuIcon} />
                            </Link>
                           
                        </div>
                    )} */}


                    {isLoggedIn && user && user.role === "customer" && (
                        <div className={styles.userIconsContainer}>
                            {isApplyPage ? (
                                <Link to={`/user/dashboard/${user._id}`}>
                                    <MdMenu className={styles.dashMenuIcon} />
                                </Link>
                            ) : (
                                !isMobile ? (
                                    <Link to={`/user/dashboard/${user._id}`}>
                                        <MdMenu className={styles.dashMenuIcon} />
                                    </Link>
                                ) : isUserSidebar ? (
                                    <IoClose className={styles.menuIcon} onClick={toggleUserSideBar} />
                                ) : (
                                    <MdMenu className={styles.menuIcon} onClick={toggleUserSideBar} />
                                )
                            )}
                        </div>
                    )}





                    { isLoggedIn && user && user?.role==="admin" && (
                        <div onMouseOver={()=>handleToggleLogoutOptions()}

                            onMouseLeave={()=>closedLogoutOptions()}
                         className={`${styles.adminIconsContainer}`}>


                            <MdMenu className={styles.icon} />
                            <div className={`${styles.logoutDropDown} ${showLogoutOptions && styles.showLogoutOptions}`}> 
                                <p onClick={()=>handleNavigateDashboard()}>Dashboard</p>

                               
                                <p onClick={()=> handleLogoutClick()}>Logout</p>
                            </div>


                        </div>

                    )}

                    {!isLoggedIn && (
                        <div className={styles.signinLink}>
                            <Link to="/signin">Sign In</Link>
                        </div>
                    )}
                </div>
            </div>

            <Outlet />
        </>
    );
}
