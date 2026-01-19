function convert(sum, initialCurrency, convertCurrency) {
	const allCurrencies = [
		{ name: 'USD', mult: 1 },
		{ name: 'EUR', mult: 1.1},
		{ name: 'RUB', mult: 1/60 },
	];

	const initial = allCurrencies.find(currency => currency.name === initialCurrency);

	if (!initial) {
		throw new Error('Unknown initial currency');
	}

	const convert = allCurrencies.find(currency => currency.name === convertCurrency);

	if (!convert) {
		throw new Error('Unknown convert currency');
	}

	return new Intl.NumberFormat('en-US', { style: 'currency', currency: convertCurrency }).format((sum * initial.mult) / convert.mult);
}