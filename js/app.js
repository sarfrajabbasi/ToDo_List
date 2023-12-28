// Create Elements
const header = createElement("header");
const h1 = createElement("h1", "ToDo List");
const form = createElement("form");
const inputEl = createElement("input", "", ["type", "text"]);
const buttonEl = createElement("button", "", ["type", "submit"]);
const i = createElement("i");

const todoContainer = createElement("div");
const todo_list = createElement("ul");

const selectDiv = createElement("div");
const selectEl = createElement("select");

const options1 = createElement("option");
const options2 = createElement("option");
const options3 = createElement("option");

// add text in element

options1.innerText = "All";
options2.innerText = "Completed";
options3.innerText = "Uncompleted";

// add class and id and attr
inputEl.classList.add("todo-input");
buttonEl.classList.add("todo-button");
i.classList.add("fas", "fa-plus-square");
todoContainer.classList.add("todo-container");
todo_list.classList.add("todo-list");

selectDiv.classList.add("select");
selectEl.classList.add("filter-todo");

// attr
selectEl.setAttribute("name", "todos");
options1.setAttribute("value", "all");
options2.setAttribute("value", "completed");
options3.setAttribute("value", "uncompleted");

// append the elements
header.appendChild(h1);
buttonEl.appendChild(i);
selectEl.append(options1, options2, options3);
selectDiv.appendChild(selectEl);
form.append(inputEl, buttonEl, selectDiv);
todoContainer.appendChild(todo_list);

document.body.append(header, form, todoContainer);

// Selectors

// .todo-input,.todo-button,.todo-list
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// check content on our web-pages has loaded
window.addEventListener("DOMContentLoaded", getTodos);
// Functions

function createElement(el, text = "", attrArr = []) {
  const element = document.createElement(el);
  if (text) {
    element.textContent = text;
  }
  if (attrArr.length > 1) {
    const customAttr = document.createAttribute(attrArr[0]);
    customAttr.value = attrArr[1];
    element.setAttributeNode(customAttr);
  }
  return element;
}

function addTodo(event) {
  // prevent form from submiting
  event.preventDefault();

  // todo div
  const todoDiv = createElement("div");
  todoDiv.classList.add("todo");

  // create Li
  const newTodo = createElement("li");
  // add todoInput value in newtodo
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // add to local storage
  saveLocalTodos(todoInput.value);

  // check mark button
  const completeBtn = createElement("button");
  completeBtn.innerHTML = "<i class = 'fas fa-check'></i>";
  completeBtn.classList.add("complete-btn");

  todoDiv.appendChild(completeBtn);

  // check trash  button
  const trashBtn = createElement("button");
  trashBtn.innerHTML = "<i class = 'fas fa-trash'></i>";
  trashBtn.classList.add("trash-btn");

  todoDiv.appendChild(trashBtn);

  // append to list

  todoList.appendChild(todoDiv);
  // clear todo input value
  todoInput.value = "";
}

// delete check

function deleteCheck(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // check---do i already have things in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    // if have  then we get back the arr from local storage
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // if not then we set the  empty arr in the localstorage and if exist then we add arr with value
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    // if have  then we get back the arr from local storage
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    // todo div
    const todoDiv = createElement("div");
    todoDiv.classList.add("todo");

    // create Li
    const newTodo = createElement("li");
    // add todoInput value in newtodo
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // check mark button
    const completeBtn = createElement("button");
    completeBtn.innerHTML = "<i class = 'fas fa-check'></i>";
    completeBtn.classList.add("complete-btn");

    todoDiv.appendChild(completeBtn);

    // check trash  button
    const trashBtn = createElement("button");
    trashBtn.innerHTML = "<i class = 'fas fa-trash'></i>";
    trashBtn.classList.add("trash-btn");

    todoDiv.appendChild(trashBtn);

    // append to list

    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    // if have  then we get back the arr from local storage
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // we filter and set back to local storage
  const todoIndex = todo.children[0].innerText;
  // use splice and give index and how many item to delete.
  
  todos.splice(todos.indexOf(todoIndex), 1);

  localStorage.setItem("todos", JSON.stringify(todos));
  console.log(todos);
}
