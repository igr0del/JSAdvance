// Функция для броска кубика
function rollDice(diceType) {
    // Извлекаем число из строки типа "d6"
    const max = parseInt(diceType.substring(1));
    
    // Генерируем случайное число от 1 до max
    return Math.floor(Math.random() * max) + 1;
}

// Получаем элементы DOM
const diceButtons = document.querySelectorAll('.dice-btn');
const rollButton = document.getElementById('rollButton');
const resultValue = document.getElementById('resultValue');
const resultDice = document.getElementById('resultDice');
const historyList = document.getElementById('historyList');
const clearHistoryButton = document.getElementById('clearHistory');

// Переменные для хранения состояния
let selectedDice = 'd4';
let rollHistory = JSON.parse(localStorage.getItem('diceRollHistory')) || [];

// Инициализация: отображаем историю
updateHistoryDisplay();

// Обработчики событий для выбора кубика
diceButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Убираем активный класс со всех кнопок
        diceButtons.forEach(btn => btn.classList.remove('active'));
        
        // Добавляем активный класс нажатой кнопке
        button.classList.add('active');
        
        // Обновляем выбранный кубик
        selectedDice = button.getAttribute('data-dice');
    });
});

// Обработчик события для броска кубика
rollButton.addEventListener('click', () => {
    // Бросаем кубик
    const result = rollDice(selectedDice);
    
    // Добавляем анимацию
    resultValue.classList.add('rolling');
    
    // Ждем окончания анимации и обновляем результат
    setTimeout(() => {
        resultValue.textContent = result;
        resultDice.textContent = `Бросок кубика ${selectedDice.toUpperCase()}`;
        resultValue.classList.remove('rolling');
        
        // Добавляем в историю
        addToHistory(selectedDice, result);
    }, 500);
});

// Функция для добавления броска в историю
function addToHistory(diceType, result) {
    const timestamp = new Date().toLocaleTimeString();
    const roll = {
        dice: diceType,
        value: result,
        time: timestamp
    };
    
    // Добавляем в начало массива
    rollHistory.unshift(roll);
    
    // Ограничиваем историю 20 последними бросками
    if (rollHistory.length > 20) {
        rollHistory = rollHistory.slice(0, 20);
    }
    
    // Сохраняем в localStorage
    localStorage.setItem('diceRollHistory', JSON.stringify(rollHistory));
    
    // Обновляем отображение
    updateHistoryDisplay();
}

// Функция для обновления отображения истории
function updateHistoryDisplay() {
    // Очищаем список
    historyList.innerHTML = '';
    
    // Если история пуста, показываем сообщение
    if (rollHistory.length === 0) {
        const emptyItem = document.createElement('li');
        emptyItem.className = 'history-item';
        emptyItem.textContent = 'Бросков еще не было';
        emptyItem.style.justifyContent = 'center';
        emptyItem.style.color = '#a0a0a0';
        historyList.appendChild(emptyItem);
        return;
    }
    
    // Добавляем элементы истории
    rollHistory.forEach(roll => {
        const historyItem = document.createElement('li');
        historyItem.className = 'history-item';
        
        const diceSpan = document.createElement('span');
        diceSpan.className = 'history-dice';
        diceSpan.textContent = roll.dice.toUpperCase();
        
        const timeSpan = document.createElement('span');
        timeSpan.textContent = roll.time;
        timeSpan.style.color = '#a0a0a0';
        timeSpan.style.fontSize = '0.9rem';
        
        const resultSpan = document.createElement('span');
        resultSpan.className = 'history-result';
        resultSpan.textContent = roll.value;
        
        historyItem.appendChild(diceSpan);
        historyItem.appendChild(timeSpan);
        historyItem.appendChild(resultSpan);
        
        historyList.appendChild(historyItem);
    });
}

// Обработчик события для очистки истории
clearHistoryButton.addEventListener('click', () => {
    if (rollHistory.length > 0) {
        if (confirm('Вы уверены, что хотите очистить историю бросков?')) {
            rollHistory = [];
            localStorage.removeItem('diceRollHistory');
            updateHistoryDisplay();
        }
    }
});

// Бросок кубика при нажатии клавиши пробел
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        rollButton.click();
    }
});

// Демонстрационный бросок при загрузке
window.addEventListener('load', () => {
    // Показываем демонстрационный результат через 1 секунду после загрузки
    setTimeout(() => {
        resultValue.textContent = '?';
        resultDice.textContent = 'Нажмите "Бросить кубик" или пробел для броска';
    }, 1000);
});