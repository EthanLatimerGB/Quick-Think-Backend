const User = require("../mongooseSchemas/User");
const List = require("../mongooseSchemas/List");
const bcrypt = require("bcrypt");
const {
	AuthenticationError,
	ApolloError,
	ValidationError,
} = require("apollo-server");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const { v1: uuid } = require("uuid");

const validator = require("../utils/validator");

const resolver = {
	Query: {
		listUsers: async () => {
			const users = await User.find({});
			return users;
		},
		me: async (root, args, context) => {
			return context.currentUser;
		},
	},
	Mutation: {
		createAccount: async (root, args) => {
			const inputData = args;
			const newList = new List({});
			const savedList = await newList.save();
			const listID = savedList._id;

			const passwordHash = await bcrypt.hash(inputData.password, 10);

			try {
				const newUser = new User({
					name: args.name,
					username: args.username,
					passwordHash: passwordHash,
					listID,
					settings: {
						correctUntilComplete: 5,
					},
				});

				const savedUser = await newUser.save();
				await List.findByIdAndUpdate(savedList.id, {
					userID: savedUser.id,
				});

				return savedUser;
			} catch (e) {
				throw new ValidationError(e);
			}
		},
		login: async (root, args) => {
			const inputData = args;
			const foundUser = await User.findOne({
				username: inputData.username,
			});

			if (!foundUser) {
				throw new AuthenticationError(
					"That username is not associated with an account"
				);
			}

			const passwordCorrect = await bcrypt.compare(
				inputData.password,
				foundUser.passwordHash
			);

			if (!passwordCorrect) {
				throw new AuthenticationError(
					"Your password is incorrect. Try again."
				);
			}

			const userTokenObject = {
				username: foundUser.username,
				id: foundUser._id,
			};

			const token = jwt.sign(userTokenObject, config.jwtSecret);

			return {
				value: token,
			};
		},
		createItem: async (root, args, context) => {
			const inputData = args;
			const { currentUser } = context;
			validator.userValidator(currentUser);

			const listID = currentUser.listID;
			const itemObject = {
				itemEnglish: inputData.itemEnglish,
				itemForeign: inputData.itemForeign,
				gender: inputData.gender,
				consistantCounter: 5,
				completed: false,
			};

			const fetchedList = await List.findById(listID);
			fetchedList.items.push(itemObject);
			await fetchedList.save();

			return itemObject;
		},
		deleteItem: async (root, args, context) => {
			const itemID = args.itemID;
			const { currentUser } = context;
			validator.userValidator(currentUser);
			const listID = currentUser.listID;


			await List.findByIdAndUpdate(listID, {
				$pull: { items: { _id: itemID }}
			});

			return true;
		},
	},
};

module.exports = resolver;
