class User {
	#login;
	#password

	constructor(login, password) {
		this.#login = login;
		this.#password = password;
	}

	set #password(pass) {
		this.#password = pass.split('').reverse().join('');
	}

	get #password() {
		return this.#password.split('').reverse().join('');
	}

	get login() {
		return this.#login;
	}

	checkPassword(password) {
		return this.#password === password;
	}

	changePassword(oldPassword, newPassword) {
		if (!this.checkPassword(oldPassword)) {
			return false;
		}
		this.#password = newPassword;
		return true;
	}
}

const user = new User('admin', '12345');

console.log(user.login);
console.log(user.checkPassword('12345')); // true
console.log(user.changePassword('12345', '54321'));
console.log(user.checkPassword('54321')); // true
