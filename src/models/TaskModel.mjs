import mongoose from "mongoose";
import { TaskStatus } from "../../enums.mjs";

const TaskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    description : {
        type : String,
        required : true,
        unique : true
    },
    status : {
        type : String,
        required : true,
        enum : TaskStatus,
        default : TaskStatus[0]
    },
    employeeId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "EmployeeDetails"
    },
    managerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "EmployeeDetails",
        required : true
    }
},
{
    timestamps : true
})


export default mongoose.model("TaskDetails", TaskSchema)