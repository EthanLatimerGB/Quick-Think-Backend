//packages
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const config = require("./src/utils/config");
const jwt = require("jsonwebtoken");
const User = require("./src/mongooseSchemas/User");

//GraphQL custom dependencies
const typeDefs = require("./src/graphql/schema");
const resolver = require("./src/graphql/resolver");

//async startup
const asyncronousRun = async () => {
	await mongoose
		.connect(config.mongoDBUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		})
		.then(() => console.log("Connected to MongoDB Atlas"))
		.catch((e) => console.log(`--An error has occured - ${e.message}`));

	const server = new ApolloServer({
		cors: true ,
		typeDefs,
		resolvers: resolver,
		context: async ({ req }) => {
			const auth = req ? req.headers.authorization : null;
			if (auth && auth.toLowerCase().startsWith("bearer ")) {
				const decodedToken = jwt.verify(
					auth.substring(7),
					config.jwtSecret
				);

				const currentUser = await User.findById(decodedToken.id);
				return { currentUser };
			}
		},
	});

	await server.listen({ port: config.port }).then(({ url }) => {
		console.log("Listening at ", url);
	});
};

asyncronousRun();
