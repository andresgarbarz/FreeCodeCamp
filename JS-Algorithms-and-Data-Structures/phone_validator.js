function telephoneCheck(str) {
	const regex = /^1?\s?(\([0-9]{3}\)|[0-9]{3})[-\s]?[0-9]{3}[-\s]?[0-9]{4}$/;
	const valid = regex.test(str);
	if (valid) {
		return true;
	} else {
		return false;
	}
}

telephoneCheck("555-555-5555");
