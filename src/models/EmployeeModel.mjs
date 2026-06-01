import mongoose from "mongoose";
import { UserRole } from "../../enums.mjs";

const EmployeeSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        enum : UserRole,
        default : UserRole[0]
    },
    profileId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "ProfileDetails"
    }
},
{
    timestamps : true
})

export default mongoose.model("EmployeeDetails", EmployeeSchema)