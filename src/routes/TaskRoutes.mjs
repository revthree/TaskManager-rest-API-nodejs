import { Router } from "express";
import { IsValidId, RoleCheck, TokenCheck, ValidationResultCheck } from "../../middleware.mjs";
import { checkSchema } from "express-validator";
import { TaskCreationSchema, TaskPatchSchema } from "../../validation.mjs";
import { createTask, getAllTasks, removeTask, updateTaskDescription, updateTaskStatus, updateTaskTitle } from "../controllers/TaskController.mjs";

const router = Router()



router.post("/api/users/tasks", TokenCheck, RoleCheck("MANAGER"), checkSchema(TaskCreationSchema), ValidationResultCheck, createTask)
router.get("/api/users/tasks", TokenCheck, getAllTasks)
router.patch("/api/users/:taskId/tasks/title", TokenCheck, RoleCheck("MANAGER"), checkSchema(TaskPatchSchema), ValidationResultCheck, updateTaskTitle)
router.patch("/api/users/:taskId/tasks/description", TokenCheck, RoleCheck("MANAGER"), checkSchema(TaskPatchSchema), ValidationResultCheck, updateTaskDescription)
router.patch("/api/users/:taskId/tasks/status", TokenCheck, RoleCheck("MANAGER", "EMPLOYEE"), checkSchema(TaskPatchSchema), ValidationResultCheck, updateTaskStatus)
router.delete("/api/users/tasks/:taskId", TokenCheck, RoleCheck("MANAGER"), IsValidId, removeTask)


export default router