function Character(race, name, language) {
	this.race = race;
	this.name = name;
	this.language = language;
}

Character.prototype.speak = function() {
	const message = `${this.name} говорит на языке: ${this.language}`;
	console.log(message);
	logMessage(message);
}

function Orc(race, name, language, weapon) {
	Character.call(this, race, name, language);
	this.weapon = weapon;
}

Orc.prototype = Object.create(Character.prototype);
Orc.prototype.constructor = Orc;

Orc.prototype.hit = function() {
    const message = `${this.name} наносит удар оружием: ${this.weapon}`;
    console.log(message);
    logMessage(message);
};

function Elf(race, name, language, spellType) {
    Character.call(this, race, name, language);
    this.spellType = spellType;
}

Elf.prototype = Object.create(Character.prototype);
Elf.prototype.constructor = Elf;

Elf.prototype.castSpell = function() {
    const message = `${this.name} создаёт заклинание типа: ${this.spellType}`;
    console.log(message);
    logMessage(message);
};

function logMessage(text) {
    const logDiv = document.getElementById('log-messages');
    const entry = document.createElement('div');
    entry.textContent = text;
    logDiv.appendChild(entry);
    logDiv.scrollTop = logDiv.scrollHeight;
}

const orc = new Orc('орк', 'Громмаш', 'общий', 'топор');
const elf = new Elf('эльф', 'Леголас', 'эльфийский', 'природа');

document.getElementById('orc-speak').addEventListener('click', () => orc.speak());
document.getElementById('orc-hit').addEventListener('click', () => orc.hit());
document.getElementById('elf-speak').addEventListener('click', () => elf.speak());
document.getElementById('elf-cast').addEventListener('click', () => elf.castSpell());

logMessage('Персонажи созданы. Используйте кнопки для вызова методов.');