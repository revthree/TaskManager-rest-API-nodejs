import TaskDB from "../models/TaskModel.mjs"
import UserDB from "../models/EmployeeModel.mjs"
import { UserRole } from "../../enums.mjs"
import { isValidMongoId } from "../controllers/UserController.mjs"


const createTask = async (taskInfo, id) => {
    const newTask = {
        managerId : id,
        ...taskInfo
    }
    const savedTask = await TaskDB.create(newTask)
    return savedTask  
}

const getAllTasks = async ({page = 1, status}, id, role) => {
    //pagenation
    let filters = {}
    const limit = 4

    if(status){
        filters.status = status
    }
    if(UserRole[1] === role){
        filters.managerId = id
    }else{
        filters.employeeId = id
    }

    const totalDocuments = await TaskDB.countDocuments(filters)
    const totalPages = await Math.ceil(totalDocuments/limit)

    if(page > totalPages || page < 1){
        page = 1
    }
    const skip = (page-1)*limit
    const tasks = await TaskDB.find(filters).limit(limit).skip(skip)

    return {
        totalPages, page, totalDocuments, data : tasks, 
    }    


    // if(role === UserRole[1]){
    //    return await TaskDB.find({managerId : id}) 
    // }else{
    //     return await TaskDB.find({employeeId : id})
    // }
    throw new Errpr("Unauthorised")
}

const updateTaskTitle = async (taskId, managerId, updateInfo) => {
    if (!isValidMongoId(taskId)) throw new Error("InvalidId")
    const task = await TaskDB.findById(taskId)
    if (!task){
        throw new Error("TaskNotFound")    
    }
    if(task.managerId.toString() !== managerId){
        throw new Error("Unauthorised")
    } 
    task.title = updateInfo.title
    await task.save()
    return task
}

const updateTaskDescription = async (taskId, managerId, updateInfo) => {
     if (!isValidMongoId(taskId)) throw new Error("InvalidId")
    const task = await TaskDB.findById(taskId)
    if (!task){
        throw new Error("TaskNotFound")    
    }
    if(task.managerId.toString() !== managerId){
        throw new Error("Unauthorised")
    } 
    task.description = updateInfo.description
    await task.save()
    return task    
}

const updateTaskStatus = async (taskId, managerId, updateInfo) => {
     if (!isValidMongoId(taskId)) throw new Error("InvalidId")
    const task = await TaskDB.findById(taskId)
    if (!task){
        throw new Error("TaskNotFound")    
    }
    if(task.managerId.toString() !== managerId){
        throw new Error("Unauthorised")
    } 
    task.status = updateInfo.status
    await task.save()
    return task    
}

const removeTask = async (taskId, managerId) => {
    const task = await TaskDB.findById(taskId)
    if (!task){
        throw new Error("TaskNotFound")    
    }
    if(task.managerId.toString() !== managerId){
        throw new Error("Unauthorised")
    } 
    
    await TaskDB.findByIdAndDelete(task.id)    
}




export default {createTask, getAllTasks, updateTaskTitle, updateTaskDescription, updateTaskStatus, removeTask}