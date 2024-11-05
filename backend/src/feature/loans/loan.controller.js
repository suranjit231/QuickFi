
import { AppError } from "../../middleware/errorHandler.middleware.js";
import LoanRepository from "./loan.repository.js";

export default class LoanController{
    constructor(){
        this.loanRepository = new LoanRepository();
    }


    //======= apply for new loans ==============//
    async applyLoans(req, res, next){
        try{
            const userId = req.userId;

            const { amount, loanTermWeeks, interestRate } = req.body;

            const result = await this.loanRepository.applyLoan(userId, Number(amount),
             Number(loanTermWeeks), Number(interestRate) );

             if(result){
                return res.status(201).json(result);
             }


        }catch(error){
            next(error);
        }

    }


    //======== find one loans information ================//
    async findOneLoanInfo(req, res, next){
        try{
            const userId = req.userId;
            
            const result = await this.loanRepository.findOneLoanInfo(userId);

            if(result){
                return res.status(200).json(result);
            }

        }catch(error){
            console.log("error: ", error);
            next(error);
        }
    }

    //====== pain loans terns ============//
    async payLoanTerms(req, res, next){
        try{

            const { loanId, amount, dueDate  } = req.body;

            console.log("req.body in controller: ", req.body);

            if(!amount || !loanId || !dueDate){
                throw new AppError("failds to pay loans!", 401);
            }

            const result = await this.loanRepository.payLoanTerms(loanId, Number(amount), dueDate );
            if(result){
                return res.status(201).json(result);
            }

        }catch(error){
            console.log("error in controller: ", error)
            next(error);
        }
    }
}