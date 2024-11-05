import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    amountRequested: { type: Number, required: true },
    loanTermWeeks: { type: Number, required: true }, 
    interestRate: { type: Number, required: true },
    status: { type: String, enum: ["PENDING", "APPROVED", "REJECTED", "PAID"], default: "PENDING" },
    createdAt: { type: Date, default: Date.now },
    totalAmountWithInterest: { type: Number, required: true },
    amountPerTerm:{type:Number, required:true},
    scheduledRepayments: [
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Repayment"
      },
    ],
  });



  
  const loanModel = mongoose.model("Loan", loanSchema);
  export default loanModel;
  