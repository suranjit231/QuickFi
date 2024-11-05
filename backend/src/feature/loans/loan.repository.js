
// import mongoose from "mongoose";
// import loanModel from "./loanSchema.js";
// import userModel from "../users/userSchema.js";
// import { AppError } from "../../middleware/errorHandler.middleware.js";
// import repaymentModel from "./repayLoanSchema.js";

// export default class LoanRepository {

//     async applyLoan(userId, amount, loanTermWeeks, interestRate = 0.05) {
//         try {

//             const user = await userModel.findById(userId);
            
//             if(!user){
//                 throw new AppError("Invalid user please signin", 404);
//             }

//             // Check if the user has any active loans that are not fully repaid
//             const activeLoan = await loanModel.findOne({
//                 userId,
//                 status: { $in: ["PENDING", "APPROVED"] }
//             });

//             if (activeLoan) {
//                 // If an active loan is found, return an error indicating that the user cannot apply for a new loan
//                 throw new AppError("You already have an active loan that must be fully repaid before applying for a new one.", 400);
//             }


//             const weeklyInterest = amount * interestRate;
//             const totalInterest = weeklyInterest * loanTermWeeks;
//             const totalAmountWithInterest = amount + totalInterest;

//             // If no active loan exists, proceed to create a new loan
//             const newLoan = new loanModel({
//                 userId,
//                 amountRequested: amount,
//                 loanTermWeeks,
//                 interestRate,
//                 status: "PENDING", 
//                 createdAt: new Date(),
//                 totalAmountWithInterest:totalAmountWithInterest,
//             });

//             const savedLoan = await newLoan.save();

            
//             user.loans.push(savedLoan._id);
//             const savedUser = await user.save();

//             const loanDetails = this.calculateLoanDetails(amount, loanTermWeeks, interestRate);

//             //======== loans cteate ingo return =============//
//             return { 
//                 success:true,
//                 message:"Your loans applied sucessfully",
//                 loans:{
//                     userId: user._id,
//                     loanId: savedLoan._id,
//                     status: savedLoan.status,
//                     createdAt: savedLoan.createdAt,
//                     amountRequested: loanDetails.amountRequested,
//                     loanTermWeeks: loanDetails.loanTermWeeks,
//                     interestRate: loanDetails.interestRate,
//                     totalInterest: loanDetails.totalInterest,
//                     totalAmountWithInterest: loanDetails.totalAmountWithInterest,
//                     weeklyRepayment: loanDetails.weeklyRepayment,
//                     scheduledRepayments: loanDetails.repayments,
                   
//                 }
//              }

//         } catch (error) {
//             throw error;
//         }
//     }


//     //========== pay loan terms repo ========================================================//
//     async payLoanTerms(loanId, amount, dueDate ){
//         try{


//             const loan = await loanModel.findOne({_id:loanId});

//             if(!loan){
//                 throw new AppError("No loans is found with your credential", 404);
//             }

//             if(loan?.status === "PAID" || loan.totalAmountWithInterest===0){
//                 throw new AppError("Your all loans are already paid", 404);
//             }

//             //const repaymentDocs = await repaymentModel.find({loanId:loanId});

//             const newPayment = new repaymentModel({
//                 loanId:loanId,
//                 paidAmount:amount,
//                 dueDate:new Date(dueDate),
//                 status:"PAID",
//                 paymentDate:new Date()

//             })

//             const savedPayment = await newPayment.save();

//             loan.totalAmountWithInterest = loan.totalAmountWithInterest - amount;

//             if(loan.totalAmountWithInterest === 0){
//                 loan.status = "PAID";
//             }
//             loan.scheduledRepayments.push(savedPayment);
//             await loan.save();

//             const response = await this.findOneLoanInfo(loan.userId);

//             if(response){
//                 return { success:true, message:"Loan paid successfully", loan:response};
//             }


//         }catch(error){
//             console.log("error in pay loan repo: ", error)
//             throw error;

//         }
//     }



//     //=========== Method to find one loan information by user ID ============================//
//     async findOneLoanInfo(userId) {
//         try {
//             // Fetch the loan associated with the user ID
//             const loan = await loanModel.findOne({ userId }).populate("scheduledRepayments");
//             console.log("repayments informations loan: ", loan)
            
//             // Check if the loan exists
//             if (!loan) {
//                 throw new AppError("No loan found for this user.", 404);
//             }

//             // Calculate loan details if they are not stored in the loan document
//             const loanDetails = this.calculateLoanDetails(
//                 loan.amountRequested,
//                 loan.loanTermWeeks,
//                 loan.interestRate
//             );

//             // Return the loan information along with calculated details
//             return {
//                 userId: loan.userId,
//                 loanId: loan._id,
//                 status: loan.status,
//                 createdAt: loan.createdAt,
//                 amountRequested: loanDetails.amountRequested,
//                 loanTermWeeks: loanDetails.loanTermWeeks,
//                 interestRate: loanDetails.interestRate,
//                 totalInterest: loanDetails.totalInterest,
//                 totalAmountWithInterest: loanDetails.totalAmountWithInterest,
//                 weeklyRepayment: loanDetails.weeklyRepayment,
//                 scheduledRepayments: loanDetails.repayments,
//             };
//         } catch (error) {
//             throw error;
//         }
//     }



//     //========== utiality functions for calculeting loans interset details =========//
//     calculateLoanDetails(amount, loanTermWeeks, interestRate) {
//         const weeklyInterest = amount * interestRate;
//         const totalInterest = weeklyInterest * loanTermWeeks;
//         const totalAmountWithInterest = amount + totalInterest;

//         const repaymentAmount = totalAmountWithInterest / loanTermWeeks;
//         const repayments = [];

//         for (let i = 0; i < loanTermWeeks; i++) {
//             const dueDate = new Date();
//             dueDate.setDate(dueDate.getDate() + (7 * (i + 1)));  // Each repayment is weekly

//             repayments.push({
//                 dueDate,
//                 amountDue: repaymentAmount,
//                 status: "PENDING",
//                 paidAmount: 0
//             });
//         }

//         return {
//             amountRequested: amount,
//             loanTermWeeks,
//             interestRate,
//             totalInterest,
//             totalAmountWithInterest,
//             weeklyRepayment: repaymentAmount,
//             repayments
//         };
//     }
// }












import loanModel from "./loanSchema.js";
import repaymentModel from "./repayLoanSchema.js";
import userModel from "../users/userSchema.js";
import { AppError } from "../../middleware/errorHandler.middleware.js";

export default class LoanRepository {
    async applyLoan(userId, amount, loanTermWeeks, interestRate = 0.02) {
        try {
            console.log(`amount: ${amount} - loanTermWeeks ${loanTermWeeks}`)
            const user = await userModel.findById(userId);
            if (!user) throw new AppError("User not found. Please sign in.", 404);

            const activeLoan = await loanModel.findOne({
                userId,
                status: { $in: ["PENDING", "APPROVED"] }
            });

            if (activeLoan) throw new AppError("Active loan found. Complete repayment before applying again.", 400);

            const loanDetails = this.calculateLoanDetails(amount, loanTermWeeks, 0.02);

            const newLoan = new loanModel({
                userId,
                amountRequested: Number(amount),
                loanTermWeeks:Number(loanTermWeeks),
                interestRate:0.02,
                status: "PENDING",
                totalAmountWithInterest:Number(loanDetails.totalAmountWithInterest),
                amountPerTerm: Number(loanDetails.amountPerTerm),
            });

            const savedLoan = await newLoan.save();
            user.loans.push(savedLoan._id);
            await user.save();

            return {
                success: true,
                message: "Loan applied successfully",
                loan: { ...loanDetails, loanId: savedLoan._id }
            };
        } catch (error) {
            throw error;
        }
    }

    async payLoanTerms(loanId, amount, dueDate) {
        try {
            const loan = await loanModel.findById(loanId).populate("scheduledRepayments");
            if (!loan) throw new AppError("Loan not found.", 404);

            if (loan.status === "PAID") throw new AppError("Loan is already fully paid.", 400);

            const newPayment = new repaymentModel({
                loanId,
                paidAmount: amount,
                dueDate,
                status: "PAID",
                paymentDate: new Date()
            });
            await newPayment.save();

            loan.totalAmountWithInterest -= amount;
            if (loan.totalAmountWithInterest <= 0) {
                loan.status = "PAID";
                loan.totalAmountWithInterest = 0; // Prevent negative total
            }

            loan.scheduledRepayments.push(newPayment._id);
            await loan.save();

            const updateData = await this.findOneLoanInfo(loan.userId);
            return { success: true, message: "Loan installment paid successfully", loan: updateData };
        } catch (error) {
            throw error;
        }
    }

    async findOneLoanInfo(userId) {
        try {
            const loan = await loanModel.findOne({ userId }).populate("scheduledRepayments");
            if (!loan) throw new AppError("No loan found for this user.", 404);

            const remainingTerms = loan.loanTermWeeks - loan.scheduledRepayments.length;
                     console.log(`loan: ${loan} -`)


           // const div = loan.scheduledRepayments.length === 0 ? 1 : loan.scheduledRepayments.length;

           const totalAmountPaid = loan.scheduledRepayments.reduce((acc, pay)=> acc + pay.
           paidAmount, 0)

           
        let paidPerIns = totalAmountPaid / loan.scheduledRepayments.length;

        let int = loan.amountRequested * loan.loanTermWeeks * loan.interestRate;
        let intPaidPer = int / loan.loanTermWeeks;

        let orgPaid = paidPerIns - intPaidPer;

        console.log("orgPaid: ", orgPaid);

        const MainPassAblearg = loan.amountRequested - (orgPaid * loan.scheduledRepayments.length);
        console.log("MainPassAblearg: ", MainPassAblearg);


            const loanDetails = this.calculateLoanDetails(MainPassAblearg, remainingTerms, loan.interestRate, loan.amountPerTerm
            );

            console.log("loansDetails: ", loanDetails)

            loanDetails.totalAmountWithInterest = loan.totalAmountWithInterest;
            loanDetails.amountRequested = loan.amountRequested;
            loanDetails.totalInterest = int;

            return {
                ...loanDetails,
                userId,
                loanId: loan._id,
                status: loan.status,
                createdAt: loan.createdAt,
                scheduledRepayments: loan.scheduledRepayments
            };
        } catch (error) {
            throw error;
        }
    }

    calculateLoanDetails(amount, loanTermWeeks, interestRate, payAblePerTerm) {
        const totalInterest = amount * interestRate * loanTermWeeks;
        const totalAmountWithInterest = amount + totalInterest;
        const amountPerTerm = totalAmountWithInterest / loanTermWeeks;

        const repayments = Array.from({ length: loanTermWeeks }, (_, i) => ({
            dueDate: new Date(Date.now() + (i + 1) * 7 * 24 * 60 * 60 * 1000),
            amountDue:  payAblePerTerm,
            status: "PENDING",
            paidAmount: 0
        }));

        return {
            amountRequested: amount,
            loanTermWeeks,
            interestRate,
            totalInterest,
            totalAmountWithInterest,
            amountPerTerm, // Term amount is calculated and returned here
            repayments
        };
    }
}





















