export default class Task {
	/**
	 * Task object
	 */
	constructor() {
		let tags;
		let title;
		let priority;
		let reminder;
		let targetDate;
		let dateCreated;
		let is_completed;
		console.log("created successfully");
	}

	updateTitle( title ) {
		console.log("setting title");
	}

	updateTargetDate( date ) {
		console.log("setting target date");
	}

	updateDateCreated( date ){
		console.log("setting creation date")
	}

	updateTags ( tags ) {
		console.log("setting tags");
	} 

	updatePriorityLevel(priority) {
		console.log("setting priority");
	}

	updateReminder(reminder){
		console.log("setting reminder")
	}

	completeTask(){ 
		console.log("completing task") 
	}
}
