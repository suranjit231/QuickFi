import express from "express";
import AdminController from "./admin.controller.js";


const adminRoutes = express.Router();
const adminController = new AdminController();


//======== approved loans routes ===============//
adminRoutes.put("/approved/:loanId", (req, res, next)=>{
    adminController.approvedLoans(req, res, next);
});


//======== reject loans application ===============//
adminRoutes.put("/reject/:loanId", (req, res, next)=>{
    adminController.rejectLoans(req, res, next);
})


//======= get repostes data ======================//
adminRoutes.get("/report", (req, res, next)=>{
    adminController.adminReport(req, res, next);
})





export default adminRoutes;