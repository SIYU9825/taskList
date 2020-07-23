//绑定UI
const form = document.querySelector("#task-form");
const inputFiled = document.getElementById("task");
const taskList = document.querySelector(".collection");

//绑定提交监听函数
form.addEventListener("submit", submitTask);

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

  e.preventDefault();
  console.log(li);
}
