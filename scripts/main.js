"use strict";

import * as taskManager from "./taskManager.js";
import { dom, createDropMenu, createMessage } from "./dom.js";

function main() {
  // load tasks from local storage
  const taskMap = taskManager.loadTasks();
  const dropMenu = createDropMenu();
  const message = "Hey there!<br>Ready to get things done?";

  // render the loaded tasks
  if (taskMap.size > 0) {
    dom.app.prepend(dropMenu);
    dom.form.classList.add("down");

    taskMap.forEach(task => {
      taskManager.renderTask(task);
      taskManager.addTaskEvents(task, taskMap);
    });
  } else {
    const welcomeMessage = createMessage(message);
    dom.root.prepend(welcomeMessage); 
  }

  // add a task when the form is submited 
  dom.form.addEventListener("submit", event => {
    event.preventDefault();
    const taskTitle = dom.input.value.toString().trim();
    dom.input.value = "";

    if (taskTitle !== "") {
      if (taskMap.size === 0){
        document.getElementById("welcome-message").remove();
        dom.form.classList.add("drop");
        dom.app.prepend(dropMenu);
      }
      taskManager.addTask(taskTitle, taskMap);
    }
  });
}

document.addEventListener("DOMContentLoaded", main);
