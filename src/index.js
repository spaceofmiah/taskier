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
 *  This section contains code to interact with local storage object
 *  
 *  -- persisting data to local storage
 *  -- retrieving data from local storage
 *  -- clearing data on local storage
 */




/**
  * retrieve all data from the specified storage
  * @param {String} storage_name 
  *     this is more like table name in RDBMS. it specify the table
  *     whose data are to be removed
  */
 const retrieve_data = (storage_name) => {
  return JSON.parse(localStorage.getItem(storage_name));
}




 /**
  * Clears all data in the specified storage
  * @param {String} storage_name 
  *     this is more like table name in RDBMS. it specify the table
  *     whose data are to be removed
  */
const clear_data = (storage_name) => {
  localStorage.removeItem(storage_name);
}


/**
  * Persist data to the specified storage name
  * @param {Object} data 
  *     data to be persisted
  * @param {String} storage_name 
  *     this is more like table name in RDBMS. it specify the table
  *     whose data are to be removed
  */
const persist_data = ( data, storage_name="myList") => {
  let previous_data = retrieve_data(storage_name);
  if(previous_data){
    data.push(...previous_data)
  }

  // clears all old data in storage_name
  clear_data(storage_name);
  // add new data with storage_name
  localStorage.setItem(storage_name, JSON.stringify(data));
 }


 /**
  * Delete all available
  */
 const drop_db = ( ) => {
   localStorage.clear();
 }











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
    return document.querySelectorAll(element_identifier);
  }

  throw new SyntaxError("no identifying symbol e.g (# --> id or . --> class)");
};




/**
 * utility method to add task to DOM
 * @param {Object} task
 */
const add_task_to_dom = ( task ) => 
{
  let parent = document.querySelector('.task-container');

  let date = new Date(task.targetDate).toDateString();
  let tag_txt = "";


  tag_txt += task.tags.map( tag => {
    if (tag){
      return `<a href="#" class="card-tag">#${tag.trim()}</a>`;
    }else {
      console.log("tag is undefined");
    }
  });

  let task_obj = `<div class="task-card bg-${task.priority}">
     <div class="card-content">
       <h3 class="card-title">${task.title}</h3>
       <p class="card-time">
         <i class="fas fa-clock"></i>
         <span class="card-time__value">${date} &nbsp; by &nbsp; ${task.targetTime}</span>
       </p>
       <p class="card-time">
         <i class="fas fa-bell"></i>
         <span class="card-time__value">${task.reminder ? "yes" : "no" }</span>
       </p>
       <p class="card-tags">
         ${tag_txt}
       </p>
     </div>


     <span class="card-btns">
         <button class="card-btn__edit" data>
           <i class="fas fa-pen"></i>
         </button>

         <button class="card-btn__complete">
           <i class="fas fa-check"></i>
         </button>

         <button class="card-btn__delete">
           <i class="fas fa-trash"></i>
         </button>
     </span>
   </div>
  `;
 
  parent.innerHTML += task_obj;
}








/**
 * Toggles class list value of a DOM element, a two way toggler.
 * 
 * -- firstly
 *      It removes `rm_val` only if it is present in the class
 *      list of the DOM element and then adds `add_val`
 * 
 * -- secondly
 *      It removes `add_val` only if it is present in the class
 *      list of the DOM element and then adds `rm_val`
 * 
 * @param {String} element_id 
 *     unique id representing the DOM element --- ** REQUIRED **
 * @param {String} rm_val 
 *     the css class to be removed --- ** REQUIRED **
 * @param {String} add_val 
 *     the css class to be added --- ** REQUIRED **
 */
const dom_classlist_toggler = (element_id, rm_val, add_val) => {
  let element = get(`#${element_id}`);
  if (element){
    if (element.classList.contains(rm_val)){
      element.classList.remove(rm_val);
      element.classList.add(add_val)
    }
    else if (element.classList.contains(add_val)) {
      element.classList.remove(add_val);
      element.classList.add(rm_val);
    }
  }
  return false;
}










/***
 * This section contains code to automatically populate 
 * DOM list on application startup
 */


{
   let data = retrieve_data('tasks');
   if (data){
     data.map(task => {
       add_task_to_dom(task);
     });
   }
 }









/**
 * this section contains code that handles the core functionality of 
 * validation messages
 * 
 *  -- unhide validation message board
 *  -- hide validation message board
 *  -- display validation messages
 *  -- hide implementer
 */




 /**
  * Hides a validation message board, using the message_board_id 
  * parameter to access the board to be hidden. 
  * 
  * @requirements {CSS property} hide
  *     This function requires a css class named `hide` to be 
  *     present in the application css file. a simple example is
  *           
  *         .hide {
  *   
  *               display: none;
  *   
  *         }
  * 
  * @param {String} message_board_id 
  *     unique id representing the DOM element(board to be hidden)
  * 
  * @useage
  *     unhide_message_board("board_id");
  */
const unhide_message_board = ( message_board_id ) => {
  dom_classlist_toggler(message_board_id, 'hide', 'unhidden')
}


/**
  * Unhides a validation message board, using the message_board_id 
  * parameter to access the board to be hidden. 
  * 
  * @requirements {CSS property} hide
  *     This function requires a css class named `hide` to be 
  *     present in the application css file. a simple example is
  *           
  *         .hide {
  *               
  *             display: none;  
  * 
  *          }
  * 
  * @param {String} message_board_id 
  *     unique id representing the DOM element(board to be hidden)
  * 
  * @useage
  *     hide_message_board("board_id");
  */
const hide_message_board = ( message_board_id ) => {
  dom_classlist_toggler(message_board_id, 'unhidden', 'hide');
}


/**
 * Displays message to message board
 * @param {Array} msg_list 
 *     a list of string representing messages to be displayed
 *    
 * @param {String} message_board_id 
 *     unique id representing the DOM element(board to be hidden)
 */
const display_message = ( msg_list, message_board_id ) => {
  let message_board = get(`#${message_board_id}`);
  message_board.innerHTML = '';
  msg_list.forEach(message => {
    message_board.innerHTML += `${message}<br/>`
  });
}


/**
 * hides message board when message close button is clicked
 */
let message_close_btn = get('.close-msg-btn');
message_close_btn.forEach((close_btn) => {
  close_btn.addEventListener('click', () => {
    hide_message_board(close_btn.dataset.target);
  })
})









/**
 * This section contains code to:
 * 
 *  --- Toggle on and off creation of new task form
 *  --- validate form value to create task
 *  --- Creation of new task
 *  --- Updating of an already existing task 
 */



 // ***** CREATE STORAGE TO HOLD CREATED & UPDATED TASK *****


 let STORAGE = [];



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






// ****** RESET FORM VALUE ******


/**
 * Resets the value of form 
 * @param {String} form_id 
 *      unique identifier of the form to be reset
 */
const reset_form = ( form_id ) => {
    get(`#${form_id}`).reset();
}





// ****** VALIDATE FORM VALUE TO CREATE TASK ******




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




// ****** TASK CREATION HANDLER ******


/**
 * Creates a task and returns it -- serving as task creation handler.
 * @param {String} tags 
 * @param {String} due_date should hold a valid date format
 * @param {String} task_title 
 * @param {Boolean} reminder 
 * @param {String} priority 
 * @param {String} target_time
 */
const create_new_task = (tags, due_date, task_title, reminder, priority, target_time) => {
    if(!tags){
      tags = ['untagged',]      // assign a defualt tag if non is passed
    } else {
      tags = tags.split(',');     // convert string with (,) dilimeter to array
    }

    let targetDate = new Date(due_date);  // converts date string to date obj
    let creationDate = new Date();
    
    let task = new Task(
      tags, task_title, priority,reminder, 
      targetDate, creationDate, target_time
    );
    
    return task;
}





// ****** UTILIZER OF FORM VALUE VALIDATION & CREATION OF TASK ******





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
  let target_time = get("#id_task_time").value;
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

  let form_valid = validation_results[0]
  let validation_message = validation_results[1]
  
  console.log(validation_message);
  console.log(form_valid)
  /**
   * a new task will only be created if validation_response
   * is true, otherwise, nothing is done.
   */
  if (form_valid === true){
    unhide_message_board("success-message-board");
    display_message(validation_message, "success-msg-note");
    reset_form("id-task-creation-form");
    return create_new_task(
      tags, date_val, task_title, reminder, selected_priority, target_time);
  } else {
    // display erroneous validation messages
    unhide_message_board("form-message-board");
    display_message(validation_message, "form-msg-note");
  }
}



/*** TASK CREATION EVENT TRIGGERER  */

let createTaskBtn = get('#add_to_list_btn');

createTaskBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let task = process_task_form();
  if (task){
    // close task creation modal
    hide_task_modal();

     // add it to application storage and persist in local storage
     STORAGE.unshift(task);
     console.log(STORAGE);

    // adding task to DOM
    add_task_to_dom(task);

    persist_data(STORAGE, "tasks");
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
  dom_classlist_toggler('body', 'bg-black', 'bg-white');
 }



 // ***** CHANGE APPLICATION COLOR THEME ******

/**
 * changes icon on the theme button -- icon can either be a 
 * moon icon or a sun icon.
 */
 const change_theme_icon = ( ) => {
   dom_classlist_toggler('theme-icon', 'fa-sun', 'fa-moon');
 }

themeButton.addEventListener(
   'click', ( e) => {
     e.preventDefault();
     change_theme();
     change_theme_icon();
   }
)    