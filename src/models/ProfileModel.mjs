import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    address : {
        type : String
    },
    employeeId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "EmployeeDetails",
        unique : true,
        required : true
    }
},
{
    timestamps : true
})

export default mongoose.model("ProfileDetails", ProfileSchema)