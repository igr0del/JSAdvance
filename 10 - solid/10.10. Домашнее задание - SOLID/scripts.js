class Billing {
    constructor(amount) {
        if (new.target === Billing) {
            throw new Error('Billing — абстрактный класс');
        }
        this.amount = amount;
    }
    calculateTotal() {
        throw new Error('Метод calculateTotal должен быть реализован');
    }
}

class FixBilling extends Billing {
    calculateTotal() { return this.amount; }
}

class HourBilling extends Billing {
    constructor(amount, hours) { super(amount); this.hours = hours; }
    calculateTotal() { return this.amount * this.hours; }
}

class ItemBilling extends Billing {
    constructor(amount, items) { super(amount); this.items = items; }
    calculateTotal() { return this.amount * this.items; }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('billingForm');
    const calculateBtn = document.getElementById('calculateBtn');
    const totalSpan = document.getElementById('total');
    const amountInput = document.getElementById('amount');
    const hoursInput = document.getElementById('hours');
    const itemsInput = document.getElementById('items');
    const hoursGroup = document.getElementById('hoursGroup');
    const itemsGroup = document.getElementById('itemsGroup');
    const typeRadios = document.querySelectorAll('input[name="billingType"]');

    if (!calculateBtn || !totalSpan || !amountInput || !hoursInput || !itemsInput || !hoursGroup || !itemsGroup) {
        console.error('Ошибка: не все элементы найдены в DOM');
        return;
    }

    function toggleFields() {
        const selectedType = document.querySelector('input[name="billingType"]:checked')?.value;
        if (selectedType === 'fix') {
            hoursGroup.style.display = 'none';
            itemsGroup.style.display = 'none';
        } else if (selectedType === 'hour') {
            hoursGroup.style.display = 'block';
            itemsGroup.style.display = 'none';
        } else if (selectedType === 'item') {
            hoursGroup.style.display = 'none';
            itemsGroup.style.display = 'block';
        }
    }

    typeRadios.forEach(radio => radio.addEventListener('change', toggleFields));
    toggleFields(); 

    calculateBtn.addEventListener('click', () => {
        const selectedType = document.querySelector('input[name="billingType"]:checked')?.value;
        const amount = parseFloat(amountInput.value) || 0;

        try {
            let billingInstance;
            let total;
            switch (selectedType) {
                case 'fix':
                    billingInstance = new FixBilling(amount);
                    break;
                case 'hour':
                    const hours = parseFloat(hoursInput.value) || 0;
                    billingInstance = new HourBilling(amount, hours);
                    break;
                case 'item':
                    const items = parseInt(itemsInput.value, 10) || 0;
                    billingInstance = new ItemBilling(amount, items);
                    break;
                default:
                    throw new Error('Неизвестный тип');
            }
            total = billingInstance.calculateTotal();
            totalSpan.textContent = total.toFixed(2);
        } catch (error) {
            totalSpan.textContent = 'Ошибка расчёта';
            console.error(error);
        }
    });
});