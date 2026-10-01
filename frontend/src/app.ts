interface Task {
    id: number;
    title: string;
    completed: boolean;
}

const API_URL = 'http://localhost:3000/tasks';

const form = document.getElementById('task-form') as HTMLFormElement;
const titleInput = document.getElementById('task-title') as HTMLInputElement;
const taskList = document.getElementById('task-list') as HTMLUListElement;


async function getTasks(): Promise<Task[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }

    return response.json();
}


async function createTask(title: string): Promise<Task> {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            completed: false,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to create task');
    }

    return response.json();
}


async function updateTask(
    id: number,
    completed: boolean
): Promise<Task> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            completed,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to update task');
    }

    return response.json();
}


async function deleteTask(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete task');
    }
}


function renderTasks(tasks: Task[]): void {
    taskList.innerHTML = '';

    for (const task of tasks) {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        const title = document.createElement('span');
        title.textContent = task.title;
        title.className = 'task-title';

        if (task.completed) {
            title.classList.add('completed');
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Usuń';
        deleteButton.className = 'delete-button';

        checkbox.addEventListener('change', async () => {
            try {
                const updatedTask = await updateTask(
                    task.id,
                    checkbox.checked
                );

                title.className = 'task-title';

                if (updatedTask.completed) {
                    title.classList.add('completed');
                }
            } catch (error) {
                console.error(error);
                checkbox.checked = !checkbox.checked;
            }
        });

        deleteButton.addEventListener('click', async () => {
            try {
                await deleteTask(task.id);
                li.remove();
            } catch (error) {
                console.error(error);
            }
        });

        li.appendChild(checkbox);
        li.appendChild(title);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    }
}


async function loadTasks(): Promise<void> {
    try {
        const tasks = await getTasks();
        renderTasks(tasks);
    } catch (error) {
        console.error(error);
    }
}


form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();

    if (!title) {
        return;
    }

    try {
        await createTask(title);

        titleInput.value = '';

        await loadTasks();
    } catch (error) {
        console.error(error);
    }
});


loadTasks();