// PayLoans.js
import React from "react";
import { FaCreditCard, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import styles from "./Payloan.module.css";

import { useDispatch, useSelector } from "react-redux";
import { payLoanTermApiAsync } from "../../redux/loansReducer";
import { toast } from "react-toastify"
import { ClipLoader } from "react-spinners";
import { loadingSelector } from "../../redux/loadingReducer";


export default function PayLoans({ closePayLoans, amount, dueDate, loanId  }) {

    const dispatch = useDispatch();
    const { loading } = useSelector(loadingSelector);

    //------ handle click payloan terms ---------//
    async function handleClickPayLoanTerms(){
        try{

            if(!amount || !dueDate || !loanId){
                toast.error("fails to pay loans")
            }

            const result = await dispatch(payLoanTermApiAsync({
                loanId:loanId,
                amount:amount,
                dueDate:dueDate
            }))

            if(result.type === "/loan/payLoanTermApi/fulfilled"){
                toast.success("Your loan term pain sucessfully!")
                closePayLoans();
            }

        }catch(error){
            toast.error("failds to repay loans!")
        }

    }

   

    return (
        <div className={styles.payLoansOverlay}>
            <div className={styles.payLoansContainer}>
                <h2>Pay Your Loan</h2>
                <div className={styles.cardList}>
                    <div className={styles.paymentCard}>
                        <div className={styles.cardHeader}>
                            <FaCreditCard className={styles.cardIcon} />
                            <h3>Loan Payment Due</h3>
                        </div>
                        <div className={styles.cardDetails}>
                            <p className={styles.amount}>Amount: <strong>${amount}</strong></p>
                            <p className={styles.dueDate}>
                                <FaCalendarAlt className={styles.calendarIcon} /> Due Date: {new Date(dueDate).toLocaleDateString()}
                            </p>
                        </div>
                        <button onClick={()=>handleClickPayLoanTerms()}
                         className={styles.payNowButton} disabled={loading} >

                            {loading ? <ClipLoader size={15} color={"#fff"}
                            /> : <> Pay Now <FaArrowRight /></>}

                        </button>
                    </div>
                </div>
                <button onClick={closePayLoans} className={styles.closeButton}>Close</button>
            </div>
        </div>
    );
}

