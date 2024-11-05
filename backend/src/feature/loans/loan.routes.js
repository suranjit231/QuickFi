
import express from "express";
import LoanController from "./loan.controller.js";


const loanRoutes = express.Router();
const loanController = new LoanController();


//========= apply loans routes ================//
loanRoutes.post("/applyLoan", (req, res, next)=>{
    loanController.applyLoans(req, res, next);
});


//======== get one loans info ================//
loanRoutes.get("/getOne", (req, res, next)=>{
    loanController.findOneLoanInfo(req, res, next);
})


//======= repaymnts loan terms ==============//
loanRoutes.post("/payTerm", (req, res, next)=>{
    loanController.payLoanTerms(req, res, next);
})


export default loanRoutes;