document.addEventListener("DOMContentLoaded", () => {
  const addTodoForm = document.querySelector("#todoForm");
  const todoInput = document.querySelector("#addTodo");
  const todoList = document.querySelector("#todoList");

  getSavedTodosInLocalStorage();

  addTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const myNewTodo = todoInput.value;
    if (myNewTodo === "") {
      return;
    }

    displayNewTodo(myNewTodo);

    todoInput.value = "";
  });

  const allTodosButton = document.querySelector(".allTodos");
  allTodosButton.addEventListener("click", () => {
    saveTodosInLocalStorage();
  });
});

window.addEventListener("beforeunload", () => {
  saveTodosInLocalStorage();
});

function saveTodosInLocalStorage() {
  const allTodoDiv = document.querySelectorAll(".todo-container");
  const allTodosToSave = [];
  allTodoDiv.forEach((oneDiv) => {
    console.log(oneDiv.children);

    let label;
    let checkbox;
    const children = oneDiv.children;
    for (const element of children) {
      console.log(element);
      if (element.tagName === "LABEL") {
        label = element;
      } else if (element.tagName === "INPUT") {
        checkbox = element;
      }
    }

    const oneTodo = label.textContent;
    allTodosToSave.push(oneTodo);
  });

  console.log(allTodosToSave);

  localStorage.setItem("myDataKey", allTodosToSave.join(";"));
}

function getSavedTodosInLocalStorage() {
  const todosSaved = localStorage.getItem("myDataKey");

  console.log(todosSaved);
  todosSaved.split(";").forEach((oneTodo) => {
    if (oneTodo === "") {
      return;
    }
    displayNewTodo(oneTodo);
  });
}

function displayNewTodo(todo, parent = todoList) {
  const label = document.createElement("label");

  const id = todo.replaceAll(" ", "-").toLowerCase();
  const timeStamp = Date.now();

  label.textContent = todo;
  label.setAttribute("for", `name-${id}-${timeStamp}`);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `name-${id}-${timeStamp}`;

  const div = document.createElement("div");
  div.id = `${id}-${timeStamp}`;
  div.classList.add("todo-container");

  const deletteButton = document.createElement("button");
  deletteButton.textContent = "X";
  deletteButton.addEventListener("click", (e) => deleteTodo(e));
  deletteButton.dataset.id = `${id}-${timeStamp}`;

  div.appendChild(checkbox);
  div.appendChild(label);
  div.appendChild(deletteButton);

  parent.appendChild(div);
}

function deleteTodo(e) {
  const idToDelete = e.target.dataset.id;
  const divToDelete = document.querySelector(`#${idToDelete}`);
  divToDelete.remove();
}
