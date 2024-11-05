

// import React from 'react';
// import styles from './LoanApplicationList.module.css';

// const applications = [
//   { name: 'John Doe', amount: 5000, terms: '12 months', interestRate: '5%', status: 'Pending' },
//   { name: 'Jane Smith', amount: 8000, terms: '24 months', interestRate: '4%', status: 'Approved' },
//   { name: 'Bob Johnson', amount: 3000, terms: '6 months', interestRate: '6%', status: 'Rejected' },
// ];

// export default function LoanApplicationList() {
//   return (
//     <div className={styles.loanListContainer}>
//       <h1 className={styles.loanListTitle}>Loan Applications</h1>
//       <div className={styles.tableWrapper}>
//         <table className={styles.loanTable}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Amount</th>
//               <th>Terms</th>
//               <th>Interest Rate</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {applications.map((app, index) => (
//               <tr key={index}>
//                 <td>{app.name}</td>
//                 <td>{app.amount}</td>
//                 <td>{app.terms}</td>
//                 <td>{app.interestRate}</td>
//                 <td>{app.status}</td>
//                 <td>
//                   <button className={styles.approveButton}>Approve</button>
//                   <button className={styles.rejectButton}>Reject</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {/* Card layout for small screens */}
//       <div className={styles.cardContainer}>
//         {applications.map((app, index) => (
//           <div key={index} className={styles.applicationCard}>
//             <h2>{app.name}</h2>
//             <div>Amount: ${app.amount}</div>
//             <div>Terms: {app.terms}</div>
//             <div>Interest Rate: {app.interestRate}</div>
//             <div>Status: {app.status}</div>
//             <div className={styles.actionBtnDiv}>
//               <button className={styles.approveButton}>Approve</button>
//               <button className={styles.rejectButton}>Reject</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }









  
import React from 'react';
import styles from './LoanApplicationList.module.css';
import { useDispatch } from 'react-redux';
import { loanApprovedApiAsync, loanRejectApiAsync } from '../../redux/adminReducer';
import { toast } from 'react-toastify';

export default function LoanApplicationList({ applications }) {

  //console.log("application: ", applications[0]?._id);
  const dispatch = useDispatch();

 async function handleApproverClick(loanId){
    const result = await dispatch(loanApprovedApiAsync(loanId));

    if(result.type === "loans/loanApprovedApi/fulfilled"){
      toast.success("loans approved successFully!");

    }

  }


  //-------- handle reject application click -------------//
  async function handleRejectClick(loanId){
    const result = await dispatch(loanRejectApiAsync(loanId));

    if(result.type === "loans/loanRejectApi/fulfilled"){
      toast.success("you reject the successFully!");
      
    }

  }




  return (
    <div className={styles.loanListContainer}>
      <h1 className={styles.loanListTitle}>Loan Applications</h1>
      <div className={styles.tableWrapper}>
        <table className={styles.loanTable}>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Terms</th>
              <th>Interest Rate</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications?.map((app, index) => (
              <tr key={index}>
                <td>{app.amountRequested}</td>
                <td>{app.loanTermWeeks} weeks</td>
                <td>{app.interestRate * 100}%</td>
                <td>{app.status}</td>
                <td>
                  <button onClick={()=>handleApproverClick(app?._id)}
                   className={styles.approveButton}>Approve</button>

                  <button onClick={()=>handleRejectClick(app?._id)}
                   className={styles.rejectButton}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.cardContainer}>
        {applications?.map((app, index) => (
          <div key={index} className={styles.applicationCard}>
            <h2>{app.name}</h2>
            <div>Amount: ${app.amountRequested}</div>
            <div>Terms: {app.loanTermWeeks}</div>
            <div>Interest Rate: {app.interestRate * 100}%</div>
            <div>Status: {app.status}</div>
            <div className={styles.actionBtnDiv}>
              <button className={styles.approveButton}>Approve</button>
              <button className={styles.rejectButton}>Reject</button>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}

