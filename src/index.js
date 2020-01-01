/**
 * this file helps to incorporate interaction to app. This file is
 * structured using sections and each section have a distinct responsibility
 * it handles. Sections are numbered
 * 
 * Below is an index of all sections:
 * 
 * SECTION 1        ------    CREATE UTILITY METHOD
 * 
*/ 


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
 * 
 *                          SECTION 1
 * ================================================================
 * ================================================================
 * 
 *                    CREATE UTILITY METHODS
 * 
 *  This section contains code to interact with local storage object
 *  
 *  -- persisting data to local storage
 *  -- retrieving data from local storage
 *  -- clearing data on local storage
 * 
 * ================================================================
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
  * @param {Object} app_storage 
  *     stores data for usage
  * @param {Object} data
  *     the new data to be add to storage
  * @param {String} db_name 
  *     this is more like table name in RDBMS. it specify the table
  *     whose data are to be removed
  */
const persist_data = ( app_storage, data,  db_name="tasks") => {
  let previous_data = retrieve_data(db_name);
  let result;

  if(previous_data){
    // if there are existing data in storage (localStorage)
    // include those data to the new data which is to be 
    // persisted

    /**
      * Add it to application storage and persist in local storage
      * 
      * To make sure a task is not duplicated in storage, we'll have
      * to 
      * 
      *   -- filter existing storage and only return those task whose
      *      id is not equal the id of the task to be added
      *      if a task id equals the id of the task to be added, then
      *      that task will not be in the result set returned after
      *      filtering
      * 
      *   -- add the task to be add.
      */
     
    result = previous_data.filter(item => item.id != data.id);
    result.unshift(data);

    // console.log(result);
    app_storage = [...result];
    console.log("app-storage\n", app_storage)
  } else {
    app_storage.unshift(data);
    console.log("app-storage\n", app_storage)
  }

  // remove all existing data ( old data ) from database
  clear_data(db_name);

  // add new data to the specified storage name
  localStorage.setItem(db_name, JSON.stringify(app_storage));
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
 * @param {Object} task an instance of Task class
 */
const update_task_dom = ( storage ) => 
{
  let parent = document.querySelector('.task-container');
  let task_obj;

  storage.forEach(task => {
    let date = new Date(task.targetDate).toDateString();
    let tag_txt = "";

    if(task.tags){
      tag_txt += task.tags.map( tag => {
        if (tag){
          return `<a href="#" class="card-tag">#${tag.trim()}</a>`;
        }else {
          console.log("tag is undefined");
        }
      });
    }

    task_obj = `<div class="task-card bg-${task.priority}">
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
         <button class="card-btn__edit edit-task-btn" data-task="${task.id}">
           <i class="fas fa-pen"></i>
         </button>

         <button class="card-btn__complete complete-task-btn" data-task="${task.id}">
           <i class="fas fa-check"></i>
         </button>

         <button class="card-btn__delete trash-task-btn" data-task="${task.id}">
           <i class="fas fa-trash"></i>
         </button>
     </span>
   </div>
  `;

  })

  

  
 
  parent.innerHTML += task_obj;
}







/* PRIORITY */
 //*    with regards this application is used to 
 //*    define the order of task in terms of importance
 //*    and relevance.

 

/**
 * Iterates through priority form fields (which are radio button) 
 * and returns only the field (DOM element) that is checked.
 */
const dom_checked_priority_iterator = () => {
  let all_priority = document.getElementsByName('priority');
  let returning_element;

  all_priority.forEach( ele => {
    let element = get(`#${ele.id}`);
    element.checked === true ? returning_element = element : "";
  });

  return returning_element;
}



const dom_priority_value_iterator = (value) => {
  let all_priority = document.getElementsByName('priority');

  let returning_element;
  all_priority.forEach( ele => {
    let element = get(`#${ele.id}`);
    element.value.trim() === value.trim() ? returning_element = element : "";
  });

  return returning_element;
}










/**
 * inserts the values of an existing task into task form field
 * @param {Object} task an instance of a task
 */
const populate_task_form = (task) => {
  /**
   * retrieve all form fields and set values
   */

  if(task){

    // setting existing task title to form field
    get("#id_task_title").value = task.title;

    /**
     * setting existing task date to form field
     * accepted format is `yyyy-MM-dd`
     */
    let date = new Date(task.targetDate).toISOString().substring(0, 10);
    get("#id_task_date").value = date;

    // setting existing task time to form field
    get("#id_task_time").value = task.targetTime;
    
    // setting existing task tags to form field
    let tag_txt = "";
    task.tags.forEach((tag, index) => {
      /**
       * it is important that tags are separated with comma (,)
       * when populating them.
       */
      if(index > 0){
        tag_txt += `,${tag}`;
      }else {
        tag_txt += tag;
      }
    });
    get("#id_task_tags").value = tag_txt;

    // setting existing task priority to form field
    let priority_element = dom_priority_value_iterator(task.priority);
    priority_element.checked = true;


    // setting existing task reminder to form field
    get("#id_reminder").checked = task.reminder;


    // setting task id to form field dataset
    get("#id-task-creation-form").dataset['task_id'] = task.id;
  }
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



 /***
 * This section contains code to automatically populate 
 * DOM list on application startup
 */


{
  let data = retrieve_data('tasks');
  if (data){
    STORAGE = [...data];
    if (data){
      data.map(task => {
        update_task_dom(STORAGE);
      });
    }
  }
}






// ****** UPDATING A TASK ******





/**
 * Query storage and return task whose id is 
 * supplied only when it is found.
 * 
 * @param {String} task_id unique id for a task
 * 
 * @returns {Array}  Boolean and Task or String
 * 
 * if task is found in storage using the given id
 * an array of True and the found Task is returned else
 * False and a String message is returned.
 */

const retrieve_task = ( task_id ) => {

  let result;

  STORAGE.forEach(task => {
    if(task.id === task_id){
      result = [true, task];
    }
  });

  if (result){
    return result;
  }

  return [false, 'no task with id found'];
}









/**
 * EDITING A TASK
 * 
 *  -- retrieve the task that is to be edited
 *  -- populate update form with the current value of the task
 *  -- when form is submitted, the updated value is persisted.
 */



const task_update_handler = ( ) => {
  let edit_task_btn = document.querySelectorAll(".edit-task-btn");

  edit_task_btn.forEach( edit_btn  => {
    edit_btn.addEventListener('click', (e) => {
      e.preventDefault();
  
  
      let query_response = retrieve_task(edit_btn.dataset.task);
      if (query_response[0] === true ){
        toggle_task_modal_visibility();
        populate_task_form(query_response[1]);
      }
  
    });
  });
}










 // ***** TOGGLE ON AND OFF FORM FOR CREATING NEW TASK  *****


let task_add_btn = get('#task-add-btn');
let close_task_modal = get("#close-task-modal");

const toggle_task_modal_visibility = ( element='#new-task-modal') => {
  get(element).classList.toggle('hide');
}

task_add_btn.addEventListener('click', (e) => {
  e.preventDefault();
  toggle_task_modal_visibility(`#${task_add_btn.dataset['target']}`);
});

close_task_modal.addEventListener('click', (e)=> {
  e.preventDefault();
  toggle_task_modal_visibility();
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




/**
 * Updates an existing task object ( retrieved by the passed `task_id`) with
 * submitted form data.
 * @param {String} task_id representing a task unique identifier
 * @param {Object} form_data key & value pairs of form submitted data
 */
const update_task = ( task_id, form_data ) => {
  let task = retrieve_task(task_id);
  
  
  // update retrieved task
  task.tags = form_data.form_tag;
  task.title = form_data.form_title;
  task.targetDate = form_data.form_data;
  task.targetTime = form_data.form_title;
  task.reminder = form_data.form_reminder;
  task.priority = form_data.form_priority; 
  task.timeStamp = form_data.form_timestamp;

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
  
  let task_title = get('#id_task_title').value;
  let target_time = get("#id_task_time").value;
  let date_val = get('#id_task_date').value;
  let reminder = get('#id_reminder').checked;
  let tags = get('#id_task_tags').value;
  let selected_priority = dom_checked_priority_iterator().value;
  

  let is_update;
  let form_dataset_task_id = get("#id-task-creation-form").dataset.task_id;
  delete get("#id-task-creation-form").dataset.task_id;

  if(form_dataset_task_id) {
    if(form_dataset_task_id != "" && form_dataset_task_id.length > 0) {
      is_update = true;
    }
  }
  

  /**
   * retrieve validation results which is an array
   * whose first element ( at index 0 ) is a boolean
   * and the last element ( at index 1 ) is an array 
   */

  let validation_results = validate_form_values(
    task_title, date_val, selected_priority
  );

  let form_valid = validation_results[0]
  let validation_message = validation_results[1]

  /**
   * a new task will only be created if validation_response
   * is true, otherwise, nothing is done.
   */
  if (form_valid === true){


    /**
     * A task form can either be used for updating an existing task
     * or creating a new task. 
     * 
     * There is need to check if the form submitted is either for 
     * task update or task creation.
     */
    
    
    unhide_message_board("success-message-board");
    reset_form("id-task-creation-form");
    let task = create_new_task(
      tags, date_val, task_title, reminder, selected_priority, target_time);

    if(is_update){
      task.id = form_dataset_task_id;
      display_message(validation_message, "success-msg-note");
    } else {
      display_message(validation_message, "success-msg-note");
    }

    return task;
    
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
    toggle_task_modal_visibility();

    persist_data(STORAGE, task,  "tasks");

    // add updating handler
    task_update_handler();
  }

  // adding task to DOM
  update_task_dom(STORAGE);
  document.location.reload();
});


// one time call
task_update_handler();
















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