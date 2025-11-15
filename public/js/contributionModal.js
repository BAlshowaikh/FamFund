document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("ff-contrib-modal");
    if (!modal) return; // safe if this file loads on pages without the modal

    // const modal = document.getElementById("ff-contrib-modal");
    const closeBtn = document.getElementById("ff-contrib-close");
    const form = document.getElementById("ff-contrib-form");
    const goalNameInput = document.getElementById("ff-contrib-goalName");
    const amountInput = document.getElementById("ff-contrib-amount");
    const messageInput = document.getElementById("ff-contrib-message");
    const errorBox = document.getElementById("ff-contrib-error");

    let targetAmount = 0
    let currentAmount = 0
    let goalId = null

    // Open modal when "Contribute" is clicked
    document.addEventListener("click", (e) => {
        // This is to check if when the user clicks, is the click inside the form or not "event delegation"
        // ff-contrib-btn is the class the "contribute" button has in the goal's details page 
        const btn = e.target.closest(".ff-contrib-btn");
        if (!btn) return;

        goalId = btn.dataset.goalId;
        targetAmount = parseFloat(btn.dataset.targetAmount || "0");
        currentAmount = parseFloat(btn.dataset.currentAmount || "0");

        goalNameInput.value = btn.dataset.goalTitle || "";
        amountInput.value = "";
        messageInput.value = "";
        errorBox.textContent = "";

        // set form action
        form.method = "POST"
        form.action = `/contributions/${goalId}`;

        modal.classList.remove("hidden")
    });

    // Close modal
    closeBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    // Basic amount validation on submit
    form.addEventListener("submit", (e) => {
        errorBox.textContent = "";

        const amount = parseFloat(amountInput.value || "0");
        const remaining = targetAmount - currentAmount;

        if (isNaN(amount) || amount <= 0) {
        e.preventDefault();
        errorBox.textContent = "Please enter a valid amount greater than 0.";
        return;
        }

        if (amount > targetAmount) {
        e.preventDefault();
        errorBox.textContent = `Amount cannot exceed the goal target (${targetAmount} BD).`;
        return;
        }

        if (amount > remaining) {
        e.preventDefault();
        errorBox.textContent = `Amount cannot exceed the remaining amount (${remaining} BD).`;
        return
        }
    })
})