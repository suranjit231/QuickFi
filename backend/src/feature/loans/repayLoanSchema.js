import mongoose from "mongoose";

const repaymentSchema = new mongoose.Schema({
    loanId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Loan", required: true 
        },

    dueDate: { 
        type: Date, required: true 
    },

    status: {
         type: String, enum: ["PENDING", "PAID"],
          default: "PENDING" 
        },

    paidAmount: { type: Number, default: 0 },
    paymentDate: { type: Date }, 
});

const repaymentModel = mongoose.model("Repayment", repaymentSchema);
export default repaymentModel;
