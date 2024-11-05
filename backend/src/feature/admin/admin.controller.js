
import AdminRepository from "./admin.repository.js";


export default class AdminController{
    constructor(){
        this.adminRepository = new AdminRepository();
    }


    async approvedLoans(req, res, next){
        try{

            const userId = req.userId;
            const loanId = req.params.loanId;

            const result = await this.adminRepository.approvedLoansByAdmin(userId, loanId);

            if(result){
                return res.status(200).json(result);
            }

        }catch(error){
            next(error);
        }
    }


    //======= reject loans application ===============//
    async rejectLoans(req, res, next){
        try{

            const userId = req.userId;
            const loanId = req.params.loanId;

            const result = await this.adminRepository.rejectLoansByAdmin(userId, loanId);

            if(result){
                return res.status(200).json(result);
            }

        }catch(error){
            next(error);
        }

    }


    //========= admin report controller =================//
    async adminReport(req, res, next){
        try{

            const result = await this.adminRepository.adminReport();
            
            if(result){
                return res.status(200).json(result);
            }


        }catch(error){
            next(error);
        }
    }
}