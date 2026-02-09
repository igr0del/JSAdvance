function pizzaTimer(ms) {
	const endTime = Date.now() + ms;
	const interval = setInterval(() => {
		console.log(
			new Intl.DateTimeFormat('ru-RU', { 
				minute: 'numeric',
				second: 'numeric' 
			}).format(endTime + 100 - new Date())
		);
	}, 1000);
	setTimeout(() => {
		clearInterval(interval);
		console.log('Пицца готова!');
	}, ms);
}