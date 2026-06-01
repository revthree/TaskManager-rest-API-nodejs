import { matchedData } from "express-validator"
import UserServices from "../services/UserServices.mjs"
import { token } from "morgan"
import mongoose from "mongoose"


export  const isValidMongoId = (id) => {
    if(!mongoose.Types.ObjectId.isValid(id)){
        return false
    }
    return true
}

export const createUser = async (req, res) => {
    try{
        
        const saved = await UserServices.createUser(matchedData(req))
        return res.status(201).json(saved)
        
    }catch (e){
        if(e.message === "DuplicateKey"){
            return res.status(400).json({
                msg : "username already exists"
            })
        } 
        return res.status(500).json({
            msg : " internal server error",
            error : e.message
        })

    }
    
}

export const loginUser = async (req, res) => {
    try{
        const token = await UserServices.loginUser(matchedData(req))
        res.cookie("authToken", token, {maxAge: 60*60*1000})
        return res.status(200).json({
            msg : "login success!"
        })
    }catch(e){
        if(e.message === "UserNotFound"){
            return res.status(404).json({
                msg : e.message
            })
        }
        if(e.message === "Unauthorised"){
            return res.status(401).json({
                msg : e.message
            })
        }
         return res.status(500).json({
            msg : " internal server error",
            error : e.message
        })
    }
}


export const logoutUser = (req, res) => {
    res.clearCookie("authToken")
    return res.status(200).json({
        msg : "logged out"
    })
}

export const profile = async (req, res) => {
    try{
        
    const saved = await UserServices.profile(req.user.id)  
    return res.status(200).json({
        msg : "my profile",
        saved
    })

    }catch(e){
            if(e.message === "UserNotFound"){
                return res.status(404).json({
                msg : e.message
            })
            return res.status(500).json({
                msg : " internal server error",
                error : e.message
        })
    }

}}

export const getAllUsers = async (req, res) => {
    const saved = await UserServices.getAllUsers()
    return res.status(200).json(saved)
}

export const updatePassword = async (req, res) => {
    const {oldPass, newPass} = req.body
    try{
        const updated = await UserServices.updatePassword(req.user.id, oldPass, newPass)
        return res.status(200).json(updated)
    }catch(e){
        if(e.message === "UserNotFound"){
                return res.status(404).json({
                msg : e.message
            })
        }
        if(e.message === "Unauthorised"){
                return res.status(401).json({
                msg : e.message
            })
        }
        return res.status(500).json({
                msg : " internal server error",
                error : e.message
        })
    }    
}

export const updateUsername = async (req, res) => {
    const {newUsername} = req.body
    const id = req.user.id
    try{
        const updated = await UserServices.updateUsername(id, newUsername)
        return res.status(200).json(updated)        
    }catch(e){
            if(e.message === "UserNotFound"){
                return res.status(404).json({
                msg : e.message
            })
            if(e.message === "DuplicateKey"){
            return res.status(400).json({
                msg : "username already exists"
            })
            } 
            return res.status(500).json({
            msg : " internal server error",
            error : e.message
             })
    }    
}}

//PROFILE

export const createProfile = async (req, res) => {
    console.log("in contro")
    const {empId} = req.params
    try{
        const saved = await UserServices.createProfile(empId, matchedData(req))
        return res.status(201).json(saved)
    }catch(e){
        if(e.message === "UserNotFound"){
                return res.status(404).json({
                msg : e.message
            })
        }
        if(e.message === "ProfileExists"){
                return res.status(404).json({
                msg : e.message
            })
        }
        return res.status(500).json({
                msg : " internal server error",
                error : e.message
        })
            
}
}

export const getProfile = async (req, res) => {
    const {empId} = req.params
    try{
        const saved = await UserServices.getProfile(empId)
        return res.status(200).json(saved)
    }catch(e){
        if(e.message === "UserNotFound"){
                return res.status(404).json({
                msg : e.message
            })
        }
         return res.status(500).json({
                msg : " internal server error",
                error : e.message
        })     
}    
}

export const updateProfilename = async (req, res) => {
     const {empId} = req.params
     try{
        const saved = await UserServices.updateProfilename(empId, matchedData(req))
        return res.status(200).json(saved)
     }catch(e){
        
             if(e.message === "InvalidId"){
                return res.status(404).json({
                msg : e.message
            })
            }
            if(e.message === "UserNotFound"){
                return res.status(404).json({
                msg : e.message
            })
            }
         return res.status(500).json({
                msg : " internal server error",
                error : e.message
            })     
    }    
}


export const updateProfileEmail = async (req, res) => {
     const {empId} = req.params
     try{
        const saved = await UserServices.updateProfileEmail(empId, matchedData(req))
        return res.status(200).json(saved)
     }catch(e){
        
             if(e.message === "InvalidId"){
                return res.status(404).json({
                msg : e.message
            })
            }
            if(e.message === "UserNotFound"){
                return res.status(404).json({
                msg : e.message
            })
            }
         return res.status(500).json({
                msg : " internal server error",
                error : e.message
            })     
    }    
}

export const updateProfileaddress = async (req, res) => {
     const {empId} = req.params
     try{
        const saved = await UserServices.updateProfileaddress(empId, matchedData(req))
        return res.status(200).json(saved)
     }catch(e){
        
             if(e.message === "InvalidId"){
                return res.status(404).json({
                msg : e.message
            })
            }
            if(e.message === "UserNotFound"){
                return res.status(404).json({
                msg : e.message
            })
            }
         return res.status(500).json({
                msg : " internal server error",
                error : e.message
            })     
    }    
}

export const removeUser = async (req, res) => {
    try{
        await UserServices.removeUser(req.user.id)
        res.clearCookie("authToken")
        return res.status(204)

    }catch(e){
          if(e.message === "UserNotFound"){
                return res.status(404).json({
                msg : e.message
            })
        }
         return res.status(500).json({
                msg : " internal server error",
                error : e.message
        })

    }
}

