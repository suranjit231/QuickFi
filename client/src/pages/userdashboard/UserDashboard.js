

import { Link, useNavigate } from "react-router-dom";
import {
    FaDollarSign, FaHistory, FaCheckCircle, FaBell, FaCog, FaQuestionCircle, 
    FaChartLine, FaPiggyBank, FaCalculator, FaMoneyBillWave, FaSignOutAlt , FaPaperPlane
} from "react-icons/fa";
import styles from "./UserDashboard.module.css";
import { useNavContext } from "../../context/NavContext";
import { useEffect, useState } from "react";
import { logoutApiAsync } from "../../redux/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneLoanByUserApiAsync, userLoanSelector } from "../../redux/loansReducer";
import ClipLoader from "react-spinners/ClipLoader"; 
import PayLoans from "../payloan/Payloan";
import { authSelector } from "../../redux/authReducer";



export default function UserDashboard() {
    const dispatch = useDispatch();
    const { userLoans, loading } = useSelector(userLoanSelector);
    const { isMobile, isUserSidebar, toggleUserSideBar } = useNavContext();
    const [isPayLoansOpen, setPayLoansOpen] = useState(false);
    const [selectedRepayment, setSelectedRepayment] = useState(null);

    const { isLoggedIn, user } = useSelector(authSelector);
    const navigate = useNavigate();


    console.log("userLoans: ", userLoans);

    useEffect(()=>{
        if(isLoggedIn && user?.role ==="admin"){
            navigate(`/admin/dashboard/${user?._id}`)
        }

    },[isLoggedIn, user])

    useEffect(() => {
        dispatch(fetchOneLoanByUserApiAsync());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logoutApiAsync());
        if (isUserSidebar) toggleUserSideBar();
    };

    const openPayLoans = (repayment) => {
        setSelectedRepayment(repayment);
        setPayLoansOpen(true);
    };

    const closePayLoans = () => {
        setPayLoansOpen(false);
        setSelectedRepayment(null);
    };

    return (
        <div className={styles.dashboardContainer}>
            <aside className={`${styles.sidebar} ${isMobile && isUserSidebar && styles.showSideBar}`}>
                <h2>Dashboard</h2>
                <Link className={styles.sidebarLink}><FaCheckCircle /> Profile</Link>

                <Link to={`/user/applyLoan/${user?._id}`}
                className={styles.sidebarLink}><FaPaperPlane /> Apply Now</Link>

                <Link className={styles.sidebarLink}><FaHistory /> Loan History</Link>
                <Link className={styles.sidebarLink}><FaBell /> Notifications</Link>
                <Link className={styles.sidebarLink}><FaChartLine /> Activity Log</Link>
                <Link className={styles.sidebarLink}><FaCog /> Settings</Link>
                <Link className={styles.sidebarLink}><FaQuestionCircle /> Support</Link>
                <Link onClick={handleLogout} className={styles.sidebarLink}>
                    <FaSignOutAlt /> Logout
                </Link>
            </aside>

            <main className={styles.mainContent}>
                {loading ? (
                    <ClipLoader color="#004733" loading={loading} size={50} />
                ) : (
                    <>
                        {userLoans?.status === "PENDING" && (
                            <h2 className={styles.pendingMessage}>Your loan is currently pending approval.</h2>
                        )}

                        <section className={styles.summaryCards}>
                            <div className={styles.card}>
                                <FaDollarSign className={styles.cardIcon} />
                                <h3>Total Loan</h3>
                                <p>${userLoans?.amountRequested}</p>
                            </div>
                            <div className={styles.card}>
                                <FaPiggyBank className={styles.cardIcon} />
                                <h3>Total Paid</h3>
                            <p>
                                  ${
                                    Array.isArray(userLoans?.scheduledRepayments)
                                      ? userLoans.scheduledRepayments.reduce((total, repayment) => total + (repayment.paidAmount || 0), 0)
                                      : 0
                                  }
                                </p>
                               
                            </div>
                            <div className={styles.card}>
                                <FaCalculator className={styles.cardIcon} />
                                <h3>Interest Amount</h3>
                                <p>${userLoans?.totalInterest}</p>
                            </div>
                            <div className={styles.card}>
                                <FaMoneyBillWave className={styles.cardIcon} />
                                <h3>Balance Due</h3>
                                <p>${userLoans?.totalAmountWithInterest}</p>
                            </div>
                        </section>

                        <div className={styles.mainContentRow}>
                            <section className={styles.loanInfo}>
                                <h2>Loan Summary</h2>
                                <p><strong>Loan Term:</strong> {userLoans?.loanTermWeeks} weeks</p>
                                <p><strong>Start Date:</strong> {new Date(userLoans?.createdAt).toLocaleDateString()}</p>
                            </section>

                            <section className={styles.recentActivity}>
                                <h2>Recent Activities</h2>
                                <ul>
                                    <li>Updated profile information</li>
                                    <li>Checked loan history</li>
                                    <li>Requested customer support</li>
                                </ul>
                            </section>
                        </div>

                        {userLoans?.status === "APPROVED" && (
                            <section className={styles.repaymentSchedule}>
                                <h2>Repayment Schedule</h2>
                                <ul>
                                    {userLoans?.repayments.map((repayment, index) => (
                                        <li key={index} className={styles.repaymentItem}>
                                            <span>{new Date(repayment.dueDate).toLocaleDateString()}</span>
                                            <span>${repayment.amountDue}</span>
                                            <span>{repayment.status}</span>
                                            {repayment.status === "PENDING" && (
                                                <button onClick={() => openPayLoans(repayment)} className={styles.payLoanButton}>
                                                    Pay Now
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                
                                {isPayLoansOpen && selectedRepayment && (
                                    <PayLoans 
                                        closePayLoans={closePayLoans}
                                        amount={selectedRepayment.amountDue} 
                                        dueDate={selectedRepayment.dueDate}
                                        loanId={userLoans?.loanId}
                                    />
                                )}
                            </section>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

