import jwt from "jsonwebtoken"

export const isAuth = async (req, res, next) => {
    try{
        const token = req.cookies.token
        if(!token){
            return res.status(400).json({message: "Token not found!"})
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        if(!verifyToken){
            return res.status(400).json({message: "Invalid token!"})
        }

        req.userId = verifyToken.userId
        next()
    }catch(err){
        return res.status(500).json({message: `Auth error : ${err}`})
    }
}