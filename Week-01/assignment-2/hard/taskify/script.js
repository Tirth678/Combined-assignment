const taskInput = document.getElementById('taskInput');
const columnSelect = document.getElementById('columnSelect');
const addTaskBtn = document.getElementById('addTaskBtn');
const columns = document.querySelectorAll('.column');
const containers = document.querySelectorAll('.tasks-container');

let tasks = [];
let taskIdCounter = 0;
let draggedTask = null;

function generateId() {
    return ++taskIdCounter;
}

function formatTime(date) {
    return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
}

function createTaskElement(task) {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.draggable = true;
    taskCard.dataset.taskId = task.id;
    
    taskCard.innerHTML = `
        <div class="task-title">${task.title}</div>
        <div class="task-meta">
            <span class="task-time">${formatTime(task.createdAt)}</span>
        </div>
        <button class="delete-btn" onclick="deleteTask(${task.id})">×</button>
    `;
    
    taskCard.addEventListener('dragstart', handleDragStart);
    taskCard.addEventListener('dragend', handleDragEnd);
    
    return taskCard;
}

function addTask() {
    const title = taskInput.value.trim();
    
    if (!title) {
        taskInput.focus();
        return;
    }
    
    const column = columnSelect.value;
    const task = {
        id: generateId(),
        title: title,
        column: column,
        createdAt: new Date()
    };
    
    tasks.push(task);
    renderTask(task);
    updateTaskCounts();
    
    taskInput.value = '';
    taskInput.focus();
}

function renderTask(task) {
    const container = document.getElementById(`${task.column}Tasks`);
    const emptyColumn = container.querySelector('.empty-column');
    
    if (emptyColumn) {
        emptyColumn.remove();
    }
    
    const taskElement = createTaskElement(task);
    container.appendChild(taskElement);
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    
    const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
    if (taskElement) {
        taskElement.remove();
    }
    
    updateTaskCounts();
    updateEmptyStates();
}

function updateTaskCounts() {
    const todoCount = tasks.filter(t => t.column === 'todo').length;
    const progressCount = tasks.filter(t => t.column === 'progress').length;
    const doneCount = tasks.filter(t => t.column === 'done').length;
    
    document.getElementById('todoCount').textContent = todoCount;
    document.getElementById('progressCount').textContent = progressCount;
    document.getElementById('doneCount').textContent = doneCount;
}

function updateEmptyStates() {
    const columnIds = ['todo', 'progress', 'done'];
    
    columnIds.forEach(columnId => {
        const container = document.getElementById(`${columnId}Tasks`);
        const tasksInColumn = container.querySelectorAll('.task-card').length;
        
        if (tasksInColumn === 0 && !container.querySelector('.empty-column')) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'empty-column';
            emptyDiv.textContent = 'No tasks yet';
            container.appendChild(emptyDiv);
        }
    });
}

function handleDragStart(e) {
    draggedTask = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.dataset.taskId);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    draggedTask = null;
    
    columns.forEach(column => {
        column.classList.remove('drag-over');
    });
    
    document.querySelectorAll('.task-card').forEach(card => {
        card.classList.remove('drag-preview');
    });
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    const column = this.closest('.column');
    column.classList.add('drag-over');
    
    const container = this;
    const afterElement = getDragAfterElement(container, e.clientY);
    
    document.querySelectorAll('.task-card').forEach(card => {
        card.classList.remove('drag-preview');
    });
    
    if (draggedTask) {
        draggedTask.classList.add('drag-preview');
    }
}

function handleDragLeave(e) {
    const column = this.closest('.column');
    if (!column.contains(e.relatedTarget)) {
        column.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    
    const column = this.closest('.column');
    column.classList.remove('drag-over');
    
    const taskId = parseInt(e.dataTransfer.getData('text/plain'));
    const newColumnId = column.dataset.column;
    
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.column = newColumnId;
        
        const container = this;
        const afterElement = getDragAfterElement(container, e.clientY);
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        
        if (afterElement) {
            container.insertBefore(taskElement, afterElement);
        } else {
            container.appendChild(taskElement);
        }
        
        updateTaskCounts();
        updateEmptyStates();
    }
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.task-card:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

containers.forEach(container => {
    container.addEventListener('dragover', handleDragOver);
    container.addEventListener('dragleave', handleDragLeave);
    container.addEventListener('drop', handleDrop);
});

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initialize empty states
updateEmptyStates();