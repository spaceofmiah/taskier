export default class Task {
	/**
	 * create a new task object.
	 * @param {Array} tag 
	 * 		An array of strings 
	 * @param {String} title 
	 * 		A string which will be used as task title
	 * @param {String} priority 
	 * 		string which represents the priority of
	 * 		a task -- value can either be ( red, green, purple )
	 * @param {Boolean} reminder 
	 * 		will trigger a 30 minutes alarm before specified due date
	 * @param {Date} dueDate 
	 * 		a date for which task is met to be completed, cannot be a
	 * 		previous date
	 * @param {Date} creationDate 
	 * 		date which task was created.
	 */
	constructor( tag, title, priority, reminder, dueDate, creationDate, ) {
		this.tags = tag;
		this.title = title;
		this.priority = priority;
		this.reminder = reminder;
		this.targetDate = dueDate;
		this.is_completed = false;
		this.timeStamp = new Date();
		this.dateCreated = creationDate;
		console.log("created successfully");
	}

	/**
	 * changes title to a new title.
	 * @param {String} newTitle 
	 * 		when an empty value is passed as newTitle, an
	 * 		exception will be raised as object's title cannot
	 * 		be an empty string
	 */
	setTitle( newTitle ) {
		this.title = newTitle;
	}

	/**
	 * changes due date to a new date.
	 * @param {Date} newDueDate 
	 * 		newDueDate cannot be a previous date, an exception
	 * 		will be raised as dueDate cannot be a previous date.
	 */
	setTargetDate( newDueDate ) {
		this.targetDate = newDueDate;
	}

	/**
	 * changes tags to a new tag.
	 * @param {Array} newTags
	 * 		An array of strings, defaults to ['untagged'] if no
	 * 		value is passed
	 */
	setTags ( newTags ) {
		this.tags = newTags; 
	} 

	/**
	 * changes the priority level of a task
	 * @param {String} newPriority 
	 * 		An exception is raised if an empty string is passed and
	 * 		if passed value is not either ( red, green, purple)
	 */
	setPriorityLevel(newPriority) {
		this.priority = newPriority;
	}

	/**
	 * changes reminder property of a task to a new value.
	 * @param {Boolean} reminder An exception is raised if value is not
	 * 		true or false.
	 */
	setReminder(reminder){
		this.reminder = reminder;
	}

	/**
	 * returns value of due date of a task in a friendly format.
	 */
	getDueDate(){
		return this.targetDate.toDateString();
	}

	/**
	 * returns value of creation date of a task in a friendly format.
	 */
	getCreationDate(){
		return this.creationDate.toDateString();
	}

	/**
	 * sets task to completed.
	 */
	completeTask(){ 
		is_completed = true;
	}
}


