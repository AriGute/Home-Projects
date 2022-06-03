const Utils = {

	// input string, output string in format dd/mm/yyyy
	DateFormat: (date) => {
		let formatedDate = new Date(date);
		return `${formatedDate.getDate()}/${
			formatedDate.getMonth() + 1 // get mounth start from 0
		}/${formatedDate.getFullYear()}`; 
	},
};

export default Utils;
