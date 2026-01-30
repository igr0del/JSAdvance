function rollDice(diceType) {
    const max = parseInt(diceType.substring(1));
    
    return Math.floor(Math.random() * max) + 1;
}

const diceButtons = document.querySelectorAll('.dice-btn');
const rollButton = document.getElementById('rollButton');
const resultValue = document.getElementById('resultValue');
const resultDice = document.getElementById('resultDice');
const historyList = document.getElementById('historyList');
const clearHistoryButton = document.getElementById('clearHistory');

let selectedDice = 'd4';
let rollHistory = JSON.parse(localStorage.getItem('diceRollHistory')) || [];

updateHistoryDisplay();

diceButtons.forEach(button => {
    button.addEventListener('click', () => {
        diceButtons.forEach(btn => btn.classList.remove('active'));
        
        button.classList.add('active');
        
        selectedDice = button.getAttribute('data-dice');
    });
});

rollButton.addEventListener('click', () => {
    const result = rollDice(selectedDice);
    
    resultValue.classList.add('rolling');
    
    setTimeout(() => {
        resultValue.textContent = result;
        resultDice.textContent = `Бросок кубика ${selectedDice.toUpperCase()}`;
        resultValue.classList.remove('rolling');
        
        addToHistory(selectedDice, result);
    }, 500);
});

function addToHistory(diceType, result) {
    const timestamp = new Date().toLocaleTimeString();
    const roll = {
        dice: diceType,
        value: result,
        time: timestamp
    };
    
    rollHistory.unshift(roll);
    
    if (rollHistory.length > 20) {
        rollHistory = rollHistory.slice(0, 20);
    }
    
    localStorage.setItem('diceRollHistory', JSON.stringify(rollHistory));
    
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    historyList.innerHTML = '';
    
    if (rollHistory.length === 0) {
        const emptyItem = document.createElement('li');
        emptyItem.className = 'history-item';
        emptyItem.textContent = 'Бросков еще не было';
        emptyItem.style.justifyContent = 'center';
        emptyItem.style.color = '#a0a0a0';
        historyList.appendChild(emptyItem);
        return;
    }
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

clearHistoryButton.addEventListener('click', () => {
    if (rollHistory.length > 0) {
        if (confirm('Вы уверены, что хотите очистить историю бросков?')) {
            rollHistory = [];
            localStorage.removeItem('diceRollHistory');
            updateHistoryDisplay();
        }
    }
});

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        rollButton.click();
    }
});

window.addEventListener('load', () => {
    setTimeout(() => {
        resultValue.textContent = '?';
        resultDice.textContent = 'Нажмите "Бросить кубик" или пробел для броска';
    }, 1000);
});