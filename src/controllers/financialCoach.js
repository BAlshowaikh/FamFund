// Require the service to create the model

const { runFinancialCoach } = require("../../services/langchain/financialCoachChain.js")

// Get the user's 
exports.reply_user_get = async (req, res) => {
    try{
        const userMessage = req.body.message
        // Check if the user has sent a message
        // and check if the sent message is a string or not
        if (!userMessage || typeof userMessage !== "string"){
            return res.status(400).json({ error: "Message is required and should be as a string"})
        }

        // If the user input is okay call the function to create and send the info to the model
        const reply = await runFinancialCoach(userMessage);

        res.json({reply})

    }catch(error){
        console.error("From Financial Coach:", error)
        res.status(500).json( {error: "Something went wrong talking to the financial coach."} )
    }
}

