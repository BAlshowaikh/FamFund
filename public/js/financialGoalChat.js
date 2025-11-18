// public/js/financialGoalChat.js

document.addEventListener("DOMContentLoaded", () => {
  const launcher = document.getElementById("ff-coach-launcher")
  const panel = document.getElementById("ff-coach-panel")
  const closeBtn = document.getElementById("ff-coach-close")
  const form = document.getElementById("ff-coach-form")
  const input = document.getElementById("ff-coach-input")
  const messagesEl = document.getElementById("ff-coach-messages")

  // If we're on a page that doesn't have the chat UI, just stop
  if (!launcher || !panel || !closeBtn || !form || !input || !messagesEl) {
    return
  }

  // Keep last 3 exchanges (kid + coach)
  const history = []

  const renderMessages = () => {
    messagesEl.innerHTML = "";
    // Only show the last 3 messages overall
    const lastMessages = history.slice(-3)

    lastMessages.forEach((msg) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("ff-coach-message-row");
      wrapper.classList.add(
        msg.role === "kid" ? "ff-coach-message-row--kid" : "ff-coach-message-row--coach"
      )

      const bubble = document.createElement("div");
      bubble.classList.add("ff-coach-bubble");
      bubble.classList.add(
        msg.role === "kid" ? "ff-coach-bubble--kid" : "ff-coach-bubble--coach"
      )

      bubble.textContent = msg.text;

      wrapper.appendChild(bubble);
      messagesEl.appendChild(wrapper);
    })

    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  const addMessage = (role, text) => {
    history.push({ role, text });
    renderMessages();
  }

  // Initial friendly greeting from the coach (counts as 1 message)
  addMessage(
    "coach",
    "Hi there! I’m your FamFund Coach. Ask me about saving for your goals!"
  )

  // Show / hide panel
  launcher.addEventListener("click", () => {
    panel.classList.add("ff-coach-panel--open");
  })

  closeBtn.addEventListener("click", () => {
    panel.classList.remove("ff-coach-panel--open");
  })

  // Handle form submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    // Show kid message immediately
    addMessage("kid", text);
    input.value = "";

    try {
      // Call your existing backend route
      const res = await fetch("/financialCoach/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        addMessage(
          "coach",
          "Hmm, I’m having trouble talking right now. Can you try again in a bit?"
        );
        return;
      }

      const data = await res.json();
      const reply = data.reply || "I’m not sure, but I’ll try my best to help you save!";
      addMessage("coach", reply)

    } catch (err) {
      console.error("Error talking to financial coach:", err);
      addMessage(
        "coach",
        "Oops! Something went wrong while answering. Can you try again?"
      )
    }
  })
})
