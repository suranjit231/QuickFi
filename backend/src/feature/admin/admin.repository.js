import loanModel from "../loans/loanSchema.js";
import userModel from "../users/userSchema.js";
import { AppError } from "../../middleware/errorHandler.middleware.js";
import repaymentModel from "../loans/repayLoanSchema.js";


export default class AdminRepository{
       //========= approved loans by admin =====================//
       async approvedLoansByAdmin(userId, loanId){
        try{
            const user = await userModel.findOne({_id:userId});

            if(user &&  user?.role === "admin"){
                //----- approved the loans --------//
                const loanDocs = await loanModel.findOne({_id:loanId});
                if(!loanDocs){
                    throw new AppError("Invalid loans no loans found", 404);
                }

                loanDocs.status = "APPROVED";
                const savedLoan = await loanDocs.save();

                const data = await this.adminReport();


                return { success:"loans approved to customer", data:data};


            }else{
                throw new AppError("You are not authorized to apprroved the loans", 401);

            }

        }catch(error){
            throw error;
        }
    }




     //========= approved loans by admin =====================//
     async rejectLoansByAdmin(userId, loanId){
        try{
            const user = await userModel.findOne({_id:userId});

            if(user &&  user?.role === "admin"){
                //----- approved the loans --------//
                const loanDocs = await loanModel.findOne({_id:loanId});
                if(!loanDocs){
                    throw new AppError("Invalid loans no loans found", 404);
                }

                loanDocs.status = "REJECTED";
                const savedLoan = await loanDocs.save();

                const data = await this.adminReport();


                return { success:"loans approved to customer", data:data};


            }else{
                throw new AppError("You are not authorized to reject the loans", 401);

            }

        }catch(error){
            throw error;
        }
    }


    //=========== finds analysis reports ================//
     //=========== Admin Loan Report ================//
     async adminReport() {
        try {
            const totalLoans = await loanModel.countDocuments();
            const totalApprovedLoans = await loanModel.countDocuments({ status: "APPROVED" });
            const totalPaidLoans = await loanModel.countDocuments({ status: "PAID" });
            const totalPendingApproval = await loanModel.countDocuments({ status: "PENDING" });
            const totalPaidPayments = await repaymentModel.countDocuments({ status: "PAID" });

            const approvedLoans = await loanModel.find({ status: "APPROVED" });
            const pendingApprovalLoans = await loanModel.find({ status: "PENDING" });

           
            const paidLoanList = await loanModel.find({status:"PAID"});

            const totalRequestMaid = paidLoanList.reduce((acc, item)=> acc + item?.amountRequested, 0)


            const TotalPaidTerms = await repaymentModel.aggregate([
                { $match: { status: "PAID" } },
                { $group: { _id: null, totalProfit: { $sum: "$paidAmount" } } }
            ]);

          

            const totalRevenue = TotalPaidTerms.reduce((acc, value)=> acc + value?.totalProfit, 0)

            const profit = totalRevenue - totalRequestMaid;

           

            const report = {
                totalLoans,
                totalApprovedLoans,
                totalPaidLoans,
                totalPendingApproval,
                totalPaidPayments,
                profit: profit || 0,
                approvedLoans,
                pendingApprovalLoans,
                // Additional metrics can be added as needed
            };

            return { success: true, data: report };
        } catch (error) {

            console.log("error in report: ", error);
            throw new AppError("Failed to generate report", 500);
        }
    }
}


