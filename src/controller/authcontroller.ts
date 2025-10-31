import { Request , Response } from "express";
import {User} from "../models/authModel";

export const userRegister = (res:Response , req:Request) => {
    console.log("User register endpoint")
}

export const userLogin = (res:Response , req:Request) => {
   console.log("Login endpoint")
}

export const getAll = (res:Response , req:Request) => {
    console.log("GetAll endpoint")
    res.send("Get all")
}

export const adminRegister = (res:Response , req:Request) => {
    console.log("Admin register endpoint")
}