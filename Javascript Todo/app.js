const taskList = document.getElementById("task-list");
const addTaskButton = document.getElementById("add-task-button");
const newTaskInput = document.getElementById("new-task");
let tasks = [];

// Load tasks from local storage
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  renderTasks();
}

addTaskButton.addEventListener("click", () => {
  const newTaskName = newTaskInput.value;
  if (!newTaskName) {
    alert("Please enter a task name");
    return;
  }
  addTask(newTaskName);
  renderTasks();
  newTaskInput.value = "";
});

function addTask(taskName) {
  const task = {
    id: Date.now(),
    name: taskName,
    completed: false,
  };
  tasks.push(task);
  saveTasks();
  return task;
}

function toggleTaskComplete(id) {
  const task = getTaskById(id);
  task.completed = !task.completed;
  saveTasks();
  return task;
}

function editTaskName(id, newName) {
  const task = getTaskById(id);
  task.name = newName;
  saveTasks();
  return task;
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
}

function getTaskById(id) {
  return tasks.find((task) => task.id === id);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.textContent = task.name;
    if (task.completed) {
      taskItem.classList.add("completed");
    }

    // Add click event listener to toggle completed status
    taskItem.addEventListener("click", () => {
      toggleTaskComplete(task.id);
      taskItem.classList.toggle("completed");
    });

    // Add double-click event listener to edit task name
    taskItem.addEventListener("dblclick", () => {
      const newTaskName = prompt("Enter new task name", task.name);
      if (newTaskName) {
        editTaskName(task.id, newTaskName);
        taskItem.textContent = newTaskName;
      }
    });

    // Add context menu event listener to delete task
    taskItem.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      deleteTask(task.id);
      renderTasks();
    });

    taskList.appendChild(taskItem);
  });
}
