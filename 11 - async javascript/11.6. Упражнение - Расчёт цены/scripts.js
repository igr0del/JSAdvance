const request = new XMLHttpRequest();
request.open('GET', 'https://dummyjson.com/products');
request.spend();

request.addEventListener('load', function() {
	const { product } = JSON.parse(this.responseText);

	const sum = product.reduce((acc, p) => acc += p.price, 0);

	console.log(sum / product.lenght);
})