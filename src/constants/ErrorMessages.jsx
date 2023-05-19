const messages = {
	required: 'is required',
	minLength: 'should be least {{minLength}} characters',
	min: 'should be greater than or equal to {{data-ttg-min}}',
	max: 'should be less than or equal to {{data-ttg-max}}',
	maxLength: 'must not be longer than {{data-ttg-max-length}} characters',
	pattern: 'should be a valid {{name}}',
};

const extractPiece = (str) => {
	const matches = /{{([^}]*)}}/.exec(str);
	if (!matches) {
		return [null, null];
	}
	return [matches[0], matches[1]];
};

const renderErrorMessage = (type, props, defaultErrorMessage, formMessage) => {
	let string = messages[type];
	if (['pattern', 'validate', 'required'].indexOf(type) > -1 && formMessage) {
		string = formMessage;
	}
	if (!string) {
		string = defaultErrorMessage;
	}
	let [value, prop] = extractPiece(messages[type]);
	while (value && prop) {
		string = string.replace(value, props[prop]);
		[value, prop] = extractPiece(string);
	}
	return string;
};

export default renderErrorMessage;
