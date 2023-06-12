Stept to folllow to install node.js express and use an API

Make sure I have installed node.js and npm
-node --version
-npm --version

Create package JSON
-npm init --y

Add the script "start" with the main API's name file.
"start": "node server.js"

Change "name":"index.js" with the name of the API's name file
"main": "server.js"

install express
-npm install express --save

Create the main server file (server.js)
const express = require('express');
const app = express();
const port = 3000;
app.use('/', require('./routes'));
app.listen(port, () => console.log(`Web Server is listening at port ${port}`));

Create .gitignore file and save node_modules in

install nodemon in my devDependecies to keep the project running
-npm install nodemon --save-dev

Change the script "start" with nodemon command.
"start": "nodemon server.js"

install mongodb
-npm install mongodb

Optional:to check the mongodb version
-npm list mongodb

install dotenv node package
-npm i --save dotenv

Create the ".env" file in the root(where your package.json file is)

- Add the variable MONGODB_URI
  MONGODB_URI=mongodb+srv://yourDbUsername:yourDbPassword@cluster0.z2fyj.mongodb.net/yourDatabaseName
  \*Note: to call the variable use:
  const dotenv = require('dotenv');
  dotenv.config();
  process.env.MONGODB_URI;

Optional: Install Mongoose
-npm install mongoose --save

install Border Parser
-npm install body-parser

/----Prettier y eslint-----/
Install eslint
-npm install eslint --save-dev

Create the eslint package
-npx eslint --init
-to check syntax and find problems
-commonJS (require/exports) / javascript modules
-none of these / REACt
-NO
-node/ browser
-JSON
-YES

.eslintrc (module.exports(it is just for express))
module.exports = {
"env": {
"es2021": true,
"node": true,
"jest": true
},
"extends": ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"],
"parserOptions": {
"ecmaVersion": "latest",
"sourceType": "module"
},
"rules": {
"react/react-in-jsx-scope": "off"
}
}

Install this libraries:
-npm i -D eslint prettier eslint-plugin-prettier eslint-config-prettier
Note: It is optional
-npm i -D eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-node eslint-config-node
Note: -D is dev dependecies

No es necesario
-npx install-peerdeps --dev eslint-config-airbnb

No es necesario
-npm i -g eslint

Create .prettierrc file

.prettierrc
{
"semi": true,
"tabWidth": 2,
"printWidth": 100,
"singleQuote": true,
"trailingComma": "none",
"jsxBracketSameLine": true
}

package.json
"lint": "eslint .",
"lint:fix": "eslint --fix",
"format": "prettier --write './\*_/_.{js,jsx,ts,tsx,css,md,json}' --config ./.prettierrc",

in case it doesn't work
.eslintrc
{
"plugins": ["import"],
"extends": ["eslint:recommended", "plugin:import/errors", "prettier"],
"env": {
"es6": true,
"browser": true,
"node": true
},
"parserOptions": {
"ecmaVersion": 2020,
"sourceType": "module"
},
"rules": {
"no-unused-vars": [
1,
{
"argsIgnorePattern": "res|next|^err"
}
],
"arrow-body-style": [2, "as-needed"],
"no-param-reassign": [
2,
{
"props": false
}
],
"no-console": 1,
"quotes": ["error", "single", { "allowTemplateLiterals": true }],
"func-names": 0,
"space-unary-ops": 2,
"space-in-parens": "error",
"space-infix-ops": "error",
"comma-dangle": 0,
"max-len": 0,
"import/extensions": 0,
"no-underscore-dangle": 0,
"consistent-return": 0,
"radix": 0,
"no-shadow": [
2,
{
"hoist": "all",
"allow": ["resolve", "reject", "done", "next", "err", "error"]
}
],
"no-unused-expressions": "off"
}
}

package.json (additional script that could help)
"lint": "eslint _.js src/\*\*/_.js",
"format": "prettier --ignore-path ./.gitignore --write \"./\*_/_.{html,json,js,ts,css}\"",
"fixall": "lint -- --fix",
"fixone": "npx eslint src/js/[file name].js --fix"

/----This is an aditional option I am using----/
.prettierrc
{
"semi": true,
"tabWidth": 2,
"printWidth": 100,
"singleQuote": true,
"trailingComma": "none",
"jsxBracketSameLine": true
}

package.json (additional script that could help)
"lint": "eslint .",
"lint:fix": "eslint --fix",
"format": "prettier --ignore-path ./.gitignore --write \"./\*_/_.{html,json,js,ts,css}\""

.eslintrc
{
"env": {
"browser": true,
"commonjs": true,
"es2021": true
},
"extends": "eslint:recommended",
"overrides": [],
"parserOptions": {
"ecmaVersion": "latest"
},
"rules": {}
}

/--------swagger------/
install swagger autogen
-npm install --save-dev swagger-autogen

If you're using CommonJS: (create the swagger.js)
const swaggerAutogen = require('swagger-autogen')();

install swagger ui express
-npm install swagger-ui-express

Express setup app.js(create the route swagger.js)
const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));
module.exports = router;

Configurate your router if is needed
router.use('/', require('./swagger'));

create a swagger file:
-npm run node ./swagger.js

OR create a script and create the swagger file:
"swagger": "node ./swagger.js"
-npm run swagger

Start the project and place the url correctly
-npm start
For instance: http://localhost:8080/api-docs

EXTENSIONS: eslint, prettier, rest client, thunder client,
mongodb,

npm install joi-password-complexity

npm install --save-dev @types/joi-password-complexity
