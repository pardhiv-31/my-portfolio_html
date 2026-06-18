// 1. Initial State Core System
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

// 2. Query DOM Selectors
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.filter-btn');

// 3. Save State Engine to LocalStorage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// 4. Render Engine (Dynamic DOM manipulation)
function renderTodos() {
  todoList.innerHTML = ''; // Clear existing DOM tree

  // Filter tasks based on selected option
  const filteredTodos = todos.filter(todo => {
    if (currentFilter === 'active') return !todo.completed;
    if (currentFilter === 'completed') return todo.completed;
    return true; // 'all'
  });

  // Dynamically build elements and inject
  filteredTodos.forEach(todo => {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.dataset.id = todo.id;

    li.innerHTML = `
      <span>${todo.text}</span>
      <div class="todo-actions">
        <button class="todo-btn complete-btn">${todo.completed ? 'Undo' : 'Done'}</button>
        <button class="todo-btn delete-btn">Delete</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}

// 5. CRUD Functionality - Create
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = todoInput.value.trim();
  if (!taskText) return;

  const newTodo = {
    id: Date.now().toString(),
    text: taskText,
    completed: false
  };

  todos.push(newTodo);
  saveTodos();
  renderTodos();
  todoInput.value = '';
});

// 6. Event Delegation Architecture - Update & Delete
todoList.addEventListener('click', (e) => {
  const target = e.target;
  const todoItem = target.closest('.todo-item');
  if (!todoItem) return;
  const todoId = todoItem.dataset.id;

  // Toggle Complete (Update State)
  if (target.classList.contains('complete-btn')) {
    todos = todos.map(todo => todo.id === todoId ? { ...todo, completed: !todo.completed } : todo);
  }

  // Delete Item (Delete State)
  if (target.classList.contains('delete-btn')) {
    todos = todos.filter(todo => todo.id !== todoId);
  }

  saveTodos();
  renderTodos();
});

// 7. Advanced Filtering Filter System
filterButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    filterButtons.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentFilter = e.target.dataset.filter;
    renderTodos();
  });
});

// Initial boot sequence
renderTodos();