"use strict";

export const dom = {
  get root() {return document.getElementById("root");},
  get app() {return document.getElementById("app");},
  get form() {return document.getElementById("app-form");},
  get input() {return document.getElementById("app-input");},
  get submitBtn() {return document.getElementById("app-submit-btn");},
  get taskContainer() {return document.getElementById("task-container");}
};

export function createMessage(message) {
  const wrapper = document.createElement("div");
  const content = document.createElement("h1");

  wrapper.id = "welcome-message";
  content.innerHTML = message;
  wrapper.append(content);

  return wrapper;
}

export function createDropMenu() {
  const container = document.createElement("div");
  const selectElement = document.createElement("select");
  const items = ["All", "Completed", "Uncompleted"];

  items.forEach(item => {
    const option = document.createElement("option");
    option.value = option.innerText = item;
    selectElement.append(option);
  });

  showCategory(selectElement.value);

  selectElement.addEventListener("change", event => {
    showCategory(event.target.value);
  });

  container.append(selectElement);
  container.classList.add("select");

  return container;
}

function showCategory(category) {
  const tasks = document.querySelectorAll(".task");

  tasks.forEach(task => {
    switch (category) {
      case "All":
        task.classList.remove("hidden");
        break;

      case "Completed":
        if (!task.classList.contains("completed"))
          task.classList.add("hidden");
        else task.classList.remove("hidden");
        break;

      case "Uncompleted":
        if (task.classList.contains("completed"))
          task.classList.add("hidden");
        else task.classList.remove("hidden");
        break;
    }
  });
}

export function createInfoCard(task) {
  const cardElement = document.createElement("div");
  const cardContent = document.createElement("div");
  const exitBtn = document.createElement("button");
  const taskStatus = task.completed ?
    "<i class='fa-solid fa-check'></i> Completed" :
    "<i class='fa-solid fa-xmark'></i> Uncompleted";

  cardContent.innerHTML = `
    <div>
      <p><b>Creation date</b></p>
      <p>${task.date}</p>
    </div>
    <div>
      <p><b>Title</b></p>
      <p>${task.taskTitle}</p>
    </div>
    <div>
      <p><b>ID</b></p>
      <p>${task.id.toString()}</p>
    </div>
    <div>
      <p><b>Status</b></p>
      <p class='status'>${taskStatus}</p>
    </div>
  `;

  exitBtn.innerHTML = "<i class='fa-solid fa-xmark'></i>";
  exitBtn.classList.add("exit-btn");
  cardContent.append(exitBtn);
  cardContent.classList.add("info-card-content");
  cardElement.append(cardContent);
  cardElement.classList.add("info-card");

  return cardElement;
}
