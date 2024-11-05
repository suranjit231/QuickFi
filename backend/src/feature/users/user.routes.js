import express from "express";
import UserController from "./user.controller.js";
import isLoggedIn from "../../middleware/isLoggedIn.js";
import auth from "../../middleware/auth.middleware.js";

const userRouter = express.Router();
const userController = new UserController();


//==== user signup router =========//
userRouter.post("/signup", (req, res, next)=>{
    userController.signup(req, res, next);
});


//==== user login router =========//
userRouter.post("/login", (req, res, next)=>{
    userController.login(req, res, next);
});


//===== user passoword reset =========//
userRouter.put("/reset", (req, res, next)=>{
    userController.resetPassoword(req, res, next);
})


//===== get user info ===========//
userRouter.get("/getInfo", auth, (req, res, next)=>{
    userController.getOneUserInfo(req, res, next);
})

//==== user logout router =======//
userRouter.get("/logout", auth,  (req, res, next)=>{
    userController.logout(req, res, next);
})

userRouter.get("/checkedLoggedIn", isLoggedIn, (req, res, next)=>{
    console.log("checked logged in called");
})


export default userRouter;