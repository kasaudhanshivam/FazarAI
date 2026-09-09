import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './configs/connectDB.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import assistantRouter from './routes/assistant.routes.js'
import billingRouter from './routes/billing.routes.js';
import cors from 'cors'
dotenv.config();

const app = express();
app.use(express.json())
app.use(cookieParser())
const privateCors = (cors({
    // origin: "http://localhost:5173", // for local
    origin: ["https://fazarai.shivamkasaudhan.dev", "https://falconai-lilac.vercel.app"],
    credentials: true
}))


const publicCors = (cors({
    origin: "*"
}))

const PORT = process.env.PORT;


// ⭐ divided into two parts for modularity
app.get('/', // 1. ye part ata h "routes" me

    // 2. aur yaha se neeche tak ata h "controller" me
    (req, res) => {
  res.json('Hello from server!');
}); 


// Using Auth Routes
app.use("/api/auth", privateCors, authRouter)



// Using User Routes
app.use("/api/user", privateCors, userRouter)




// Using Assistant Routes
app.use("/api/assistant", publicCors, assistantRouter)




// Using Assistant Routes
app.use("/api/billing", privateCors, billingRouter)




app.listen(PORT, () => {
    console.log(`Server listening on port : ${PORT}`);
    connectDB();
})