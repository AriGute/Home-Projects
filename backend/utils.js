/**
 * Using encodeURI and regex to scrap any attempt to inject malicious code.
 * @param {String} input
 * @returns {String} Encoded or the original input if contains
 * only numbers or letters. Else return false.
 */
function inputGuard(input) {
	if (input === undefined) return undefined;
	const encodedInput = encodeURI(input);
	const regex = new RegExp('^[A-Za-z0-9.#@]+$');
	if (regex.test(encodedInput)) {
		return encodedInput;
	} else {
		return false;
	}
}

module.exports = inputGuard;
