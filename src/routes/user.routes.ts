import { Router, RequestHandler } from "express";
import { createUser, getUserById, readUsers, login, updateUser, deleteUser } from "../controllers/user.controllers.js";
import validateUser from "../helpers/validateUser.js";
import validateJWT from "../helpers/validateJWT.js";

const router = Router();

router.route('/users/register').post(validateUser as RequestHandler[], createUser as RequestHandler);
router.route('/users').get(readUsers as RequestHandler);
router.route('/users/:id').get(getUserById as RequestHandler).put([validateJWT, validateUser] as RequestHandler[], updateUser as RequestHandler).delete(deleteUser as RequestHandler);
router.route('/').post(login as RequestHandler);

export default router;