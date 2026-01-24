const user = {
	name: 'Vasia',
	birthday: '12/23/2023'
};

function isBirthday(birthday, userInput) {
	if (birthday == userInput) {
		console.log('У вас сегодня день рождение. Поздравляю!');
	}
	else {
		console.log('У вас сегодня не день рождения.');
	}
}

const userInput1 = new Date('11/23/2023');
const userInput2 = new Date('12/23/2023');

console.log(userInput1);
console.log(userInput2);

const timeBirthday = new Date(user.birthday)

console.log(isBirthday(timeBirthday.getTime(), userInput1.getTime()));
console.log(isBirthday(timeBirthday.getTime(), userInput2.getTime()));