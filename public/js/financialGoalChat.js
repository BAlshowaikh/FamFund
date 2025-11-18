// Select all the required elements
const launcher = document.getElementById("ff-coach-launcher")
const panel = document.getElementById("ff-coach-panel")
const closeBtn = document.getElementById("ff-coach-close")
const form = document.getElementById("ff-coach-form") // This is the input field for user, treated as a POST form
const input = document.getElementById("ff-coach-input") // Where the user types
const messagesPanel = document.getElementById("ff-coach-messages") // Messages will be rendered here 

// If we're on a page that doesn't have the chat UI, just stop
if (!launcher || !panel || !closeBtn || !form || !input || !messagesPanel) {
  console.warn("Financial Coach UI not found on this page.")
} else {

  // Keep last 6 exchanges (kid + coach)
  const history = []

  // Function to show the messages for the UI design
  const renderMessages = () => {
    messagesPanel.innerHTML = ""
    // Only show the last 6 messages overall
    const lastMessages = history.slice(-6)

    lastMessages.forEach((msg) => {
      const wrapper = document.createElement("div")
      wrapper.classList.add("ff-coach-message-row")

      const bubble = document.createElement("div")
      bubble.classList.add("ff-coach-bubble")
      bubble.classList.add(
        msg.role === "kid"
          ? "ff-coach-bubble--kid"
          : "ff-coach-bubble--coach"
      )

      bubble.textContent = msg.text
      wrapper.appendChild(bubble)
      messagesPanel.appendChild(wrapper)
    })

    messagesPanel.scrollTop = messagesPanel.scrollHeight
  }

  // Function for adding the message to history
  const addMessage = (role, text) => {
    history.push({ role, text })
    renderMessages()
  }

  // Initial friendly greeting from the coach
  addMessage(
    "coach",
    "Hi there! I’m your FamFund Coach. Ask me about saving for your goals!"
  )

  // Show / hide panel
  launcher.addEventListener("click", () => {
    panel.classList.add("ff-coach-panel--open")
  })

  closeBtn.addEventListener("click", () => {
    panel.classList.remove("ff-coach-panel--open")
  })

  // Handle form submit (kid sends a message)
  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const text = input.value.trim() // take the user message
    if (!text) return

    // Show kid message immediately
    addMessage("kid", text)
    input.value = "" // clear the input value

    try {
      // Send message to backend
      const res = await fetch("/financialCoach/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      })

      // Check the returned status code
      if (!res.ok) {
        addMessage(
          "coach",
          "Hmm, I’m having trouble talking right now. Can you try again in a bit?"
        )
        return
      }

      // If ok fetch returned data
      const data = await res.json()
      const reply =
        data.reply ||
        "I’m not sure, but I’ll try my best to help you save!"

      addMessage("coach", reply)

    } catch (err) {
      console.error("Error talking to financial coach:", err)
      addMessage(
        "coach",
        "Oops! Something went wrong while answering. Can you try again?"
      )
    }
  })
}
