const List = require("../mongooseSchemas/List");
const User = require("../mongooseSchemas/User");
const validator = require("./validator");
const {
	AuthenticationError,
	ApolloError,
	ValidationError,
} = require("apollo-server");

const fetchUsersList = async (currentUser) => {
	validator.userValidator(currentUser);
	const fetchedList = await List.findById(currentUser.listID);
	const items = fetchedList.items;
	return items;
};

const findSingularItem = async (itemID, listID) => {
	const { items } = await List.findById(listID);

	const foundItem = await items.find((item) => item.id === itemID);

	if (foundItem === undefined) {
		return null;
	} else {
		return foundItem;
	}
};

const consistantCounterAndVerification = async (
	{ inputWord, itemID },
	listID
) => {
	if ((await findSingularItem(itemID, listID)) === null) {
		throw new ValidationError("Item does not exist with that ID");
	}

	console.log("FUcking wanker lol");
	const fetchedList = await List.findById(listID);
	const { settings } = await User.findById(fetchedList.userID);

	let correct = false;
	fetchedList.items.map((item) => {
		if (item.id === itemID) {
			if (inputWord === item.itemForeign) {
				correct = true;
				if (item.consistantCounter > 1) {
					item.consistantCounter -= 1;
				} else {
					item.consistantCounter = 0;
					item.completed = true;
				}
			} else {
				item.consistantCounter = settings.correctUntilComplete;
			}
		}
	});

	await fetchedList.save();
	return correct;
};

module.exports = {
	fetchUsersList,
	consistantCounterAndVerification,
};
