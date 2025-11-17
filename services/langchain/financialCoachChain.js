// Role of this file:
// 1. create the model (we're using OpenAI instance)
// 2. Add system prompt 

// Dependiences 
require("dotenv").config()
const { ChatOpenAI } = require("@langchain/openai") // Require the open ai model to connect to
//Inside the @langchain/core/messages package, you have three main message types you'll use:
    // 1. SystemMessage ⚙️
        // Data You Attach: Instructions and context.
        //What it Does: It tells the model how to behave for the entire conversation. It's usually sent only once at the start.

    // 2. HumanMessage 🧑
        // Data You Attach: The user's input/question.
        // What it Does: It represents the current turn or previous turns of input from the person using your app.

    //3. AIMessage 🤖
        //Data You Attach: The model's response.
        //What it Does: This is what you use to store the model's past replies so it remembers the context in the next turn.
const { SystemMessage, HumanMessage } = require("@langchain/core/messages"); 

// Load our API key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// ----STEP 1----- Create the model
const model = new ChatOpenAI({
    apiKey: OPENAI_API_KEY,
    model: "gpt-3.5-turbo-0301",
    maxTokens: 300, // Max no of tokens (either words, chars or any type) that the model shouldn't exceed when responding
    temperature: 0.3 //  A value between $0.0$ and $1.0$ that determines the model's creativity or randomness when selecting the next word.
})

// ----STEP 2----- System prompt
const SYSTEM_PROMPT = `
You are "FamFund Coach", a friendly financial mentor for kids and families.

Goals:
- Explain money concepts in very simple words.
- Encourage saving, planning, and smart spending.
- Always stay positive, supportive, and judgment-free.
- Keep answers short and easy to read.

Rules:
- Use simple examples in Bahraini Dinar (BD).
- Do NOT ask for or store any personal data about the child.
- When doing calculations, show the formula in a simple way.
- If the question is not about money, saving, or goals, gently bring the child back to money topics.

Examples:
- If user asks: "What is a goal?" explain it like: "A goal is something you want in the future, like a new toy or a trip. You save money step by step to reach it."
- If user asks: "How much should I save per week if my goal is 50 BD in 10 weeks?"
  say something like:
  "You can divide 50 BD ÷ 10 weeks = 5 BD per week. 
   So if you save 5 BD every week, you will reach 50 BD in 10 weeks."
`

// -----STEP 3----- Wrap up function to call from route
const runFinancialCoach = async (userMessage) => {

    // Check if there is a secret key or not
    if (!OPENAI_API_KEY) {
        throw new Error("Missing OPENAI_API_KEY in environment")
    }

    const messages = [
        new SystemMessage(SYSTEM_PROMPT),
        new HumanMessage(userMessage)
    ]

    // LangChain sends this package -messgaes- to OpenAI for processing
    const response = await model.invoke(messages)

    // Access the AI answer through the .content 
    return response.content 
}

// Exports 
module.exports = runFinancialCoach