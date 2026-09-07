import { generateToken } from "../configs/token.js";
import User from "../models/user.model.js"

export const googleAuth = async (req, res) => {
    try{
        
        const {name, email} = req.body;
        if(!name || !email){
            return res.status(400).json({message: "Name & Email are required!"});
        }

        let user = await User.findOne({email})
        if(!user){
            user = await User.create({
                name, email
            })
        }
        const token = await generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // (7 days in miliseconds)
        })

        return res.status(200).json(user);

    }catch(err){
        return res.status(500).json({message: `Google Auth Error: ${err}`})
    }
}

export const logOut = async (req, res) => {
    try{
        await res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        })
        return res.status(200).json({message: "User Logged Out!"})
    }catch(err){
        return res.status(500).json({message: `Logout Failed: ${err}`})
    }
}