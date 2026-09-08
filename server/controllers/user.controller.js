import User from '../models/user.model.js'


export const getCurrUser = async (req, res) => {
    try{
        const user = await User.findById(req.userId);
        if(!user){
            return res.status(404).json({message: "User not found!"})
        }

        return res.status(200).json(user);

    }catch(err){
        return res.status(400).json({message: `Error fetching current user : ${err}`});
    }
}


export const saveAssistant = async (req, res) => {
    try {
        const {
            assistantName,
            bussinessName,
            bussinessType,
            bussinessDescription,
            tone,
            theme,
            geminiApiKey,
            pages,
        } = req.body;

        const user = await User.findById(req.userId);
        if(!user){
            return res.status(404).json({message: "Failed to get the current user!"});
        }

        user.assistantName = assistantName;
        user.bussinessName = bussinessName;
        user.bussinessType = bussinessType;
        user.bussinessDescription = bussinessDescription;
        user.tone = tone;
        user.theme = theme;
        
        if(geminiApiKey){
            user.geminiApiKey = geminiApiKey;
        }
        user.geminiStatus = "active"
        user.pages = pages || [];

        user.isSetupComplete = true;

        await user.save();

        // console.log(user);

        return res.status(200).json({message: "Assistant Saved!", user});
        
    } catch (error) {
        return res.status(500).json({message: "Failed to save assistant!"});
    }
}