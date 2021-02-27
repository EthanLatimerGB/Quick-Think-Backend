const {
	AuthenticationError,
	ApolloError,
	ValidationError,
} = require("apollo-server");

const userValidator = (currentUser) => {
	if(!currentUser){
		throw new AuthenticationError('Authorization credentials invalid or does not exist');
	}
};

module.exports = {
	userValidator
};