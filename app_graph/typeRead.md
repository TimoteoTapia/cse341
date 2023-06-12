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

install typescript
-npm install -g typescript

necessary to verify it's been installed corretly
-tsc -v

If a message error show up, follow the next steps:
tsc : El término 'tsc' no se reconoce como nombre de un cmdlet, función, archivo de script o programa ejecutable. Compruebe si escribió correctamente el nombre o,
si incluyó una ruta de acceso, compruebe que dicha ruta es correcta e inténtelo de nuevo.

1. Open windows powerShell as administrator
2. set the command 'get-ExecutionPolicy' (the answer should be 'restricted')
3. Change the restricted mode to permision, execute: 'set-ExecutionPolicy remotesigned'
4. set: 'a' (yes to all) command giving permision
5. set: exit

create the file for typescript
-tsc -init

npm i apollo-server-express bcrypt body-parser cors dotenv express-session graphql graphql-tools joi mongoose mongodb passport passport-google-oauth20 typescript react

npm i -D @types/bcrypt @types/joi @types/react @types/jest eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-react jest nodemon ts-jest ts-node

npm i --save-dev @types/express-session

npm i -D @types/passport-google-oauth20

npm i jsonwebtoken

npm i apollo-server

npm install cookie-parser
npm install --save-dev @types/cookie-parser

Change the script "start" with nodemon command.
"start": "nodemon server.js"

Create the ".env" file in the root(where your package.json file is)

Create .prettierrc & .eslint file

https://console.cloud.google.com/apis/dashboard

npm install joi-password-complexity

npm install --save-dev @types/joi-password-complexity
