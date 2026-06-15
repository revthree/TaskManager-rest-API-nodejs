import { matchedData } from "express-validator"
import TaskServices from "../services/TaskService.mjs"


export const createTask = async (req, res) => {
    try{
        const saved = await TaskServices.createTask(matchedData(req), req.user.id)
        return res.status(201).json(saved)
    }catch (e){
        return res.status(500).json({
            msg : " internal server error",
            error : e.message
        })
    }    
}

export const getAllTasks = async (req, res) => {
    try{
        const tasks =await TaskServices.getAllTasks(req.query, req.user.id, req.user.role)
        return res.status(200).json(tasks)
    }catch (e){
        return res.status(500).json({
            msg : " internal server error",
            error : e.message
        })        
    }    
}

export const updateTaskTitle = async (req, res) => {
    const { taskId } = req.params
    try{
    const saved = await TaskServices.updateTaskTitle(taskId, req.user.id, matchedData(req))
        return res.status(200).json(saved)
    } catch (e) {
        if (e.message === "InvalidId") {
            return res.status(404).json({ 
                msg: e.message 
            })
        }
        if (e.message === "TaskNotFound") {
            return res.status(404).json({
                 msg: e.message 
            })
        }
        if(e.message === "Unauthorised"){
                return res.status(401).json({
                msg : e.message
            })
        }
        return res.status(500).json({
             msg: "Internal server error", 
             error: e.message 
        })
    }
}

export const updateTaskDescription = async (req, res) => {
        const { taskId } = req.params
    try{
    const saved = await TaskServices.updateTaskDescription(taskId, req.user.id, matchedData(req))
        return res.status(200).json(saved)
    } catch (e) {
        if (e.message === "InvalidId") {
            return res.status(404).json({ 
                msg: e.message 
            })
        }
        if (e.message === "TaskNotFound") {
            return res.status(404).json({
                 msg: e.message 
            })
        }
        if(e.message === "Unauthorised"){
                return res.status(401).json({
                msg : e.message
            })
        }
        return res.status(500).json({
             msg: "Internal server error", 
             error: e.message 
        })
    }
}

export const updateTaskStatus = async (req, res) => {
        const { taskId } = req.params
    try{
    const saved = await TaskServices.updateTaskStatus(taskId, req.user.id, matchedData(req))
        return res.status(200).json(saved)
    } catch (e) {
        if (e.message === "InvalidId") {
            return res.status(404).json({ 
                msg: e.message 
            })
        }
        if (e.message === "TaskNotFound") {
            return res.status(404).json({
                 msg: e.message 
            })
        }
        if(e.message === "Unauthorised"){
                return res.status(401).json({
                msg : e.message
            })
        }
        return res.status(500).json({
             msg: "Internal server error", 
             error: e.message 
        })
    }
}

export const removeTask = async (req, res) => {
    const { taskId } = req.params
    try{
        await TaskServices.removeTask(taskId, req.user.id)
        return res.status(204).json()
    }catch (e) {
        if (e.message === "TaskNotFound") {
            return res.status(404).json({
                 msg: e.message 
            })
        }
        if(e.message === "Unauthorised"){
                return res.status(401).json({
                msg : e.message
            })
        }
        return res.status(500).json({
             msg: "Internal server error", 
             error: e.message 
        })
    }    
}