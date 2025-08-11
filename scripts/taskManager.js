"use strict";

import { getFormattedDate } from "./utils.js";
import { dom } from "./dom.js";

export class Task {
  constructor(taskTitle) {
    this.id = Date.now();
    this.taskTitle = taskTitle;
    this.completed = false;
    this.date = getFormattedDate(this.id);
  } 
}

export function addTask(taskTitle, taskMap) {
  const task = new Task(taskTitle);
  taskMap.set(task.id, task);
  saveTasks(taskMap);
  renderTask(task);
  addTaskEvents(task, taskMap);
}

export function renderTask(task) {
  const taskElement = document.createElement("div");
  const checkbox = document.createElement("label");
  const taskTitle = document.createElement("p");
  const infoBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  taskElement.id = task.id;
  taskElement.classList.add("task");
  
  checkbox.innerHTML = "<input type='checkbox'/><i></i>";
  checkbox.classList.add("checkbox");
  if (task.completed) {
    checkbox.querySelector("input").checked = true;
    taskElement.classList.add("completed");
    checkbox.querySelector("i").classList.add("fa-solid", "fa-check");
  }

  taskTitle.innerText = task.taskTitle;
  
  infoBtn.classList.add("info-btn");
  infoBtn.type = "button";
  infoBtn.innerHTML = "<i class='fa-solid fa-info'></i>";

  deleteBtn.classList.add("delete-btn");
  deleteBtn.type = "button";
  deleteBtn.innerHTML = "<i class='fa-solid fa-trash'></i>";

  taskElement.append(checkbox, taskTitle, infoBtn, deleteBtn);

  dom.taskContainer.append(taskElement);
}

export function deleteTask(task, taskMap) {
  const taskElement = document.getElementById(task.id);
  taskElement.remove();
  taskMap.delete(task.id);
  saveTasks(taskMap);
}

export function addTaskEvents(task, taskMap) {
  const taskElement = document.getElementById(task.id);
  const checkbox = taskElement.querySelector("label");
  const infoBtn = taskElement.querySelector(".info-btn");
  const deleteBtn = taskElement.querySelector(".delete-btn");

  checkbox.addEventListener("change", event => {
    task.completed = event.target.checked;
    taskMap.get(task.id).completed = task.completed;
    saveTasks(taskMap);
    
    if (task.completed) {
      taskElement.classList.add("completed");
      checkbox.querySelector("i").classList.add("fa-solid", "fa-check");
    } else {
      taskElement.classList.remove("completed");
      checkbox.querySelector("i").classList.remove("fa-solid", "fa-check");
    }
  });

  /*
  infoBtn.addEventListener("click", () => {
    displayInfoCard(task);
  });
  */

  deleteBtn.addEventListener("click", () => {
    deleteTask(task, taskMap);
  });
}


export function saveTasks(taskMap) {
  const taskList = Array.from(taskMap);
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

export function loadTasks() {
  try {
    const taskList = JSON.parse(localStorage.getItem("taskList"));
    return new Map(taskList);
  } catch {
    return new Map();
  }
}
