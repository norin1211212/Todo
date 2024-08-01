document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Fetch tasks from the server
    fetch('/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => {
                addTaskToDOM(task);
            });
        });

    // Add a new task
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const description = taskInput.value.trim();

        if (description) {
            fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ description })
            })
            .then(response => response.json())
            .then(task => {
                addTaskToDOM(task);
                taskInput.value = '';
            });
        }
    });

    // Delete a task
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const taskId = e.target.parentElement.dataset.id;
            fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE'
            })
            .then(() => {
                e.target.parentElement.remove();
            });
        }
    });

    // Add task to DOM
    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.dataset.id = task._id;

        const span = document.createElement('span');
        span.className = 'description';
        span.textContent = task.description;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Delete';

        li.appendChild(span);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }
});
