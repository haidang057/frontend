const todoInput = document.getElementById("todoInput");
const searchInput = document.getElementById("searchInput");
const todoList = document.getElementById("todoList");
const taskInfo = document.getElementById("taskInfo");
const errorMsg = document.getElementById("errorMsg");
const addBtn = document.getElementById("addBtn");
const searchBtn = document.getElementById("searchBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

let todos = [];

// Cập nhật hiển thị số task
function updateInfo() {
  taskInfo.innerText = `You have ${todos.length} pending tasks`;
}

// Thêm todo
function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText === "") {
    errorMsg.textContent = "Please enter a todo!";
    return;
  }

  if (todos.includes(todoText.toLowerCase())) {
    errorMsg.textContent = "Todo already existed!";
    return;
  }

  todos.push(todoText.toLowerCase());
  renderTodos();
  todoInput.value = "";
  errorMsg.textContent = "";
}

// Xóa 1 todo
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

// Xóa tất cả
function clearAll() {
  todos = [];
  renderTodos();
}

// Search todo
function searchTodo() {
  const keyword = searchInput.value.trim().toLowerCase();
  const items = todoList.querySelectorAll("li");
  items.forEach(li => {
    if (li.dataset.text.includes(keyword)) {
      li.style.display = "flex";
    } else {
      li.style.display = "none";
    }
  });
}

// Render todo list
function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.draggable = true;
    li.dataset.text = todo;

    li.innerHTML = `
      <span>${todo}</span>
      <button class="delete-btn" onclick="deleteTodo(${index})">x</button>
    `;

    // Drag event
    li.addEventListener("dragstart", () => {
      li.classList.add("dragging");
    });
    li.addEventListener("dragend", () => {
      li.classList.remove("dragging");
      reorderTodos();
    });

    todoList.appendChild(li);
  });
  updateInfo();
}

// Drag & Drop reorder
todoList.addEventListener("dragover", e => {
  e.preventDefault();
  const dragging = document.querySelector(".dragging");
  const afterElement = getDragAfterElement(todoList, e.clientY);
  if (afterElement == null) {
    todoList.appendChild(dragging);
  } else {
    todoList.insertBefore(dragging, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll("li:not(.dragging)")];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function reorderTodos() {
  const items = todoList.querySelectorAll("li");
  todos = Array.from(items).map(li => li.dataset.text);
  updateInfo();
}

// Gắn sự kiện
addBtn.addEventListener("click", addTodo);
searchBtn.addEventListener("click", searchTodo);
clearAllBtn.addEventListener("click", clearAll);
