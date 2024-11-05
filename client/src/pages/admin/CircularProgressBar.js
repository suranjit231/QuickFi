// // import React from 'react';
// // import styles from './AdminDashboard.module.css';

// // function CircularProgressBar({ progress }) {
// //   const circumference = 251.2;
// //   const offset = circumference - (progress / 100) * circumference;

// //   return (
// //     <div className={styles.progressContainer}>
// //       <svg width="100" height="100">
// //         <circle
// //           stroke="#e0e0e0"
// //           strokeWidth="8"
// //           fill="none"
// //           r="40"
// //           cx="50"
// //           cy="50"
// //         />
// //         <circle
// //           className={styles.progressCircle}
// //           r="40"
// //           cx="50"
// //           cy="50"
// //           strokeDasharray={circumference}
// //           strokeDashoffset={offset}
// //         />
// //         <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className={styles.text}>
// //           {progress}%
// //         </text>
// //       </svg>
// //     </div>
// //   );
// // }

// // export default CircularProgressBar;






// import React from 'react';
// import styles from './AdminDashboard.module.css';

// function CircularProgressBar({ progress, color }) {
//   const circumference = 251.2;
//   const offset = circumference - (progress / 100) * circumference;

//   return (
//     <div className={styles.progressContainer}>
//       <svg width="100" height="100">
//         <circle
//           stroke="#e0e0e0"
//           strokeWidth="8"
//           fill="none"
//           r="40"
//           cx="50"
//           cy="50"
//         />
//         <circle
//           className={styles.progressCircle}
//           r="40"
//           cx="50"
//           cy="50"
//           strokeDasharray={circumference}
//           strokeDashoffset={offset}
//           stroke={color} 
//         />
//         <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className={styles.text}>
//           {progress}%
//         </text>
//       </svg>
//     </div>
//   );
// }

// export default CircularProgressBar;













import React from 'react';
import styles from './AdminDashboard.module.css';

function CircularProgressBar({ progress, color }) {
  const circumference = 251.2;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={styles.progressContainer}>
      <svg width="100" height="100">
        <circle
          stroke="#e0e0e0"
          strokeWidth="8"
          fill="none"
          r="40"
          cx="50"
          cy="50"
        />
        <circle
          className={styles.progressCircle}
          r="40"
          cx="50"
          cy="50"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          stroke={color}
        />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className={styles.text}>
          {progress}%
        </text>
      </svg>
    </div>
  );
}

export default CircularProgressBar;

