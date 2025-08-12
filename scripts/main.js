"use strict";

import * as taskManager from "./taskManager.js";
import { dom } from "./dom.js";

function main() {
  // load tasks from local storage
  const taskMap = taskManager.loadTasks();
  const dropMenu = taskManager.createDropMenu();

  // render the loaded tasks
  if (taskMap.size > 0) {
    dom.app.prepend(dropMenu);

    taskMap.forEach(task => {
      taskManager.renderTask(task);
      taskManager.addTaskEvents(task, taskMap);
    });
  }

  // add a task when the form is submited 
  dom.form.addEventListener("submit", event => {
    event.preventDefault();
    const taskTitle = dom.input.value.toString().trim();
    dom.input.value = "";

    if (taskTitle !== "") {
      if (taskMap.size === 0) dom.app.prepend(dropMenu);
      taskManager.addTask(taskTitle, taskMap);
    }
  });
}

document.addEventListener("DOMContentLoaded", main);
