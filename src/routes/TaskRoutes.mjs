import { Router } from "express";
import { RoleCheck, TokenCheck } from "../../middleware.mjs";

const router = Router()



router.post("/api/users/tasks", TokenCheck, RoleCheck("MANAGER"), )


export default router