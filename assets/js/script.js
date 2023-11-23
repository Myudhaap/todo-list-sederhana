document.addEventListener("DOMContentLoaded", () => {
  const todos = [
    {
      id: 1,
      todo: "coba",
      timestamp: "2001-23-04",
      isCompleted: false,
    },
  ];
  const RENDER = "render-todo";
  showTodo(todos);

  document.addEventListener(RENDER, () => {
    showTodo(todos);
  });

  const todoForm = document.getElementById("form");
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    addTodo();
  });

  function resetTodosElement() {
    const resultElement = document.querySelectorAll("#todos");
    for (const todosElement of resultElement) {
      while (todosElement.firstChild) {
        todosElement.removeChild(todosElement.lastChild);
      }
    }
  }

  function makeTodo(todo) {
    const listItem = document.createElement("section");
    listItem.classList.add("list-item");
    listItem.id = `todo-${todo.id}`;

    const wrapText = document.createElement("div");
    wrapText.classList.add("wrap-item");
    const todoTitle = document.createElement("h3");
    todoTitle.classList.add("item-title");
    todoTitle.innerText = todo.todo;
    const todoTime = document.createElement("p");
    todoTime.classList.add("item-timestamp");
    todoTime.innerText = todo.timestamp;
    wrapText.append(todoTitle, todoTime);

    const wrapButton = document.createElement("div");
    wrapButton.classList.add("wrap-item");
    if (!todo.isCompleted) {
      const completeBtn = document.createElement("i");
      completeBtn.classList.add("fa-solid", "fa-check", "icon-todo");
      completeBtn.addEventListener("click", () => {
        taskCompleted(todo.id);
      });
      wrapButton.appendChild(completeBtn);
    } else {
      const undoBtn = document.createElement("i");
      undoBtn.classList.add("fa-solid", "fa-rotate-left", "icon-todo");
      undoBtn.addEventListener("click", () => {
        taskUndo(todo.id);
      });
      const removeBtn = document.createElement("i");
      removeBtn.classList.add("fa-solid", "fa-trash", "icon-todo");
      removeBtn.addEventListener("click", () => {
        taskRemove(todo.id);
      });
      wrapButton.append(undoBtn, removeBtn);
    }
    listItem.append(wrapText, wrapButton);
    return listItem;
  }

  function showTodo(todos) {
    const unCompletedTodos = document.querySelector("#result-not #todos");
    const completedTodos = document.querySelector("#result-completed #todos");
    console.log("hai");
    resetTodosElement();
    todos.map((item) => {
      if (!item.isCompleted) unCompletedTodos.append(makeTodo(item));
      if (item.isCompleted) completedTodos.append(makeTodo(item));
    });
  }

  function addTodo() {
    const todo = document.getElementById("todo").value;
    const timestamp = document.getElementById("timestamp").value;
    const id = generateID();

    todos.push({
      id,
      todo,
      timestamp,
      isCompleted: false,
    });

    document.dispatchEvent(new Event(RENDER));
  }

  function taskCompleted(id) {
    const todo = findTodo(id);

    if (!todo) return alert("Todo tidak ditemukan!");

    todo.isCompleted = true;

    console.log(todo, "completed");
    document.dispatchEvent(new Event(RENDER));
  }

  function taskUndo(id) {
    const todo = findTodo(id);
    if (!todo) return alert("Todo tidak ditemukan");

    todo.isCompleted = false;
    console.log(todo, "undo");
    document.dispatchEvent(new Event(RENDER));
  }

  function taskRemove(id) {
    const index = todos.findIndex((item) => item.id === id);
    todos.splice(index, 1);

    document.dispatchEvent(new Event(RENDER));
  }

  function generateID() {
    return +new Date();
  }

  function findTodo(id) {
    return todos.find((item) => item.id === id);
  }
});
