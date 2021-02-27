const List = require("../mongooseSchemas/List");
const validator = require("./validator");


const fetchUsersList = async (currentUser) => {
	validator.userValidator(currentUser);
	const fetchedList = await List.findById(currentUser.listID);
	const items = fetchedList.items;
	return items;
}; 


module.exports = {
	fetchUsersList,
	
};