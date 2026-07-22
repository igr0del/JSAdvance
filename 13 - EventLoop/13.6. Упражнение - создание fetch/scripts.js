function myFetch(url) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();
		request.open('GET', url);
		request.send();

		request.addEventListener('load', function () {
			if (this.status > 400) {
				reject(new Error(`HTTP error ${this.status}`));
				return;
			}
			resolve(this.responseText);
		});

		request.addEventListener('error', function () {
			reject(new Error(this.statusText));
		});

		request.addEventListener('timeout', function () {
			reject(new Error('Request timed out'));
		});
	});
}

myFetch('https://dummyjson.com/products')
	.then(response => console.log('Response:', response))	
	.catch(error => console.error('Error:', error));