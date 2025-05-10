const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const filterBtns = document.querySelectorAll('.filter-btn');
const lightModeBtn = document.getElementById('lightMode');
const darkModeBtn = document.getElementById('darkMode');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';
let currentTheme = 'light-mode';

renderTasks();

addTaskBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text !== '') {
        tasks.push({ text, done: false });
        updateTasks();
        taskInput.value = '';
    }
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

lightModeBtn.addEventListener('click', () => {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    currentTheme = 'light-mode';
});

darkModeBtn.addEventListener('click', () => {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    currentTheme = 'dark-mode';
});

function renderTasks() {
    taskList.innerHTML = '';

    let visibleTasks = tasks.filter(task => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'done') return task.done;
        if (currentFilter === 'active') return !task.done;
    });

    visibleTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.done ? 'done' : ''}`;

        const span = document.createElement('span');
        span.textContent = task.text;

        span.addEventListener('dblclick', () => {
            const newText = prompt('Edit task:', task.text);
            if (newText && newText.trim() !== '') {
                tasks[index].text = newText.trim();
                updateTasks();
            }
        });

        span.addEventListener('click', () => {
            if (!task.done) {
                tasks[index].done = true;
                updateTasks();
            }
        });

        const delBtn = document.createElement('button');
        delBtn.innerHTML = '🗑️';
        delBtn.className = 'delete-btn';

        delBtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            updateTasks();
        });

        li.appendChild(span);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });

    taskCount.textContent = `You have ${tasks.length} tasks.`;
}

function updateTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}