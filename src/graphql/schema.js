const { gql } = require("apollo-server");

const typeDefs = gql`
	type Item {
		id: ID!
		itemEnglish: String!
		itemForeign: String!
		consistantCounter: Int!
		gender: String
		completed: Boolean!
	}

	type Settings {
		correctUntilComplete: Int!
	}

	type User {
		id: ID!
		name: String!
		username: String!
		listID: String!
		settings: Settings!
	}

	type Token {
		token: String!
	}

	type TokenAndUser {
		token: String!,
		user: User!
	}

	type boolResponse {
		correct: Boolean
		item: Item
	}

	type Query {
		listUsers: [User]
		listItems: [Item]
		me: User
		fetchRandomItem: Item
		fetchSpecificItem(itemID: String!): Item
		totalItemsCompleted: Int
	}

	type Mutation {
		login(username: String!, password: String!): Token
		createAccount(name: String!, username: String!, password: String!): TokenAndUser
		createItem(
			itemEnglish: String!
			itemForeign: String!
			gender: String
		): Boolean
		deleteItem(itemID: String!): Boolean
		verifyResponse(inputWord: String!, itemID: String!): boolResponse
		changeCorrectUntilComplete(number: Int): Boolean
	}
`;

module.exports = typeDefs;
