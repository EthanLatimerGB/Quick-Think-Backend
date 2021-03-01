# Quick-Think-Backend

## Usage
The main use of this server is to be used along with Quick-Think-Frontend (https://github.com/EthanLatimerGB/Quick-Think-Frontend) to act as a backend server to provide CRUD database managment and authorization methods for the Frontend part of the application to exploit. 


## Setup
Here is a step by step method to get you started on setting up this server

**1**: Clone this server by entering the command	```git clone https://github.com/EthanLatimerGB/Quick-Think-Backend```

**2**: Make sure npm/yarn is installed by entering ```npm -v``` or ```yarn --version```. Install dependencies by entering the command: npm ```npm install``` or yarn ```yarn install```.

**3**: Create a .env file and use this as a template

```
PORT = //Enter the port you want to run on
DB_USERNAME = //Enter your MongoDB atlas username
DB_PASSWORD = //Enter your MongoDB atlas password
JWT_SECRET = //Enter the secret password shared between your Frontend and Backend
```

**4**: Run your server with the commands:

```npm run dev``` for your development server and database. *Running nodemon for development*

```npm run start``` for your production server *Running Node.js*


## Other notes

### MongoDB

This server uses **MongoDB** atlas to store data. When you run the server with an Atlas account linked, your new collection will be under **Quick-Think-Dev** or just **Quick-Think**

### GraphQL

To communicate with this server, you must use a library compatible with the GraphQL library to make queries. **This server has no REST api functionality. **

