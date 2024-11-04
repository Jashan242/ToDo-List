function startTodoApp(){
    const input=document.getElementById("todo-input");
    const list=document.getElementById("todo-list");
    const button=document.getElementById("btn");

    const delAll=document.getElementById("del-btn");
    const checkAll=document.getElementById("check-btn")

    const control=document.querySelector(".control-btn");
    control.style.display="none";

    delAll.addEventListener("click", ()=>{
        list.innerHTML="";
        localStorage.removeItem("todos");
        control.style.display="none";
    })

    checkAll.addEventListener("click", ()=>{
        const tasks=list.querySelectorAll(".todo-task-status");
        tasks.forEach(task =>{
            if(!task.classList.contains("checked")){
                task.classList.add("checked");
                task.src="checked.svg";
            }
        })
        syncTasks();
    })

    button.addEventListener("click", (e)=>{
        e.preventDefault();
        console.log(input.value);
        addTask(input.value);
        input.value="";
    })

    function syncTasks(){
        const currentTask=list.querySelectorAll(".todo-task");
        // const tasks=localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
        const tasks=[];
        currentTask.forEach((task)=>{
            const label=task.querySelector(".task-label").innerText;
            const checked=task.querySelector(".todo-task-status").className.includes("checked");
            tasks.push({label, checked});
        });
        localStorage.setItem("todos", JSON.stringify(tasks));
        control.style.display=tasks.length > 0 ? "flex" : "none";
    }

    function addTask(task, checked=false){
        
        if(task.trim()==="") return;

        const item=document.createElement("li");
        item.classList.add("todo-task");

        const taskLabel=document.createElement("span");
        taskLabel.classList.add("task-label");
        taskLabel.innerText=task;

        const checkedTask=document.createElement("img");
        // checkedTask.src="unchecked.svg";
        if(checked) checkedTask.classList.add("checked");
        checkedTask.src=checkedTask.className.includes("checked") ?
        "checked.svg" : "unchecked.svg";
        checkedTask.classList.add("todo-task-status");

        checkedTask.addEventListener("click", ()=>{
            checkedTask.classList.toggle("checked");
            checkedTask.src=checkedTask.className.includes("checked") ?
            "checked.svg" : "unchecked.svg";
            syncTasks();
        });

        const deleteTask=document.createElement("img")
        deleteTask.src="trash.svg";
        deleteTask.classList.add("task-img");

        deleteTask.addEventListener("click", ()=>{
            item.remove();
            syncTasks();
        })

        item.append(taskLabel, checkedTask, deleteTask)
        list.appendChild(item);
        syncTasks();
    }


    const previousTasks=localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    previousTasks.forEach((task)=>{
        addTask(task.label, task.checked);
    })
    syncTasks();
}

document.addEventListener("DOMContentLoaded", startTodoApp);
