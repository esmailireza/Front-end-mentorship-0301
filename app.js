/* variables */
const formGroup = document.querySelector(".form-group");
const taskList = document.querySelector(".task-list");

/* eventlistener */
document.addEventListener("submit", notReloadPage);
taskList.addEventListener("click", removeTask);
taskList.addEventListener("click", editTask);

document.addEventListener("DOMContentLoaded", localStorageOnLoad);

/* functions */
function notReloadPage(e) {
  e.preventDefault();
  const taskValue = document.querySelector("#task-value").value;
  document.querySelector(".task-list").innerHTML += `
  <ul>
    <li>
    <div class="task-list-item">
        <div class="list-item-title">
        <span>${taskValue}</span>
        </div>
        <div class="list-item-buttons">
            <button class="btn-edit" >edit</button>
            <button class="btn-delete">delete</button>
        </div>
    </div>
    </li>
    </ul>`;

  /* adding task to the local storage */
  addTaskToLocalStorage(taskValue);
}

/* function for remove task */
function removeTask(e) {
  if (e.target.classList.contains("btn-delete")) {
    e.target.parentElement.parentElement.remove();
    removeTaskLocalStorage(
      e.target.parentElement.parentElement.firstElementChild.textContent
    );
  }
}

/* function for edit task */
function editTask(e) {
  if (e.target.classList.contains("btn-edit")) {
    /* access to span contions task content added */
    const textTask =
      e.target.parentElement.previousElementSibling.firstElementChild;
    console.log(textTask);
    if (e.target.textContent === "edit") {
      /* create input Element */
      const input = document.createElement("input");
      input.classList.add("input-edit");
      input.type = "text";
      /* input value equals to added tex task */
      input.value = textTask.textContent;
      /* access to class="list-item-title" */
      const div = textTask.parentElement;
      /* inserted input to the div before than textTask */
      div.insertBefore(input, textTask);
      div.removeChild(textTask);
      e.target.textContent = "save";
    } else if (e.target.textContent === "save") {
      /* create span Element */
      const span = document.createElement("span");
      /* input value equals to added tex task */
      span.textContent = textTask.value;
      /* access to class="list-item-title" */
      const div = textTask.parentElement;
      /* inserted span to the div before than textTask */
      div.insertBefore(span, textTask);
      div.removeChild(textTask);
      e.target.textContent = "edit";
    }
  }
}

/* adding task to the local storage */
function addTaskToLocalStorage(taskValue) {
  const tasks = getNotesFromLocalStorage();
  tasks.push(taskValue);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* get notes from local storage */
function getNotesFromLocalStorage() {
  let tasks;
  let getFromLs = localStorage.getItem("tasks");
  if (getFromLs === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(getFromLs);
  }
  return tasks;
}

function localStorageOnLoad() {
  const tasks = getNotesFromLocalStorage();
  tasks.forEach(function (note) {
    document.querySelector(".task-list").innerHTML += `
  <ul>
    <li>
    <div class="task-list-item">
        <div class="list-item-title">
        <span>${note}</span>
        </div>
        <div class="list-item-buttons">
            <button class="btn-edit" >edit</button>
            <button class="btn-delete">delete</button>
        </div>
    </div>
    </li>
    </ul>`;
  });
}

function removeTaskLocalStorage(noteContent) {
  const tasksFromLocalS = getNotesFromLocalStorage();
  tasksFromLocalS.forEach(function (noteB, index) {
    if (noteB == noteContent) {
      console.log("yes");
      tasksFromLocalS.splice(index, 1);
    } else {
      console.log("no");
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasksFromLocalS));
  console.log(noteContent);
  console.log(tasksFromLocalS);
}
