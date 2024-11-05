import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    contact:{ type:String, required:true},
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    loans:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Loan"

        }
    ],
    createdAt: { type: Date, default: Date.now },
  });
  
  const userModel = mongoose.model("User", userSchema);
  export default userModel;
  