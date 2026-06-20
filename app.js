// ==========================================================================
// CORE DATA STATE CONFIGURATION
// ==========================================================================
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

// ==========================================================================
// TO-DO APPLICATION CONTROLLER
// ==========================================================================
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.filter-btn');

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  if (!todoList) return; 
  todoList.innerHTML = ''; 

  const filteredTodos = todos.filter(todo => {
    if (currentFilter === 'active') return !todo.completed;
    if (currentFilter === 'completed') return todo.completed;
    return true;
  });

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

if (todoForm) {
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = todoInput.value.trim();
    if (!taskText) return;
    todos.push({ id: Date.now().toString(), text: taskText, completed: false });
    saveTodos();
    renderTodos();
    todoInput.value = '';
  });
}

if (todoList) {
  todoList.addEventListener('click', (e) => {
    const target = e.target;
    const todoItem = target.closest('.todo-item');
    if (!todoItem) return;
    const todoId = todoItem.dataset.id;

    if (target.classList.contains('complete-btn')) {
      todos = todos.map(todo => todo.id === todoId ? { ...todo, completed: !todo.completed } : todo);
    }
    if (target.classList.contains('delete-btn')) {
      todos = todos.filter(todo => todo.id !== todoId);
    }
    saveTodos();
    renderTodos();
  });
}

if (filterButtons && filterButtons.length > 0) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.dataset.filter;
      renderTodos();
    });
  });
}

if (todoList) {
  renderTodos();
}


// ==========================================================================
// ASYNCHRONOUS WEATHER DASHBOARD ENGINE (REST API INTEGRATION)
// ==========================================================================
const cityInput = document.getElementById('weather-city');
const searchBtn = document.getElementById('weather-search-btn');
const statusDiv = document.getElementById('weather-status');
const displayDiv = document.getElementById('weather-display');
const cityNameHeading = document.getElementById('display-city-name');

const tempText = document.getElementById('metric-temp');
const humidityText = document.getElementById('metric-humidity');
const windText = document.getElementById('metric-wind');

async function fetchWeatherData() {
  const cityName = cityInput.value.trim();
  if (!cityName) {
    if (statusDiv) statusDiv.textContent = "Please enter a valid city name.";
    return;
  }

  if (statusDiv) {
    statusDiv.style.color = "#f59e0b"; 
    statusDiv.textContent = "Connecting to API and fetching live metrics...";
  }
  if (displayDiv) displayDiv.style.opacity = "0.4";

  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
    const geoResponse = await fetch(geoUrl);
    
    if (!geoResponse.ok) throw new Error("Network response failed.");
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error(`City "${cityName}" not found. Check spelling.`);
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;
    const weatherResponse = await fetch(weatherUrl);
    
    if (!weatherResponse.ok) throw new Error("Weather metrics fetch failed.");
    const weatherData = await weatherResponse.json();
    const currentMetrics = weatherData.current;

    if (cityNameHeading) cityNameHeading.textContent = `${name}, ${country}`;
    if (tempText) tempText.textContent = `${Math.round(currentMetrics.temperature_2m)}°C`;
    if (humidityText) humidityText.textContent = `${currentMetrics.relative_humidity_2m}%`;
    if (windText) windText.textContent = `${currentMetrics.wind_speed_10m} km/h`;

    if (statusDiv) statusDiv.textContent = "";
    if (displayDiv) {
      displayDiv.style.display = "block";
      displayDiv.style.opacity = "1";
    }

  } catch (error) {
    if (statusDiv) {
      statusDiv.style.color = "#ef4444"; 
      statusDiv.textContent = error.message;
    }
    if (displayDiv) displayDiv.style.display = "none";
  }
}

if (searchBtn) {
  searchBtn.addEventListener('click', fetchWeatherData);
}
if (cityInput) {
  cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchWeatherData();
  });
}