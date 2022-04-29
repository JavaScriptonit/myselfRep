## GIT COMMANDS:

### Установка репозитория локально:

git clone https://github.com/joinbet/joinbet-QA.git - клонирует проект в рабочую директорию

yarn install - устанавливает зависимости для работы проекта

### Добавления репозитория в проект, техническая информация:

git init - инициализация репозитория (Git "включается" или "запускается" для данного репозитория)

git remote add origin https://github.com/eurostavka/joinbet-QA.git - это добавление "короткого имени", такого как origin

rm -rf .git - если error: remote origin already exists. - удалить файл из гита

git init - после удаления снова включить гит. Ответ: Initialized empty Git repository in /Users/andreyshabunov/PhpstormProjects/Joinbet-QA/.git

git add . - добавить репозиторий. Ответ: adding embedded git repository: JoinBet

### Команды, использованные для пуша (проект был добавлен в 2 репозитория):

cd JoinBet, git rm -r node_modules, git push --force, git push --set-upstream origin master, git push

--set-upstream origin master --force


## HELP:

**generating SSH key** - https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent

**converter PUB to PDF** - https://pubtopdf.com/

**personal access TOKENS** - https://github.com/settings/tokens

**Travis-ci API token/Deploy key/User key/Password** - https://docs.travis-ci.com/user/private-dependencies/