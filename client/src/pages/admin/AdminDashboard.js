
// import React, { useEffect } from 'react';
// import { FaTasks, FaClipboardList, FaMoneyBillWave } from 'react-icons/fa';
// import CircularProgressBar from './CircularProgressBar';
// import AnalysisCharts from './AnalysisCharts';
// import styles from './AdminDashboard.module.css';
// import LoanApplicationList from './LoansApplicationList';
// import { adminSelector, getAdminReportApiAsync } from "../../redux/adminReducer";
// import { useSelector, useDispatch } from "react-redux";


// export default function AdminDashboard() {
//   const stats = [
//     { icon: <FaTasks className={styles.icon} />, title: 'Total Loans', value: 50, color: '#30cfd0' },
//     { icon: <FaClipboardList className={styles.icon} />, title: 'Total Approved Loans', value: 30, color: '#f43b47' },
//     { icon: <FaMoneyBillWave className={styles.icon} />, title: 'Total Paid Loans', value: 70, color: '#f9c74f' },
//     { icon: <FaMoneyBillWave className={styles.icon} />, title: 'Total Profit', value: 90, color: '#90be6d' },
//   ];

//   const { loans } = useSelector(adminSelector);
//   const dispatch = useDispatch();

//   console.log("loans: ", loans)

//   useEffect(()=>{
//     dispatch(getAdminReportApiAsync());

//   },[])

//   return (
//     <div className={styles.dashboardContainer}>
//       <div className={styles.cardsWrapper}>
//         {stats.map((stat, index) => (
//           <div key={index} className={styles.card}>
//             {stat.icon}
           
//             <div className={styles.cardValue}>{stat.value}%</div>
//             <div className={styles.cardTitle}>{stat.title}</div>
//             <CircularProgressBar progress={stat.value} color={stat.color} />
//           </div>
//         ))}
//       </div>

//       <div className={styles.analysisGraphContainer}>
//         <AnalysisCharts />
//       </div>

//       <LoanApplicationList />
//     </div>
//   );
// }














import React, { useEffect } from 'react';
import { FaTasks, FaClipboardList, FaMoneyBillWave } from 'react-icons/fa';
import CircularProgressBar from './CircularProgressBar';
import AnalysisCharts from './AnalysisCharts';
import LoanApplicationList from './LoansApplicationList';
import styles from './AdminDashboard.module.css';
import { adminSelector, getAdminReportApiAsync } from "../../redux/adminReducer";
import { useSelector, useDispatch } from "react-redux";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const {loans} = useSelector(adminSelector);

  console.log("loans: ", loans);
  const { approvedLoans, pendingApprovalLoans, profit, totalApprovedLoans, totalLoans, totalPaidLoans, totalPaidPayments, totalPendingApproval} = loans;

  useEffect(() => {
    dispatch(getAdminReportApiAsync());
  }, []);

  //const profitFromInterest = profit * 0.2;

  const stats = [
    { icon: <FaTasks className={styles.icon} />, title: 'Total Loans', value: totalLoans, color: '#30cfd0' },
    { icon: <FaClipboardList className={styles.icon} />, title: 'Total Approved Loans', value: totalApprovedLoans, color: '#f43b47' },
    { icon: <FaMoneyBillWave className={styles.icon} />, title: 'Total Paid Loans', value: totalPaidLoans, color: '#f9c74f' },
    { icon: <FaMoneyBillWave className={styles.icon} />, title: 'Total Profit', value: profit, color: '#90be6d' },
  ];

  return (
    <div className={styles.dashboardContainer}>

      { loans?(
        <>
         <div className={styles.cardsWrapper}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.card}>
            {stat.icon}
            <div className={styles.cardValue}>{stat.value}</div>
            <div className={styles.cardTitle}>{stat.title}</div>
            <CircularProgressBar progress={stat.value} color={stat.color} />
          </div>
        ))}
      </div>
      
      <div className={styles.analysisGraphContainer}>
        <AnalysisCharts pendingLoansCount={pendingApprovalLoans?.length} approvedLoansCount={approvedLoans?.length} />
      </div>

      <LoanApplicationList applications={pendingApprovalLoans} />
        
        
        
        
        </>):<h1>Loading ........</h1>}
     
    </div>
  );
}






