const taskInput = document.querySelector('#task');
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearTask = document.querySelector('.clear-tasks');
const filterTask = document.querySelector('#filter');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearTask.addEventListener('click', clearTasks);
  // Filter tasks event
  filterTask.addEventListener('keyup', filterTasks);
}

// Get Tasks from Local Storage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (data) {
    const task = document.createElement('li');
    task.className = 'collection-item';
    task.appendChild(document.createTextNode(data));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    task.appendChild(link);

    taskList.appendChild(task);
  });
}

// Add Tasks
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  }

  const task = document.createElement('li');
  task.className = 'collection-item';
  task.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  task.appendChild(link);

  taskList.appendChild(task);

  storeTaskInLocalStorage(taskInput.value);

  taskInput.value = '';

  e.preventDefault();
}

// Store Tasks
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Tasks
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
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
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearTasksFromLocalStorage();
}

// Clear Tasks from Local Storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
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
