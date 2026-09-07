import { generateGeminiResponse } from "../configs/gemini.js";
import User from "../models/user.model.js"


export const getAssistantConfig = async (req, res) => {
    try {
        const {userId} = req.params;

        // console.log(userId)

        const user = await User.findById(userId).select("-geminiApiKey") // except api key
        if(!user){
            return res.status(400).json({message: "Unable to get user!"});
        }

        return res.status(200).json({message: "User fetched!", user})
    } catch (error) {
        return res.status(500).json({message : `Error fetching user : ${error}!`})
    }
}




export const askAssistant = async (req, res) => {
    try {
        const {message, userId} = req.body;

        if(!message || !userId){
            return res.status(400).json({message: "Message & UserId are required!"});
        }

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({message: "User not found!"})
        }
        
        if(!user.geminiApiKey){
            return res.status(400).json({message: "Gemini API key is missing!"})
        }

        if(user.plan === "free" && user.totalMessages >= user.requestLimits){
            return res.status(400).json({message: "Free plan limit reached! Upgrade to pro plan."});
        }

        if(user.plan === "pro" && new Date(user.proExpiresAt) < new Date()){
            user.plan == "free"
            await user.save();

            return res.status(400).json({message: "Pro plan expired!"});
        }


        const cleanedMessage = message.toLowerCase();

        let matchedPage = null;
        if(user.enableNavigation){



            const navigationWords = [
                "open",
                "go",
                "go to",
                "start",
                "show",
                "navigate",
                "take me"
            ];


            const wantsNavigation = navigationWords.some((word) => cleanedMessage.startsWith(word));


            if(wantsNavigation){

                matchedPage = user.pages.find((page) => 
                    page.keywords.some((keyword) => 
                        cleanedMessage.includes(keyword.toLowerCase())
                    )
                )
            };

            if(matchedPage){

                if(req.body.currentPath === matchedPage){  // already on the page
                    return res.json({
                        success: true,
                        response: `${matchedPage.name} already opened!`
                    })
                }




                // opening
                return res.status(200).json({
                    success: true,
                    action: "navigate",
                    path: matchedPage.path,
                    response: `Opening ${matchedPage.name}...`
                })


            }

        }




        const prompt = `
            You are ${user.assistantName}.

            Business Name:
            ${user.bussinessName}

            Business Type:
            ${user.bussinessType}

            Business Description:
            ${user.bussinessDescription}

            Assistant Tone:
            ${user.tone}

            Rules:

            - Keep replies under 15 words
            - Give fast direct responses
            - Talk naturally
            - Behave like smart voice assistant
            - Avoid long explanations
            - Keep responses short for quick voice playback

            User Question:
            ${message}
        `


        const aiReply = await generateGeminiResponse({prompt, apiKey: user.geminiApiKey, user})

        if(user.plan = "free"){
            user.totalMessages += 1;
            await user.save();
        }

        return res.status(200).json({
            success: true,
            aiReply
        });



    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Assistant Error"
        })
    }
}