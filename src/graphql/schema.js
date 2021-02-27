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
		value: String!
	}

	type SuccessIndicator {
		success: Boolean
	}

	type Query {
		listUsers: [User]
		me: User
		fetchRandomItem: Item
		fetchSpecificItem(id: ID!): Item
		totalItemsCompleted: Int
	}

	type Mutation {
		login(username: String!, password: String!): Token
		createAccount(name: String!, username: String!, password: String!): User
		createItem(itemEnglish: String!, itemForeign: String!, gender: String): Item
		deleteItem(itemID: String!): SuccessIndicator
		verifyResponse(inputWord: String!, itemId: String!): Boolean
	}
`;

module.exports = typeDefs;
