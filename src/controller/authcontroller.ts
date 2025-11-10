import { Request , Response } from "express";
import {Role, Status, User , IUser} from "../models/userModel";
import bcrypt from "bcryptjs"
import { signAccessToken } from "../util/token";
import { AuthRequest } from "../middlewares/auth";

export const userRegister = async (req:Request , res:Response) => {
    try{
       const {firstName , lastName , email , password , role} = req.body
       
       //data validation
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

       const approvalStatus = role === Role.AUTHOR ? Status.PENDING : Status.APPROVED

      const newUser =  new User({
        firstName,
        lastName,
        email,
        password : hashedPassword,
        roles: [role],
        approved : approvalStatus
       })

       await  newUser.save()

       res.status(201).json({
            message : role === Role.AUTHOR ? "Author registered successfully. waiting for approval"
                    : "User registered successfully",
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
    try{
        const {email , password} = req.body

        const existingUser = await User.findOne({email})
        if(!existingUser){
            return res.status(401).json({message : "Invalid credintials!"})
        }

        const valid = await bcrypt.compare(password , existingUser.password)
        if(!valid){
            return res.status(401).json({message : "Invalid credintials!"})
        }

        const accessToken = signAccessToken(existingUser)

        res.status(200).json({
            message : "success",
            data: {
                email : existingUser.email,
                roles : existingUser.roles,
                accessToken
            }
        })
    }catch(err : any){
        res.status(500).json({message : err?.message})
    }
    
}

export const getAll = async (req:AuthRequest , res:Response) => {

   if(!req.user){
    return res.status(401).json({message : "Unauthorized"})
   }

   const userId = req.user.sub
   const user = 
   ((await User.findById(userId).select("-password")) as IUser) || null

   if(!user){
    return res.status(404).json({message : "User not found"})
   }

   const {firstName , lastName , email , roles , approved} = user

   res.status(200).json({
    message: "ok",
    data : {firstName , lastName , email , roles , approved}
   })

}

export const adminRegister = (res:Response , req:Request) => {
    console.log("Admin register endpoint")
}