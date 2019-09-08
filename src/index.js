// ### this file helps to incorporate interaction to app

import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';


import Task from './Task';



document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new Calendar(calendarEl, {
    plugins: [ dayGridPlugin ]
  });

  calendar.render();
});





/**
 * simplify the process of retrieving a DOM element
 *
 * @param element_identifier: an identifier represening the element
 * to be retrieved from DOM e.g
 *
 * for class referencing --->   .wrapper
 *
 * for id referencing    --->   #wrapper
 */
const get = element_identifier => {
  if (element_identifier.charAt(0) === "#") {
    return document.getElementById(element_identifier.slice(1));
  }

  if (element_identifier.charAt(0) === ".") {
    return document.getElementsByClassName(element_identifier.slice(1));
  }

  throw new SyntaxError("no identifying symbol e.g (# --> id or . --> class)");
};

/**
 * helps to toggle modal for adding a task
 */
const toggle_add_task_modal = () => {
  let modal = get("#add_task_modal");
  //   if (modal.classList.contains("hide")) {
  //     modal.classList.remove(".hide");
  //   }
  modal.classList.toggle("show");
};

/** Plugging event handlers to event listeners */
let add_task_modal_opener = get("#open_add_task_modal--js");
let add_task_modal_closer__lg = get("#close_add_task_modal--lg");
let add_task_modal_closer__sm = get("#close_add_task_modal--sm");
add_task_modal_opener.addEventListener("click", toggle_add_task_modal);
add_task_modal_closer__lg.addEventListener("click", toggle_add_task_modal);
add_task_modal_closer__sm.addEventListener("click", toggle_add_task_modal);