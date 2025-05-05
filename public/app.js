document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    const newTitle = prompt("Edit task");

    if (newTitle !== null) {
      edit(id, newTitle)
        .then(() => {
          const listItem = event.target.closest("li");
          listItem.querySelector(".note-title").textContent = newTitle;
        })
        .catch((error) => {
          console.error("Error updating note:", error);
          alert("Failed to update note. Please try again.");
        });
    }
  }
});

async function edit(id, newTitle) {
  const response = await fetch(`http://localhost:3000/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: newTitle }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}
