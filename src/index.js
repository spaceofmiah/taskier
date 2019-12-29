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
 * This section contains code to:
 * 
 *  --- Toggle on and off creation of new task form
 *  --- Creation of new task
 *  --- Updating of an already existing task
 */


 // ***** TOGGLE ON AND OFF FORM FOR CREATING NEW TASK  *****
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


/**
 * This section contains code to:
 * 
 *  --- Change application color theme
 */



 // ***** CHANGE APPLICATION COLOR THEME ******
 let themeButton = get('#theme-btn');


/**
 * helps to change background color theme, which can either be
 * black or white
 */
 const change_theme = () => {
   let body = document.querySelector('body');
   if (body.classList.contains('bg-black')){
    body.classList.remove('bg-black');
    body.classList.add('bg-white');
   }
   else if (body.classList.contains('bg-white')) {
    body.classList.remove('bg-white');
    body.classList.add('bg-black');
   }
 }

themeButton.addEventListener(
   'click', ( e) => {
     e.preventDefault();
     change_theme();
   }
)