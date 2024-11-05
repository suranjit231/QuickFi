// import React from 'react';
// import { Line, Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
// import styles from './AdminDashboard.module.css';

// // Registering chart components
// ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement);

// const lineData = {
//   labels: ['Jan', 'Feb', 'Mar', 'Apr'],
//   datasets: [
//     {
//       label: 'Loans Pending Approval',
//       data: [10, 20, 30, 40],
//       borderColor: '#004733',
//       backgroundColor: 'rgba(0, 71, 51, 0.3)',
//       fill: true,
//     },
//     {
//       label: 'Approved Loans',
//       data: [5, 15, 25, 35],
//       borderColor: '#f43b47',
//       backgroundColor: 'rgba(244, 59, 71, 0.3)',
//       fill: true,
//     },
//   ],
// };

// const barData = {
//   labels: ['Jan', 'Feb', 'Mar', 'Apr'],
//   datasets: [
//     {
//       label: 'Profit',
//       data: [1000, 1500, 2000, 2500],
//       backgroundColor: '#30cfd0',
//       borderColor: '#330867',
//       borderWidth: 1,
//     },
//   ],
// };

// export default function AnalysisCharts() {
//   return (
//     <div className={styles.analysisGraphContainer}>
//       <div className={styles.lineGraphBox}>
//         <Line data={lineData} />
//       </div>
//       <div className={styles.barGraphBox}>
//         <Bar data={barData} />
//       </div>
//     </div>
//   );
// }













import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import styles from './AdminDashboard.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement);

export default function AnalysisCharts({ pendingLoansCount, approvedLoansCount }) {
  const lineData = {
    labels: [ 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Loans Pending Approval',
        data: [pendingLoansCount, pendingLoansCount + 10, pendingLoansCount + 20, pendingLoansCount + 30],
        borderColor: '#004733',
        backgroundColor: 'rgba(0, 71, 51, 0.3)',
        fill: true,
      },
      {
        label: 'Approved Loans',
        data: [approvedLoansCount, approvedLoansCount + 5, approvedLoansCount + 15, approvedLoansCount + 25],
        borderColor: '#f43b47',
        backgroundColor: 'rgba(244, 59, 71, 0.3)',
        fill: true,
      },
    ],
  };

  const barData = {
    labels: ['Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Profit',
        data: [1000, 1500, 2000, 2500],
        backgroundColor: '#30cfd0',
        borderColor: '#330867',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.analysisGraphContainer}>
      <div className={styles.lineGraphBox}>
        <Line data={lineData} />
      </div>
      <div className={styles.barGraphBox}>
        <Bar data={barData} />
      </div>
    </div>
  );
}

