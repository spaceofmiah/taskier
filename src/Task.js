export default class Task {
	constructor() {
		let tasks = [];
	}

	/**
	 * helps to add a task to list of tasks
	 * @param {object} task
	 */
	addTask (task) {
		console.log("calling addTask method");
	};

	/**
	 * helps to remove a task from list of tasks
	 * @param {integer} taskId
	 */
	removeTask (taskId) {
		console.log("calling removeTask method");
	};

	/**
	 * helps to update a task
	 * @param {integer} taskId
	 */
	updateTask (taskId) {
		console.log("calling updateTask method");
	};

	/**
	 * helps to mark a task as completed or uncompleted.
	 * when this function is called on a completed task, it makes
	 * that task to be uncompleted
	 * @param {integer} taskId
	 */
	markTask (taskId) {
		console.log("calling markTask method");
	};
}
