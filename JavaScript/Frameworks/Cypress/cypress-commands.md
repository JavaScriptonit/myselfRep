**Cypress commands**\
**npm run test**\
**npm run cy:run** === command from object "scripts": {}\
"scripts": {\
"cy:run": "npx cypress run --spec "cypress/integration/tests/calculator.js"\
}\
**npx cypress run** === run all tests from project\
**npx cypress open** === open cypress cli

**Prettier**\
**npm install --save-dev --save-exact prettier** === install\
**npx prettier --write .** === format all files in project\
**prettier --write app/components/Button.js** === format certain file\
**prettier --write app/** === format all files in directory