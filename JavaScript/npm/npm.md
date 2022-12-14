## Использование NPM packages:

* Создать гитхаб токен (на всякий случай со всеми правами кроме админских)


* Добавить файл .npmrc если отсутствует в репе со значением
@joinbet:registry=https://npm.pkg.github.com/


* Добавить файл .npmrc.prod если отсутствует в репе со значением
@joinbet:registry=https://npm.pkg.github.com/ //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}


* Обновить Doсkerfile если не обновлён\
`ARG GITHUB_TOKEN`\
`ENV GITHUB_TOKEN=$GITHUB_TOKEN`\
`COPY ./package*.json ./`\
`COPY .npmrc.prod ./.npmrc`\
`RUN yarn`


* Обновить Dockerfile.dev если не обновлён\
`ARG GITHUB_TOKEN`\
`ENV GITHUB_TOKEN=$GITHUB_TOKEN`\
`COPY ./package*.json ./`\
`COPY .npmrc.prod ./.npmrc RUN yarn`


* Прокинуть в args сервисов в docker-compose файлах GITHUB_TOKEN: ${GITHUB_TOKEN} если отсутствует


* Экспортировать github token export GITHUB_TOKEN=YOUR_TOKEN_HERE Иди добавить его глобально в .bashrc .bash_profile


* Экспортировать глобально npm config npm config set '//npm.pkg.github.com/:_authToken' "${GITHUB_TOKEN}"


* Исправить .github/workflows/build-if-tag.yml по примеру


* Добавить необохимую либу в package.json - пример "@joinbet/lint": "0.0.10"


* Установить зависимости через yarn