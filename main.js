// Define UI Variables
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

// Load all event listeners
loadEventListeners();

// Load all event listeners - function
function loadEventListeners() {
	// DOM load event
	document.addEventListener('DOMContentLoaded', loadTasks);
	// Add task event
	form.addEventListener('submit', addTask);
	taskList.addEventListener('click', removeTask);
	clearBtn.addEventListener('click', clearTasks);
	filter.addEventListener('keyup', filterTasks);
}

// Load tasks
function loadTasks() {
	let tasks;

	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function (task) {
		// Create list item for task
		const li = document.createElement('li');
		// Add materialize class
		li.className = 'collection-item';
		// Create text node and append to li
		li.appendChild(document.createTextNode(task));

		// Create new link element
		const link = document.createElement('a');
		// Add class
		link.className = 'delete-item secondary-content';
		// Add icon html
		link.innerHTML = '<i class="fa fa-remove"></i>';
		// Append the link to the li
		li.appendChild(link);

		// Append li to ul
		taskList.appendChild(li);
	});
}

// Add Task
function addTask(e) {
	if (taskInput.value === '') {
		alert('Task cannot be empty!');
	} else {
		// Create list item for task
		const li = document.createElement('li');
		// Add materialize class
		li.className = 'collection-item';
		// Create text node and append to li
		li.appendChild(document.createTextNode(taskInput.value));

		// Create new link element
		const link = document.createElement('a');
		// Add class
		link.className = 'delete-item secondary-content';
		// Add icon html
		link.innerHTML = '<i class="fa fa-remove"></i>';
		// Append the link to the li
		li.appendChild(link);

		// Append li to ul
		taskList.appendChild(li);

		// Store in local storage
		storeTask(taskInput.value);

		// Clear input
		taskInput.value = '';
	}

	e.preventDefault();
}

// Store Task
function storeTask(task) {
	let tasks;

	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Delete task?')) {
			e.target.parentElement.parentElement.remove();

			// Remove from LS
			removeTaskLS(e.target.parentElement.parentElement);
		}
	}
}

// Remove task from local storage
function removeTaskLS(taskItem) {
	let tasks;

	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function (task, index) {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
	// clear whole HTML
	// taskList.innerHTML = '';

	// loop and remove child
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	// Clear from LS
	clearTasksLS();
}

// Clear tasks from local storage
function clearTasksLS() {
	localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
	// Get text from filter textbox
	const text = e.target.value.toLowerCase();

	document.querySelectorAll('.collection-item').forEach(function (task) {
		const item = task.firstChild.textContent;

		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	});
}
