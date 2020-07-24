//绑定UI
const form = document.querySelector("#task-form");
const inputFiled = document.getElementById("task");
const taskList = document.querySelector(".collection");
const clearTask = document.querySelector(".clear-task");
const filter = document.querySelector("#filter");

//绑定提交监听函数
form.addEventListener("submit", submitTask);
taskList.addEventListener("click", removeTask);
clearTask.addEventListener("click", removeALL);
filter.addEventListener("keyup", filterTasks);
document.addEventListener("DOMContentLoaded", getTask);

//实现函数
function submitTask(e) {
  if (inputFiled.value === "") {
    alert("Please add a task!");
    return;
  }

  //获取New Task中的输入内容
  let newTask = inputFiled.value;

  //把这内容加到Tasks的列表上去
  let li = document.createElement("li");

  //给<li></li>添加文本节点
  li.appendChild(document.createTextNode(newTask));

  //给<li></li>添加class
  li.className = "collection-item";

  //给<li></li>添加<a></a>
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";

  //添加删除icon
  link.innerHTML = '<i class= "fa fa-remove"></i>';

  //把这个<a>嵌套进<li>里面去
  li.appendChild(link);

  //把li放到ul的children里去
  taskList.appendChild(li);

  storeTaskLocalStorage(newTask);

  e.preventDefault();
  console.log(li);
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    console.log(e.target);
    if (confirm("Are you sure ?")) {
      e.target.parentElement.parentElement.remove();

      //从本地存储中移除
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }

  e.preventDefault();
}

function removeALL(e) {
  if (confirm("Are you sure clear all ?")) {
    //更快速
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
      //清楚本地存储
      localStorage.clear();
    }
    //暴力法
    taskList.innerHTML = "";
  } else {
    return;
  }

  console.log("ok");
  e.preventDefault();
}

function filterTasks() {
  const word = filter.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach((task) => {
    if (task.textContent.toLowerCase().indexOf(word) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

function getTask() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task) => {
    //把这内容加到Tasks的列表上去
    let li = document.createElement("li");

    //给<li></li>添加文本节点
    li.appendChild(document.createTextNode(task));

    //给<li></li>添加class
    li.className = "collection-item";

    //给<li></li>添加<a></a>
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";

    //添加删除icon
    link.innerHTML = '<i class= "fa fa-remove"></i>';

    //把这个<a>嵌套进<li>里面去
    li.appendChild(link);

    //把li放到ul的children里去
    taskList.appendChild(li);
  });
}

function storeTaskLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
