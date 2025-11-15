
  const modal = document.getElementById("ff-delete-modal");
  const modalTitle = document.getElementById("ff-delete-title");
  const confirmBtn = document.getElementById("ff-delete-confirm");
  const cancelBtn = document.getElementById("ff-delete-cancel");

  let currentForm = null;

  // Attach to all delete forms
  document.querySelectorAll(".ff-delete-form").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); 

      const title = form.dataset.title;
      currentForm = form;

      modalTitle.textContent = title;
      modal.classList.remove("hidden");
    })
  })

  confirmBtn.addEventListener("click", () => {
    if (currentForm) currentForm.submit();
  })

  cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden")
  })

