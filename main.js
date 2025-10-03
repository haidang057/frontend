const newTodoInput = document.getElementById("newTodo");
const addBtn = document.getElementById("addBtn");
const error = document.getElementById("error");
const todoList = document.getElementById("todoList");
const taskCount = document.getElementById("taskCount");
const clearBtn = document.getElementById("clearBtn");
const searchInput = document.getElementById("searchTodo");

let todos = [];


function renderList(filter = "") {
  todoList.innerHTML = "";
  const filteredTodos = todos.filter(todo =>
    todo.toLowerCase().includes(filter.toLowerCase())
  );

  filteredTodos.forEach(todo => {
    const li = document.createElement("li");

    const text = document.createElement("span");
    text.textContent = todo;

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑";
    delBtn.className = "delete";
    delBtn.addEventListener("click", () => {
      todos = todos.filter(t => t !== todo);
      renderList(searchInput.value);
    });

    li.appendChild(text);
    li.appendChild(delBtn);
    todoList.appendChild(li);
  });

  taskCount.textContent = `You have ${filteredTodos.length} pending task${filteredTodos.length !== 1 ? "s" : ""}`;
}


addBtn.addEventListener("click", () => {
  const newTodo = newTodoInput.value.trim();

  if (!newTodo) {
    error.textContent = "Tên công việc không được để trống!";
    return;
  }
  if (todos.includes(newTodo)) {
    error.textContent = "Tên công việc đã tồn tại!";
    return;
  }

  todos.push(newTodo);
  newTodoInput.value = "";
  error.textContent = "";
  renderList(searchInput.value);
});


clearBtn.addEventListener("click", () => {
  if (todos.length === 0) {
    error.textContent = "Danh sách đang trống!";
    return;
  }
  if (confirm("Bạn có chắc chắn muốn xóa tất cả công việc?")) {
    todos = [];
    renderList();
  }
});


searchInput.addEventListener("input", () => {
  renderList(searchInput.value);
});


renderList();
