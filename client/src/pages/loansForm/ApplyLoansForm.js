import React, { useState } from "react";
import styles from "./ApplyLoansForm.module.css";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { FiDollarSign } from "react-icons/fi";
import { toast } from "react-toastify";
import { applyLoanApiAsync, userLoanSelector } from "../../redux/loansReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSelector, userSelector } from "../../redux/authReducer";


export default function ApplyLoansForm() {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [interest, setInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [weeklyPayment, setWeeklyPayment] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(authSelector);


  //--------- calculate interest for user checking -------------//
  const calculateInterest = () => {
    const loanAmount = parseFloat(amount);
    const loanTerm = parseInt(term);
    const interestRate = 0.02;
    const calculatedInterest = loanAmount * interestRate * loanTerm;
    const total = loanAmount + calculatedInterest;
    const weekly = total / loanTerm;

    setInterest(calculatedInterest.toFixed(2));
    setTotalAmount(total.toFixed(2));
    setWeeklyPayment(weekly.toFixed(2));
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (amount && term) {
      const result = await dispatch(applyLoanApiAsync({ amount:amount, loanTermWeeks:term}))

      if(result.type === "userLoan/applyLoanApi/fulfilled"){
          toast.success("Loan application submitted successfully!");
          setAmount("");
          setTerm("");
          setShowModal(false);
          navigate(`/user/dashboard/${user._id}`);
      }

    } else {
      toast.error("Please fill in all fields!");
    }
  };

  return (
    <div className={styles.applyLoanFormContainer}>
      <form className={styles.loanForm} onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>Apply for Loan</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="amount">Loan Amount ($)</label>
          <div className={styles.inputWithIcon}>
            <FiDollarSign className={styles.inputIcon} />
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="term">Loan Term (Weeks)</label>
          <div className={styles.inputWithIcon}>
            <IoCheckmarkCircleSharp className={styles.inputIcon} />
            <select
              id="term"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              required
            >
              <option value="">Select term</option>
              <option value="1">1 Weeks</option>
              <option value="2">2 Weeks</option>
              <option value="3">3 Weeks</option>
              <option value="4">4 Weeks</option>
              <option value="8">8 Weeks</option>
              <option value="12">12 Weeks</option>
            </select>
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.calculateButton}
            onClick={calculateInterest}
          >
            Check Interest
          </button>
          <button type="submit" className={styles.submitButton}>
            Apply Now
          </button>
        </div>
      </form>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Loan Details</h3>
            <p>Loan Amount: ${amount}</p>
            <p>Loan Term: {term} weeks</p>
            <p>Interest: ${interest}</p>
            <p>Total Amount: ${totalAmount}</p>
            <p>Weekly Payment: ${weeklyPayment}</p>
            <button onClick={() => setShowModal(false)} className={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
