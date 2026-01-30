console.log(validateAge("2008-01-01"));
console.log(validateAge("2010-12-31"));
console.log(validateAge("2009-02-28"));

function validateAge(validateAgeStr){
	const birthDate = new Date(validateAgeStr);
	const currentDate = new Date();

	if (isNaN(birthDate.getTime())) {
		return false;
	}

	const fourteenYearsAgo = new Date();
	fourteenYearsAgo.setFullYear(currentDate.getFullYear() - 14);

	return birthDate <= fourteenYearsAgo;
}
