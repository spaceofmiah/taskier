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
 * This application needs a storage to keep created tasks
 * so they can be accessed at a later date, to handle this,
 * browser's localStorage will be used.
 * 
 * This section contains code to:
 * 
 *  --- persist created tasks to local storage
 *  --- retrieve persisted tasks 
 */


 // structure to house created tasks

let STORAGE = [];




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




// ****** CREATION OF NEW TASK ******


let createTaskBtn = get('#add_to_list_btn');

/**
 * Validates submitted form values. This raises an exception if 
 * form values doesn't pass validation process. 
 * 
 * @param {String} title 
 *     required form value. If empty an exception is raised
 * @param {Date} date
 *     required form value. If empty an exception is raised.
 *     If value of this form field is having a previous date
 *     an exception is also raised.
 * @param {String} priority
 *     required form value. If empty an exception is raised.
 *     value of this field can either be 
 * 
 *        -- red
 * 
 *        -- green
 * 
 *        -- purple
 * 
 *     anything aside this will make an exception to be raised.
 * @returns {Array} --> [ Boolean, Array ]
 *     returns true and a success message if validation is
 *     successful, otherwise, returns false and a list of error
 *     messages that made validation not to be succesful.
 */
const validate_form_values = ( title, date, priority) => {
  let message_list = [];

  if(!title){
    message_list.push("title has no value");
  }

  if(!date) {
    message_list.push("kindly choose a Due date");
  }
  else{
    /*
     *  If date is not filled, validate the date to 
     *  make sure it's not a prior date.
     */
    let date_obj = new Date(date);
    let present_date = new Date();

    if(date_obj < present_date){
      message_list.push(
        "Invalid Due Date -- Due Date cannot be a previous date"
      )
    }
  }

  if(!priority){
    message_list.push("no priority choosen, kindly choose a priority");
  }
  else {
    if (priority !== "red" && priority !== "purple" && priority !== "green"){
      message_list.push("priority not known, invalid priority");
    }
  }

  if(message_list.length > 0){
    return [false, message_list];
  }
  return [true, ["success",]];
}


/**
 * Creates a task and returns it -- serving as task creation handler.
 * @param {String} tags 
 * @param {String} due_date this string should hold a valid date format
 * @param {String} task_title 
 * @param {Boolean} reminder 
 * @param {String} priority 
 */
const create_new_task = (tags, due_date, task_title, reminder, priority) => {
    if(!tags){
      tags = ['untagged',]      // assign a defualt tag if non is passed
    } else {
      tags = tags.split(',');     // convert string with (,) dilimeter to array
    }

    let targetDate = new Date(due_date);  // converts date string to date obj
    let creationDate = new Date();
    
    let task = new Task(
      tags, task_title, priority,reminder, targetDate, creationDate
    );
    
    return task;
}




/**
 * retrieves task creation form field values, call validation method
 * on the retrived values and if validation passes, calls task 
 * creation handler, passing the values retrieved from form field.
 * 
 * After all the process are completed successfully, this function
 * will return the created task
 */
const process_task_form = ( ) => {
  let all_priority = document.getElementsByName('priority');
  let task_title = get('#id_task_title').value;
  let date_val = get('#id_task_date').value;
  let reminder = get('#id_reminder').checked;
  let tags = get('#id_task_tags').value;
  let selected_priority = '';

  all_priority.forEach( ele => {
    let element = get(`#${ele.id}`);

    if (element.checked){
      selected_priority = element.value;
    }
  });
  

  /**
   * retrieve validation results which is an array
   * whose first element ( at index 0 ) is a boolean
   * and the last element ( at index 1 ) is an array 
   */

  let validation_results = validate_form_values(
    task_title, date_val, selected_priority);

  let validated = validation_results[0]
  let validation_message = validation_results[1]
  
  console.log(validation_message);
  console.log(validated)
  /**
   * a new task will only be created if validation_response
   * is true, otherwise, nothing is done.
   */
  if (validated === true){
    return create_new_task(
      tags, date_val, task_title, reminder, selected_priority);
  } else {
    // display erroneous validation messages
  }
}

createTaskBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let task = process_task_form();
  if (task){
    // add it to application storage and persist in local storage
    STORAGE.unshift(task);
  }
});







/**
 * This section contains code to:
 * 
 *  --- Change application color theme
 *  --- Change application theme icon
 */



 // ***** CHANGE APPLICATION COLOR THEME ******
 let themeButton = get('#theme-btn');


/**
 * changes background color theme -- theme color can either 
 * be black or white.
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



 // ***** CHANGE APPLICATION COLOR THEME ******

/**
 * changes icon on the theme button -- icon can either be a 
 * moon icon or a sun icon.
 */
 const change_theme_icon = ( ) => {
   let themeIcon = get('#theme-icon');
   if (themeIcon.classList.contains('fa-sun')){
     themeIcon.classList.remove('fa-sun');
     themeIcon.classList.add('fa-moon');
   }
   else if (themeIcon.classList.contains('fa-moon')){
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
   }
 }

themeButton.addEventListener(
   'click', ( e) => {
     e.preventDefault();
     change_theme();
     change_theme_icon();
   }
)    