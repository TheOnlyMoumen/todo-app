"use strict";

export const dom = {
  get root() {return document.getElementById("root");},
  get app() {return document.getElementById("app");},
  get form() {return document.getElementById("app-form");},
  get input() {return document.getElementById("app-input");},
  get submitBtn() {return document.getElementById("app-submit-btn");},
  get taskContainer() {return document.getElementById("task-container");}
};
