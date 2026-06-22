import express from 'express'
import {userDB} from '../models/userDB.js'


export const signUp = async(req, res) =>{
    
    try {
        const {email, name, password} = req.body;
        if(!email || !name || !password){
            return res.json({
                errorMessage: "Pleases fill all the required credentials"
            })
        }
        const user = await userDB.find({email});
        // console.log({use})
        if(user.length > 0){
            return res.json({
                errorMessage: "User with this email already exists"
            })
        }
        
        const new_user = await userDB.create({name:name, email:email, password:password, status:"offline"});
        return res.json({
            message: "User added Success",
            user: new_user
        })
    } catch (error) {
        return res.json({
            errorMessage: `Par bhai wo error kya hai: ${error}`
        }) 
    }
}

export const logIn = async(req, res) =>{
    // console.log("Hu");
    try {
        const {name, password} = req.body;
        if(!name || !password){
            res.json({
                errorMessage: "Pleases fill all the required credentials"
            })
            return res;
        }
        const usr = await userDB.findOne({name});
        // console.log("Here is the name: ")
        // console.log(usr);
        if(!usr){
            res.json({
                errorMessage: "Incorrect user name"
            })
            return res;
        }
        else if(usr.password != password){
            res.json({
                errorMessage: "Incorrect password"
            })
            return res;
        }
        res.json({
            message: "User Login Credentials are correct",
            user: usr
        })
        return res;
    } catch (error) {
        return res.json({
            errorMessage: `Par bhai wo error kya hai: ${error}`
        }) 
    }
}

export const getAllUsers = async(req, res) =>{
    try {
        
        const user_arr = await userDB.find();
            
        return res.json({
            message : user_arr
        })
    } catch (error) {
        return res.json({
            errorMessage: `Chat retrival failed with the following error: ${error}`
        })
    }
}

export const getUserChat = async(req, res) =>{
    try {
        // console.log("HI")
        const {user_id} = req.params;
        if(!user_id){ 
            return res.json({
                errorMessage: "Please give a Chat Id"
            })
        }
        // console.log(user_id)
        let user_chat_id_arr = await userDB.findById(user_id).populate({
            path: 'chats',
            populate: {
                path: 'messages'
            }
        });
        user_chat_id_arr = user_chat_id_arr.chats
        // console.log(user_chat_id_arr);    
        return res.json({
            message : user_chat_id_arr
        })
    } catch (error) {
            // console.log("pHI")
        return res.json({
            errorMessage: `Chat retrival failed with the following error: ${error}`
        })
    }
}

export const getUserProfile = async(req, res) =>{
    try {
        const {user_id} = req.params;
        if(!user_id){
            return res.json({
                errorMessage: "Please give a user Id"
            })
        }
        const user = await userDB.findById(user_id);
    
        // console.log("Ahaa");
        return res.json({
            message: user
        })
    } catch (error) {
        // console.log('error');
        return res.json({
            errorMessage: `Profile retrival failed with the following error: ${error}`
        })
    }
}

export const getEditProfile = async(req, res) =>{
    
}

export const logOutUser = async(req, res) =>{
    
}
