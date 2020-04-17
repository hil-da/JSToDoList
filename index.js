// Selecting the elements
const clear = document.querySelector('.clear');
const list = document.getElementById('list');
const input = document.getElementById('input');

// Variables
let LIST, id;

// Get item from local storage
let data = localStorage.getItem('TODO');

// Checking if the data is empty
if (data) {
	LIST = JSON.parse(data);
	console.log('hej');
	id = LIST.length; // Setting the id to the last item in the list
	loadList(LIST); // Load the list to the user interface
} else {
	// if data isn't empty
	LIST = [];
	id = 0;
}

// Load the items to the user's interface
function loadList(array) {
	array.forEach(function (item) {
		addToDo(item.name, item.id, item.done, item.trash)
	});
}

// clear the local storage
clear.addEventListener("click", function () {
	localStorage.clear();
	location.reload();
});

// Class names
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';

// Add a ToDo function
function addToDo(toDo, id, done, trash) {
	if (trash) {
		return;
	}

	const DONE = done ? CHECK : UNCHECK;
	const LINE = done ? LINE_THROUGH : '';
	const item = ` 
		<li class="item">
			<i class="fa ${DONE} complete" job="complete" id="${id}"></i>
			<p class='text ${LINE}'>${toDo}</p>
			<i class="fa fa-trash-o delete" job="delete" id="${id}"></i>
		</li>
	`;

	const position = 'beforeend';
	list.insertAdjacentHTML(position, item);
}

// Add an item to the list using the enter key  
document.addEventListener('keyup', function (event) {
	if (event.keyCode == 13) {
		const toDo = input.value;

		// If the input is not empty
		if (toDo) {
			addToDo(toDo, id, false, false);
			LIST.push({
				name: toDo,
				id: id,
				done: false,
				trash: false
			});
			// Add item to local storage (this code must be added where the LIST array is updated)
			localStorage.setItem('TODO', JSON.stringify(LIST));
			id++;
		}
		input.value = '';
	}
})

// Complete task
function completeToDo(element) {
	element.classList.toggle(CHECK);
	element.classList.toggle(UNCHECK);
	element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);
	LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Remove task
function removeToDo(element) {
	element.parentNode.parentNode.removeChild(element.parentNode);
	LIST[element.id].trash = true;
}

// Target the items created dynamically
list.addEventListener('click', function (event) {
	const element = event.target; // return the clicked element inside the list
	const elementJob = element.attributes.job.value; //complete or delete

	if (elementJob == 'complete') {
		completeToDo(element);
	} else if (elementJob == 'delete') {
		removeToDo(element);
	}
	// Add item to local storage (this code must be added where the LIST array is updated)
	localStorage.setItem('TODO', JSON.stringify(LIST));
});
