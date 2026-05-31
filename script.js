let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

document.getElementById("date").innerHTML =
new Date().toLocaleString();

displayTasks();

function addTask(){

    let input =
    document.getElementById("taskInput");

    let priority =
    document.getElementById("priority").value;

    let task =
    input.value.trim();

    if(task === ""){
        alert("Enter Task");
        return;
    }

    tasks.push({
        text: task,
        priority: priority,
        dueDate: document.getElementById("dueDate").value,
        completed: false
    });

    saveTasks();

    input.value = "";

    displayTasks();
}

function displayTasks(){

    let list =
    document.getElementById("taskList");

    list.innerHTML = "";

    tasks.forEach((task,index)=>{

        let li =
        document.createElement("li");

        li.innerHTML = `
        <span onclick="toggleTask(${index})"
        class="${task.completed ? 'completed' : ''}">
        ${task.text}
        </span>

        <span class="${task.priority.toLowerCase()}">
        ${task.priority}
        </span>

        <span>
        📅 ${task.dueDate ?
        new Date(task.dueDate).toLocaleString(
        'en-IN',
        {
            day:'2-digit',
            month:'2-digit',
            year:'numeric',
            hour:'2-digit',
            minute:'2-digit',
            hour12:true
        })
        : "No Date"}
        </span>

        <div>
            <button onclick="editTask(${index})">
            Edit
            </button>

            <button onclick="deleteTask(${index})">
            Delete
            </button>
        </div>
        `;

        list.appendChild(li);
    });

    document.getElementById("count").innerText =
    tasks.length;

    let completed =
    tasks.filter(task => task.completed).length;

    document.getElementById(
    "completedCount"
    ).innerText = completed;
}

function toggleTask(index){

    tasks[index].completed =
    !tasks[index].completed;

    saveTasks();

    displayTasks();
}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    displayTasks();
}

function clearTasks(){

    tasks = [];

    saveTasks();

    displayTasks();
}

function editTask(index){

    let newTask = prompt(
        "Edit Task",
        tasks[index].text
    );

    let newDate = prompt(
        "Edit Due Date",
        tasks[index].dueDate
    );

    if(newTask){

        tasks[index].text = newTask;
        tasks[index].dueDate = newDate;

        saveTasks();
        displayTasks();
    }
}

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function searchTask() {

    let filter = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    let li = document.querySelectorAll("#taskList li");

    li.forEach(item => {

        let text =
        item.textContent.toLowerCase();

        if(text.includes(filter)){
            item.style.display = "";
        }
        else{
            item.style.display = "none";
        }

    });
}

function toggleDarkMode(){

    document.body.classList.toggle(
        "dark-mode"
    );
}