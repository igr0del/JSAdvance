function createSelect(array){
	const el = document.createElement('.filter');
	el.innerHTML = `<select>
		${array.map(arrEl => `<option value="${arrEl}">${arrEl}</option>`).join('')}
	</select>`;
}

function getCategories(){
	fetch('https://dummyjson.com/products/categories')
	.then(response => response.json())
	.then(data => createSelect(data))
	.catch(error => console.error('Error fetching categories:', error));
}

getCategories();