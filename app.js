const taskInput = document.getElementById("new-task");//Add a new task.
const addButton = document.getElementsByTagName("button")[0];//first button
const incompleteTaskHolder = document.getElementById("tasks");//ul of tasks
const completedTasksHolder = document.getElementById("completed");//completed

const createNewTaskElement = function(taskString){
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  listItem.className = "tasks__item";
  label.innerText = taskString;
  label.className = "label";
  checkBox.type = "checkbox";
  checkBox.className = "checkbox";
  editInput.type = "text";
  editInput.className = "input";
  editButton.innerText = "Edit";
  editButton.className = "button button-edit";
  deleteButton.className = "button button-delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

const addTask = function(){
  console.log("Add Task...");
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value="";
}

const editTask = function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");
  const listItem = this.parentNode;
  const editInput = listItem.querySelector(".input");
  const label = listItem.querySelector(".label");
  const editBtn = listItem.querySelector(".button-edit");
  const containsClass = listItem.classList.contains("tasks__item-edit");
  if(containsClass){
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  listItem.classList.toggle("tasks__item-edit");
};

const deleteTask = function(){
  console.log("Delete Task...");
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
}

const taskCompleted = function(){
  console.log("Complete Task...");
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function(){
  console.log("Incomplete Task...");
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}
const ajaxRequest = function(){
  console.log("AJAX Request");
}
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

const bindTaskEvents = function(taskListItem, checkBoxEventHandler){
  console.log("bind list item events");
  const checkBox = taskListItem.querySelector(".checkbox");
  const editButton = taskListItem.querySelector(".button-edit");
  const deleteButton = taskListItem.querySelector(".button-delete");
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (let i=0; i<incompleteTaskHolder.children.length; i++){
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (let i=0; i<completedTasksHolder.children.length; i++){
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}