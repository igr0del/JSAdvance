function getData(url, errorMessage) {
	return fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error(`${errorMessage}: ${response.status}`);
			}
			return response.json();
		})
}

getData('https://dummyjson.com/products', 'Failed to fetch products')
	.then(({ products}) => {
		console.log(products);
		return fetch('https://dummyjson.com/products/categories' + products[0].id);
	})
	.then(data => {
		console.log(data);
	})
	.catch(error => {
		const el = document.createElement('p');
		el.innerHTML = error.message;
	});