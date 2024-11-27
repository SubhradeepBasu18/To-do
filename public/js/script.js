const API_ENDPOINT = process.env.API_ENDPOINT ; //for deployment
// const API_ENDPOINT = 'http://localhost:3000'; //for local development

function formattedDateTime(date){
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

function changeBg (){
    const hours = new Date().getHours()
    const formattedTime = formattedDateTime(new Date());

    const displayTimeELement = document.querySelector('.date-span')
    displayTimeELement.innerHTML = formattedTime;

    console.log(formattedTime);
    
    let bgUrl = "";

    if (hours >= 6 && hours < 12) {
        bgUrl =  "bg_morning.jpg"; 
    } else if (hours >= 12 && hours < 18) {
        bgUrl = "bg_noon.jpg"; 
    } else if (hours >= 18 && hours < 21) {
        bgUrl = "bg_eve.jpg"; 
    } else {
        bgUrl = "bg1.jpg"
    }

    document.body.style.backgroundImage = `url('images/${bgUrl}')`;
}

function displayTasks(todos){
    const taskList = document.querySelector('.tasks-list ul')
    taskList.innerHTML = ''

    if (!Array.isArray(todos) || todos.length === 0) {
        taskList.innerHTML = '<li>No tasks found</li>';
        return;
    }

    todos.forEach(todo => {
        const liElement = document.createElement('li')
        liElement.innerHTML =`
            <i class="fa fa-check task-icon"></i>
            <label for="task1" class="task-title">${todo.task}</label>
            <i class="fa fa-trash delete-icon"></i>
        `;
        taskList.appendChild(liElement)

        const checkIcon = liElement.querySelector('.task-icon')
        const deleteIcon = liElement.querySelector('.delete-icon')
        const taskTitle = liElement.querySelector('.task-title')

        if(todo.status){
            taskTitle.style.textDecoration = 'line-through'
        }

        checkIcon.addEventListener('click',()=>{
            updateStatus(todo._id)
        })

        deleteIcon.addEventListener('click',()=>{
            deleteTask(todo._id)
        })
    });
}

async function getTodos(){
    try {
        const response = await fetch(`${API_ENDPOINT}/api/tasks/`,{
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        })
        if(response.ok){
            const todos = await response.json()
            displayTasks(todos)
        }

    } catch (error) {
        console.log('Error fetching todos:', error); 
    }
}

async function addTodo(task){
    try {
        const response = await fetch(`${API_ENDPOINT}/api/tasks/addTodo`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({task, status: false})
        })

        if(response.ok){
            getTodos()
            console.log('Task added successfully');            
        }
        else {
            console.error('Error adding todo:', response.statusText);
        }
    } catch (error) {
        console.log('Error adding todo:', error);        
    }
}

async function updateStatus(id) {

    try {
        const response = await fetch(`${API_ENDPOINT}/api/tasks/updateTodo/` + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            getTodos()
            console.log('Task updated successfully');
        } else {
            console.error('Error updating todo:', response.statusText);
        }
        
    } catch (error) {
        console.log('Error updating todo:', error);        
    }
    
}

async function deleteTask(id){
    try {
        const response = await fetch(`${API_ENDPOINT}/api/tasks/deleteTodo/`+ id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(response.ok){
            getTodos()
            console.log('Task deleted successfully');            
        }
    } catch (error) {
        console.log('Error deleting todo:', error);        
    }
}

document.querySelector('.add-task-button').addEventListener('click', () => {
    const taskInput = document.querySelector('.add-task');
    const task = taskInput.value.trim();
    if (task) {
        addTodo(task);
        taskInput.value = '';
    }
});

window.onload = () => {
    changeBg();
    getTodos();
};