import { Router } from "express";
import { checkSchema } from "express-validator";
import { EmployeeValidationSchema, ProfilePatchSchema, ProfileValidationSchema } from "../../validation.mjs";
import { IsValidId, RoleCheck, TokenCheck, ValidationResultCheck } from "../../middleware.mjs";
import { createUser, createProfile, profile, loginUser, logoutUser, getAllUsers, getProfile, updatePassword, updateUsername, updateProfilename, updateProfileEmail, updateProfileaddress, removeUser } from "../controllers/UserController.mjs";

const router = Router()

router.get("/", (req, res) => { return res.status(200).json({ msg : "home page"})}
)
//employee 

router.post("/api/auth/register", checkSchema(EmployeeValidationSchema), ValidationResultCheck, createUser)
router.post("/api/auth/login", checkSchema(EmployeeValidationSchema), ValidationResultCheck, loginUser)
router.get("/api/auth/logout", logoutUser)
router.get("/api/users/me", TokenCheck, IsValidId, profile)
router.get("/api/users", getAllUsers )
router.patch("/api/users/me/password", TokenCheck, IsValidId, updatePassword)
router.patch("/api/users/me/username", TokenCheck, IsValidId, updateUsername)
router.delete("/api/users/me", TokenCheck, IsValidId, removeUser)


//profile
router.post("/api/users/:empId/profile", TokenCheck, RoleCheck("EMPLOYEE", "MANAGER"), checkSchema(ProfileValidationSchema), ValidationResultCheck, createProfile)
router.get("/api/users/:empId/profile", TokenCheck, RoleCheck("EMPLOYEE", "MANAGER"), getProfile)
router.patch("/api/users/:empId/profile/name", TokenCheck, RoleCheck("EMPLOYEE", "MANAGER"), checkSchema(ProfilePatchSchema), ValidationResultCheck, updateProfilename)
router.patch("/api/users/:empId/profile/email", TokenCheck, RoleCheck("EMPLOYEE", "MANAGER"), checkSchema(ProfilePatchSchema), ValidationResultCheck, updateProfileEmail)
router.patch("/api/users/:empId/profile/address", TokenCheck, RoleCheck("EMPLOYEE", "MANAGER"), checkSchema(ProfilePatchSchema), ValidationResultCheck, updateProfileaddress)



export default router

