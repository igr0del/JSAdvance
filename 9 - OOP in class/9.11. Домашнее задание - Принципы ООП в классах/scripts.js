class Character {
	constructor(race, name, language) {
		this.race = race;
		this.name = name;
		this.language = language;
	}

	speak() {
		return `${this.name} говорит на ${this.language}.`;
	}
}

class Orc extends Character {
	constructor(name, language, weapon) {
		super('Орк', name, language);
		this.weapon = weapon;
	}

	hit() {
		return `${this.name} наносит удар оружием ${this.weapon}.`;
	}

	speak() {
		return `${this.name} (орк) рычит на ${this.language}: Аргх!`;
	}
}

class Elf extends Character {
	constructor(name, language, spell) {
        super('Эльф', name, language);
        this.spell = spell;
    }

	castSpell() {
		return `${this.name} произносит заклинание: ${this.spell}!`;
	}

	speak() {
        return `${this.name} (эльф) мелодично говорит на ${this.language}.`;
    }
}

const orc = new Orc('Громмаш', 'общий', 'топор');
const elf = new Elf('Леголас', 'эльфийский', 'Свет');

const logMessages = document.getElementById('log-messages');

function log(message) {
    const entry = document.createElement('div');
    entry.textContent = message;
    logMessages.appendChild(entry);
    logMessages.scrollTop = logMessages.scrollHeight;
}

document.getElementById('orc-speak').addEventListener('click', () => {
    log(orc.speak());
});

document.getElementById('orc-hit').addEventListener('click', () => {
    log(orc.hit());
});

document.getElementById('elf-speak').addEventListener('click', () => {
    log(elf.speak());
});

document.getElementById('elf-cast').addEventListener('click', () => {
    log(elf.castSpell());
});

log('Добро пожаловать! Нажмите на кнопки, чтобы увидеть действия персонажей.');