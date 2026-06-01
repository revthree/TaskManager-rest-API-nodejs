import { UserRole } from "./enums.mjs"

//Employee
export const EmployeeValidationSchema = {
    username : {
        notEmpty : {
            errorMessage : "username cant be empty"
        }
    },
    password : {
        notEmpty : {
            errorMessage : "password cant be empty "
        },
        isLength : {
            options : {
                min : 8,
                max : 15
            },
            errorMessage : "Must be bw 8-15"
            
        }
    },
    role : {
        notEmpty : {
            errorMessage : " role cannot be empty"
        },
        isIn : {
            options : [UserRole],
            errorMessage : "must have a valid role"
        },
        optional : true
    },
    profileId : {
       optional: {
        options: {
            nullable: true
        }
    }
    }
}

export const EmployeePatchSchema = {
        username : {
            optional : true,
            notEmpty : {
            errorMessage : "username cannot be empty "
        }
    },
    password : {
        optional : true,
        notEmpty : {
            errorMessage : "Password cannot be empty"
        },
        isLength : {
            options : {
                min : 8,
                max : 15
            },
            errorMessage : "Must be bw 8-15"
            
        }
    },
    role : {
        notEmpty : {
            errorMessage : " role cannot be empty"
        },
        isIn : {
            options : [UserRole],
            errorMessage : "must have a valid role"
        },
        optional : true
    },
     profileId : {
        notEmpty : {
            errorMessage : "must have a profile ID"
        },
        optional : true
    }
}

//Profile
export const ProfileValidationSchema = {
    name : {
        notEmpty : {
            errorMessage : "name cant be empty"
        }
    },
    email : {
        notEmpty : {
            errorMessage : "email cant be empty "
        },
        isEmail : {
            errorMessage : "Must be a valid email"            
        },
        normalizeEmail : true
    },
    address : {
        notEmpty : {
            errorMessage : "adress cannot be empty"
        },
        optional : true
    },
    EmployeeeId : {
        notEmpty : {
            errorMessage : "must have a employee ID"
        },
        optional : true
    }
}

export const ProfilePatchSchema = {
    name : {
        notEmpty : {
            errorMessage : "name cant be empty"
        },
        optional : true
    },
    email : {
        notEmpty : {
            errorMessage : "email cant be empty "
        },
        isEmail : {
            errorMessage : "Must be a valid email"            
        },
        optional : true,
        normalizeEmail : true
    },
    address : {
        notEmpty : {
            errorMessage : "adress cannot be empty"
        },
        optional : true
    },
    EmployeeeId : {
        notEmpty : {
            errorMessage : "must have a employee ID"
        },
        optional : true
    }
}