import { Request , Response } from "express";
import {Role, Status, User} from "../models/userModel";
import bcrypt from "bcryptjs"

export const userRegister = async (req:Request , res:Response) => {
    try{
       const {firstName , lastName , email , password , role} = req.body
       
       if(!firstName || !lastName || !email || !password || !role){
        res.status(400).json({message : "All fileds are required"})
       }

       if(role !== Role.USER && role !== Role.AUTHOR){
        return res.status(400).json({message : "Invalid role"})
       }

       const existingUser = await User.findOne({email})

       if(existingUser){
        return res.status(400).json({message : "Email already exists"})
       }

       const hashedPassword = await bcrypt.hash(password, 10)

       const approvalStatus = role == Role.AUTHOR ? Status.PENDING : Status.APPROVED

      const newUser =  new User({
        firstName,
        lastName,
        email,
        password,
        roles: [role],
        approved : approvalStatus
       })

       await  newUser.save()

       res.status(201).json({
            message : "Successfully Registered!",
            data : {
                id:newUser._id,
                firstName:newUser.firstName,
                lastName:newUser.lastName,
                email:newUser.email,
                role:newUser.roles,
                approval:newUser.approved

            }
       })
    }catch (err : any){
        res.status(500).json({message : err?.message})
    }
}


export const userLogin = async (res:Response , req:Request) => {
    
}

export const getAll = (res:Response , req:Request) => {
    console.log("GetAll endpoint")
    res.send("Get all")
}

export const adminRegister = (res:Response , req:Request) => {
    console.log("Admin register endpoint")
}