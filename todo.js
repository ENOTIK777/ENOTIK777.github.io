// Получаем элементы DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

// Массив для хранения задач
let tasks = [];

// Функция добавления новой задачи
function addTask() {
  const taskText = taskInput.value.trim();
  
  if (taskText !== '') {
    // Создаем объект задачи
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false
    };
    
    // Добавляем в массив
    tasks.push(task);
    
    // Сохраняем в localStorage
    saveTasks();
    
    // Очищаем поле ввода
    taskInput.value = '';
    
    // Обновляем список
    renderTasks();
  }
}

// Функция отрисовки задач
function renderTasks() {
  // Очищаем список
  taskList.innerHTML = '';
  
  // Перебираем все задачи
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    
    // Чекбокс для статуса выполнения
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', toggleTask);
    
    // Текст задачи
    const span = document.createElement('span');
    span.textContent = task.text;
    if (task.completed) {
      span.classList.add('completed');
    }
    
    // Кнопка удаления
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', deleteTask);
    
    // Собираем элементы вместе
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    
    taskList.appendChild(li);
  });
}

// Функция переключения статуса задачи
function toggleTask(e) {
  const taskId = parseInt(e.target.parentElement.dataset.id);
  const task = tasks.find(t => t.id === taskId);
  
  if (task) {
    task.completed = e.target.checked;
    saveTasks();
    renderTasks();
  }
}

// Функция удаления задачи
function deleteTask(e) {
  const taskId = parseInt(e.target.parentElement.dataset.id);
  tasks = tasks.filter(task => task.id !== taskId);
  saveTasks();
  renderTasks();
}

// Функция очистки выполненных задач
function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
}

// Функция сохранения задач в localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Функция загрузки задач из localStorage
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
  }
}

// Назначаем обработчики событий
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});
clearCompletedBtn.addEventListener('click', clearCompleted);

// Загружаем задачи при загрузке страницы
document.addEventListener('DOMContentLoaded', loadTasks);