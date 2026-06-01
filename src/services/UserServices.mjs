import UserDB from "../models/EmployeeModel.mjs"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { UserRole } from "../../enums.mjs"
import mongoose from "mongoose"
import ProfileDB from "../models/ProfileModel.mjs"
import { isValidMongoId } from "../controllers/UserController.mjs"




const createUser = async (userInfo) => {
    const existingUser= await UserDB.findOne({username : userInfo.username})

    if(!existingUser){
        const encrypted = await bcrypt.hash(userInfo.password, 10)
        userInfo.password = encrypted
        const saved = await UserDB.create(userInfo)
        return (saved)
    }
    throw new Error("DuplicateKey")
    
}

const loginUser = async (userInfo) => {
    const savedUser = await UserDB.findOne({username : userInfo.username})

    if(!savedUser){
        throw new Error("UserNotFound")
    }

    const isTrue = await bcrypt.compare(userInfo.password, savedUser.password)

    if(!isTrue){
        throw new Error("Unauthorised")
    }
    const token = jwt.sign({username : savedUser.username, role : savedUser.role, id : savedUser.id}, process.env.JWT_KEY, {expiresIn : "1h"})
    return token
}



const profile = async (id) => {
    const savedUser = await UserDB.findById(id)  
    if(!savedUser){
        throw new Error("UserNotFound")
    }
    console.log(savedUser)
    return (savedUser)
}

const getAllUsers = async () => {
    const savedUsers = await UserDB.find()
    return savedUsers
    
}

const updatePassword = async (id, oldPass, newPass) => {
    const saved = await UserDB.findById(id)
    if(!saved){
        throw new Error("UserNotFound")
    }
    const isTrue = await bcrypt.compare(oldPass, saved.password)
    if(!isTrue){
        throw new Error("Unauthorised")
    }
    saved.password = await bcrypt.hash(newPass, 10)
    await saved.save()
    return (saved)
}

const updateUsername = async (id, newUsername) => {
    const saved = await UserDB.findById(id)
    if(!saved){
        throw new Error("UserNotFound")
    }

    const existingUser = await UserDB.findOne({username : newUsername})
     if(!existingUser){
        saved.username = newUsername
        saved.save()
        return (saved)
     }
     throw new Error("DuplicateKey")

    
}

//PROFILE

const createProfile = async (employeeId, profileInfo) => {
    console.log("in service")
    const employeeInfo = await UserDB.findById(employeeId)
    if(!employeeInfo){
        throw new Error("UserNotFound")
    }
    profileInfo.employeeId = employeeInfo.id
    const savedProfile = await ProfileDB.create(profileInfo)
    employeeInfo.profileId = savedProfile.id
    await employeeInfo.save()
    return {
        employeeInfo,
        savedProfile
    }
}

const getProfile = async (empId) => {
    const savedProfile = await ProfileDB.findOne({employeeId : empId })
    if(!savedProfile){
        throw new Error("UserNotFound")
    }
    return savedProfile
}

const updateProfilename = async (id, updateInfo) => {
    if(!isValidMongoId(id)){
        throw new Error("InvalidId")
    }
    const savedProfile = await ProfileDB.findOne({employeeId : id})
    if(!savedProfile){
        throw new Error("UserNotFound")
    }
    savedProfile.name = updateInfo.name
    await savedProfile.save()
    return savedProfile   
}


const updateProfileEmail= async (id, updateInfo) => {
    if(!isValidMongoId(id)){
        throw new Error("InvalidId")
    }
    const savedProfile = await ProfileDB.findOne({employeeId : id})
    if(!savedProfile){
        throw new Error("UserNotFound")
    }
    savedProfile.email = updateInfo.email
    await savedProfile.save()
    return savedProfile   
}

const updateProfileaddress= async (id, updateInfo) => {
    if(!isValidMongoId(id)){
        throw new Error("InvalidId")
    }
    const savedProfile = await ProfileDB.findOne({employeeId : id})
    if(!savedProfile){
        throw new Error("UserNotFound")
    }
    savedProfile.address = updateInfo.address
    await savedProfile.save()
    return savedProfile   
}

const removeUser = async (id) => {
    const deleted = await UserDB.findByIdAndDelete(id) //primary key
    await ProfileDB.deleteOne({ employeeId : id })  //employee mo
    if(!deleted){
        throw new Error("UserNotFound")
    }
    return deleted

    
}


export default {createUser, loginUser, profile, createProfile, getAllUsers, getProfile, updatePassword, updateUsername, updateProfilename, updateProfileEmail, updateProfileaddress, removeUser}