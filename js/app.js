// Create Elements
const header = createElement("header");
const h1 = createElement("h1", "ToDo List");
const form = createElement("form");
const inputEl = createElement("input", "", ["type", "text"]);
const buttonEl = createElement("button", "", ["type", "submit"]);
const i = createElement("i");

const todoContainer = createElement("div");
const todo_list = createElement("ul");

// add class and id
inputEl.classList.add("todo-input");
buttonEl.classList.add("todo-button");
i.classList.add("fas", "fa-plus-square");
todoContainer.classList.add("todo-container");
todo_list.classList.add("todo-list");

// append the elements
header.appendChild(h1);
buttonEl.appendChild(i);
form.append(inputEl, buttonEl);
todoContainer.appendChild(todo_list);
document.body.append(header, form, todoContainer);

// Selectors

// .todo-input,.todo-button,.todo-list
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// Event Listeners
todoButton.addEventListener("click", addTodo);

// Functions

function addClass(element, cls) {}
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
  newTodo.innerText  = todoInput.value
  newTodo.classList.add("todo-item");

  todoDiv.appendChild(newTodo);

  // check mark button
  const completeBtn = createElement("button");
  completeBtn.innerHTML = "<i class = 'fas fa-check'></i>";
  completeBtn.classList.add('complete-btn');

  todoDiv.appendChild(completeBtn);

  // check trash  button
  const trashBtn = createElement("button");
  trashBtn.innerHTML = "<i class = 'fas fa-trash'></i>";
  trashBtn.classList.add('trash-btn');

  todoDiv.appendChild(trashBtn);

  // append to list

  todoList.appendChild(todoDiv)
  // clear todo input value
  todoInput.value = ""
  
}
