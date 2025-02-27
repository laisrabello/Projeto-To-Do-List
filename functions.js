// altera o texto do botão 'Criar'
function updateButtonText() {
    const button = document.getElementById('taskButton');

    // Verifica se a tela está no modo "portrait" (vertical)
    if (window.matchMedia("(orientation: portrait)").matches) {
        button.innerText = "+"; // Texto no modo retrato
    } else {
        button.innerText = "Criar"; // Texto no modo paisagem
    }
}

// Chama a função ao carregar a página
updateButtonText();

// Atualiza quando a orientação da tela mudar
window.addEventListener("resize", updateButtonText);

// atualiza a data
const today = new Date();
const date = today.getDate();
const day = today.getDay();
const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
const month = today.getMonth();
const year = today.getFullYear();
const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
document.getElementById('currentDay').innerText = date + ' ' + dayNames[day];
document.getElementById('currentMonthAndYear').innerText = monthNames[month] + ' ' + year;

// botão de criar tarefa
const taskButton = document.getElementById('taskButton');

// seleciona ul
const taskList = document.getElementById('taskList');

// Função para salvar as tarefas no Local Storage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para recuperar as tarefas do Local Storage
function loadTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Função para atualizar a lista de tarefas com base no Local Storage
function renderTasks() {
    const tasks = loadTasks(); // Recupera tarefas do Local Storage
    taskList.innerHTML = ''; // Limpa a lista atual
    tasks.forEach(task => {
        addTaskToList(task.text, task.checked);
    });
}

// Função para adicionar uma tarefa à lista
function addTaskToList(taskText, isChecked = false) {
    // Cria p e atribui o input
    const textTask = document.createElement('p');
    textTask.innerText = taskText;
    textTask.classList = 'textTask';

    // Cria div li
    const taskDiv = document.createElement('li');

    // Cria o checkbox
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = isChecked;
    checkBox.classList = 'checkBox';

    // Função para alterar o estado do checkbox (marcado/desmarcado)
    checkBox.addEventListener('click', () => {
        updateTaskStatus(taskDiv, checkBox.checked);
    });

    // Cria botão remover
    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="bi bi-trash"></i>';
    removeButton.classList = 'removeButton';

    // Função para excluir tarefa
    removeButton.addEventListener('click', function (evento) {
        const taskItem = evento.target.closest('li');
        if (taskItem) {
            removeTask(taskItem);
        }
    });

    // Cria uma div para organizar o checkbox e o texto da tarefa
    const checkBoxAndText = document.createElement('div');
    checkBoxAndText.classList = 'checkBoxAndText';

    // Coloca os elementos em tela
    taskDiv.appendChild(checkBoxAndText);
    taskDiv.appendChild(removeButton);
    checkBoxAndText.appendChild(checkBox);
    checkBoxAndText.appendChild(textTask);
    taskList.appendChild(taskDiv);

    // Atualiza o Local Storage após adicionar a tarefa
    saveTasks(getAllTasks());
}

// Função para remover tarefa
function removeTask(taskItem) {
    taskItem.remove();
    saveTasks(getAllTasks());
}

// Função para atualizar o estado de "checado" da tarefa
function updateTaskStatus(taskItem, isChecked) {
    const tasks = getAllTasks();
    const taskId = taskItem.querySelector('p').innerText; // Identifica a tarefa pelo texto
    const task = tasks.find(t => t.text === taskId);
    if (task) {
        task.checked = isChecked; // Atualiza o estado da tarefa
    }
    saveTasks(tasks); // Salva novamente no Local Storage
}

// Função para obter todas as tarefas da lista
function getAllTasks() {
    const tasks = [];
    document.querySelectorAll('li').forEach(taskItem => {
        const taskText = taskItem.querySelector('p').innerText;
        const isChecked = taskItem.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text: taskText, checked: isChecked });
    });
    return tasks;
}

// Evento para adicionar tarefa
const form = document.querySelector('form');
form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    // Cria e atribui o input
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value;

    // Adiciona a tarefa à lista
    if (taskText) {
        addTaskToList(taskText);
    }

    // Limpa o input após adicionar a tarefa
    taskInput.value = '';
});

// Carrega as tarefas do Local Storage ao carregar a página
document.addEventListener('DOMContentLoaded', renderTasks);


