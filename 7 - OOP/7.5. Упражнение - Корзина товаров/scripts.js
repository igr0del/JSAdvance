const product = {
	id: 1,
	name: 'iPhone 12',
	price: 999,
	discount: 0.1,
	count: 5,
}

const Cart = function() {
	this.products = [];
}

Cart.prototype.addProduct = function (product) {
	if (this.products.find(p => p.id === product.id)) {
		console.log('Product already in cart');
		return;
	}
	this.products.push(product);
}

Cart.prototype.increaseAmount = function (id) {
	this.products = this.products.map(p => {
		if (p.id === id) {
			return { ...p, count: p.count + 1 }
		}
		return p;
	})
}

Cart.prototype.decreaseAmount = function (id) {
	this.products = this.products
		.map(product => {
			if (product.id == id) {
				product.count--;
				return product;
			}
			return product;
		})
		.filter(product => product.count > 0);
}

const cart = new Cart();
cart.addProduct(product);

console.log(cart);