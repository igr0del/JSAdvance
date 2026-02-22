class Car {
	#brand;
	#model;
	#mileage;

	constructor(brand, model, mileage) {
		this.#brand = brand;
		this.#model = model;
		this.#mileage = mileage;
	}

	get mileage() {
		return this.#mileage;
	}

	set mileage(value) {
		if (value < 0) {
			console.error("Mileage cannot be negative.");
			return;
		}
		this.#mileage = value;
	}

	info() {
		return `${this.#brand} ${this.#model} с ${this.#mileage} км пробега`;
	}
}

let currentCar = null;

const brandInput = document.getElementById('brand');
const modelInput = document.getElementById('model');
const initialMileageInput = document.getElementById('initialMileage');
const createBtn = document.getElementById('createBtn');

const carInfoDiv = document.getElementById('carInfo');

const newMileageInput = document.getElementById('newMileage');
const updateMileageBtn = document.getElementById('updateMileageBtn');
const infoBtn = document.getElementById('infoBtn');

function updateCarInfo() {
    if (currentCar) {
        carInfoDiv.textContent = currentCar.info();
        updateMileageBtn.disabled = false;
        infoBtn.disabled = false;
    } else {
        carInfoDiv.textContent = 'Машина не создана';
        updateMileageBtn.disabled = true;
        infoBtn.disabled = true;
        newMileageInput.value = '';
    }
}

createBtn.addEventListener('click', () => {
    const brand = brandInput.value.trim();
    const model = modelInput.value.trim();
    const mileage = parseFloat(initialMileageInput.value) || 0;

    if (!brand || !model) {
        alert('Пожалуйста, заполните марку и модель');
        return;
    }

    currentCar = new Car(brand, model, mileage);
    updateCarInfo();

    brandInput.value = '';
    modelInput.value = '';
    initialMileageInput.value = '';
});

updateMileageBtn.addEventListener('click', () => {
    if (!currentCar) return;

    const newMileage = parseFloat(newMileageInput.value);
    if (isNaN(newMileage) || newMileage < 0) {
        alert('Введите корректный положительный пробег');
        return;
    }

    currentCar.mileage = newMileage;
    updateCarInfo();
    newMileageInput.value = '';
});

infoBtn.addEventListener('click', () => {
    if (currentCar) {
        currentCar.info();
        alert('Информация выведена в консоль (F12)');
    }
});

updateCarInfo();
