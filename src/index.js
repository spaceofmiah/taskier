// ### this file helps to incorporate interaction to app

import { Calendar, preventDefault } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';


import Task from './Task';



// document.addEventListener('DOMContentLoaded', function() {
//   var calendarEl = document.getElementById('calendar');

//   var calendar = new Calendar(calendarEl, {
//     plugins: [ dayGridPlugin ]
//   });

//   calendar.render();
// });





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
 * Retrieve DOM action emmitters
 */
let task_add_btn = get('#task-add-btn');
let close_task_modal = get("#close-task-modal");

const hide_task_modal = ( element='#new-task-modal') => {
  get(element).classList.toggle('hide');
}

task_add_btn.addEventListener('click', (e) => {
  e.preventDefault();
  hide_task_modal(`#${task_add_btn.dataset['target']}`);
});

close_task_modal.addEventListener('click', (e)=> {
  e.preventDefault();
  hide_task_modal();
});
