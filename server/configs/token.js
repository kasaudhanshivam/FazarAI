import jwt from "jsonwebtoken"

export const generateToken = async (userId) => {
    try{
        const token = jwt.sign(
            // JWT has three parts :
            // 1. Header Automatically created by jwt.sign()
            {userId}, // 2. Payload (claims)
            process.env.JWT_SECRET, // 3. Signature (secret will be used for signature)

            {expiresIn: "7d"} // Options
        )

        return token;

    }catch(err){
        console.log(err)
    }
}