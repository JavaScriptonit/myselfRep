## Cypress commands

**npm run test** \
**npm run cy:run** === command from object "scripts": {}\
"scripts": {\
"cy:run": "npx cypress run --spec "cypress/integration/tests/calculator.js"\
}\
**npx cypress run** === run all tests from project. * [cypress-run](https://docs.cypress.io/guides/guides/command-line#cypress-run) \
**npx cypress open** === open cypress cli \
cypress info === prints information about Cypress and the current environment

## Prettier commands

**npm install --save-dev --save-exact prettier** === install\
**npx prettier --write .** === format all files in project\
**npx prettier --check .** === check all files in project\
**prettier --write app/components/Button.js** === format certain file\
**prettier --write app/** === format all files in directory