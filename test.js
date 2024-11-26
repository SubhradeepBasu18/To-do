
function changeBg (){
    const hours = new Date().getHours()
    let bgUrl = "";

    if (hours >= 6 && hours < 12) {
        bgUrl =  "bg_morning.jpg"; // Morning
    } else if (hours >= 12 && hours < 18) {
        bgUrl = "bg_noon.jpg"; // Afternoon
    } else if (hours >= 18 && hours < 21) {
        bgUrl = "bg_eve.jpg"; // Evening
    } else {
        bgUrl = "bg1.jpg"
    }

    document.body.style.backgroundImage = `url('images/${bgUrl}')`;
}

async function fetchTodos() {
    try {
        const response = await fetch('http://localhost:3000/api/tasks/',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        );
        const todos = await response.json();
        displayTodos(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

function displayTodos(todos) {
    const tasksList = document.querySelector('.tasks-list ul');
    tasksList.innerHTML = ''; // Clear existing tasks
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <i class="fa fa-check task-icon"></i>
            <label>${todo.task}</label>
            <i class="fa fa-trash delete-icon"></i>
        `;
        tasksList.appendChild(li);
    });
}

async function addTodo(task) {
    try {
        const response = await fetch('http://localhost:3000/api/tasks/addTodo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task, status: false })
        });
        if (response.ok) {
            fetchTodos(); // Refresh the list after adding a new task
        } else {
            console.error('Error adding todo:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding todo:', error);
    }
}

document.querySelector('.add-task-button').addEventListener('click', () => {
    const taskInput = document.querySelector('.add-task');
    const task = taskInput.value.trim();
    if (task) {
        addTodo(task);
        taskInput.value = ''; // Clear the input field
    }
});

window.onload = () => {
    changeBg();
    fetchTodos();
};