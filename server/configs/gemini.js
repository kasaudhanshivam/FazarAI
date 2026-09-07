const Gemini_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent"



export const generateGeminiResponse = async ({prompt, apiKey, user}) => {
    try {
        if(!apiKey){
            throw new Error("Gemini API key is missing!")
        }

        const response = await fetch(`${Gemini_URL}?key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            })
        })

        if(!response.ok){ // failed response

            if(response.status === 400 || response.status === 401){
                user.geminiStatus = "invalid"

                await user.save();
            }

            if(response.status === 429){
                user.geminiStatus = "quota_exceeded"

                await user.save();
            }

            const err = await response.text();
            throw new Error(err);
        }

        // Success Response
        user.geminiStatus = "active"
        await user.save();

        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if(!reply){
            throw new Error("No response from Gemini!");
        }


        return reply.trim();


    } catch (error) {
        console.error("Gemini response err : " + error.message)

        throw new Error("Gemini API fetch failed!");
    }
}