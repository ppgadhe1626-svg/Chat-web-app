import express from 'express'
import {signUp, logIn, getEditProfile,getUserChat, getAllUsers, getUserProfile, logOutUser} from '../controllers/userController.js'
export const user_routes = express.Router();

user_routes
.post("/sign_up", signUp)
.post("/login", logIn)
.get("/user_profile/:user_id", getUserProfile)
.get("/all_user", getAllUsers)
.get('/chat/:user_id', getUserChat) 
.put("/edit_profile", getEditProfile)
.delete("/log_out", logOutUser)
