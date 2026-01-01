let weatherMap = new Map([
	['London', 10],
	['Moscow', 7],
	['Paris', 14],
]);

weatherMap = new Map([...weatherMap].map(el => el.reverse()));

console.log(weatherMap);