export default class Task {
	constructor() {
		let time = '';
		let date = '';
		let tags = [];
		let title = '';
		let priority = '';
		let is_completed = false;
		console.log("created successfully");
		
	}

	updateTitle( title ) {
		console.log("setting title");
	}

	updateDate( date ) {
		console.log("setting date");
	}

	updateTags ( tags ) {
		console.log("setting tags");
	} 
	completeTask(){ 
		console.log("completing task") 
	}
}
