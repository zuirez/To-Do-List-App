const task = document.querySelectorAll(".task");
const taskList = document.querySelector(".task-list");
const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementById("searchButton");
const deleteBtn = document.querySelectorAll(".delete-button");

let allTODO = getTodos();
updateTodoList();

//Event listener for search bar
searchBar.addEventListener("keypress", (e)=>
{
    if(event.key == "Enter")
    {
        e.preventDefault();
        const newTask = searchBar.value.trim();
        addNewTask(newTask);
    }
});

//Event listener for search button
searchBtn.addEventListener("click", (e)=>
{
    e.preventDefault();
    const newTask = searchBar.value.trim();
    addNewTask(newTask);
});

//Add a new task to the list
function addNewTask(a)
{
    if(a.length>0)
    {
        const todoObject = {
            text: a,
            completed: false
        }

        allTODO.push(todoObject);
        updateTodoList();
        saveTodos();
        searchBar.value = "";
    }
    else
    {
        alert("Task can't be empty. Enter a task to add.");
    }
}

//Update the list of tasks
function updateTodoList()
{
    taskList.innerHTML = ""; 
    allTODO.forEach((todo, todoIndex)=>
    {
        todoItem = createToDoItem(todo, todoIndex);
        taskList.append(todoItem);
    })
}

//Create a new task li
function createToDoItem(todo, todoIndex)
{
    const todoId = "task-"+todoIndex;
    const task = document.createElement("li");
    const todoText = todo.text;
    task.className = "task";
    task.innerHTML = 
    `
        <input type="checkbox" id="${todoId}">

        <label for="${todoId}" class="custom-checkbox">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
            </svg>
        </label>

        <label for="${todoId}" class="todo-text">${todoText}</label>
        
        <button class="delete-button"><svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
    `;

    const deleteButton = task.querySelector(".delete-button");
    deleteButton.addEventListener("click", ()=>{
        deleteTodoItem(todoIndex);
    })

    const checkbox = task.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        allTODO[todoIndex].completed = checkbox.checked;
        saveTodos();
    })
    checkbox.checked = todo.completed;

    return task;
}

//Delete a task from the list
function deleteTodoItem(todoIndex)
{
    allTODO = allTODO.filter((_, i)=> i !== todoIndex);
    saveTodos();
    updateTodoList();
}

//Saving todo tasks in locan storage
function saveTodos()
{
    const todoJson = JSON.stringify(allTODO);
    localStorage.setItem("todo", todoJson);
}

//Getting the todo tasks from local storage
function getTodos()
{
    const todo = localStorage.getItem("todo") || "[]";
    return JSON.parse(todo);
}