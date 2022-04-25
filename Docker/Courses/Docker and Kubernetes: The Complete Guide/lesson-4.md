## 16.01.2022 (4ый раздел) -  Making real project

To create tiny Node JS Web application with access for browser:

1. **npm install** - Node Package Manager installation (install all dependencies)

2. **npm start** - To start up the server

3. create **Dockerfile**, **index.js**, **package.json** in new project in VS code

4. **package.json** with scripts and dependencies

5. **Dockerfile** with FROM, WORKDIR, COPY, RUN, CMD commands

6. when REBUILD IMAGE -> depends on which commands we need to rebuild.


Example:

We need to rerun step 3/5 ( COPY ./ ./)

and we rerun all steps after step 3 (step 4 + step 5)

we have to w8 for install even if we don’t make changes in steps 4/5

We can add 1 more COPY line to avoid rerunning INSTALL step:

**COPY ./package.json ./**

**RUN npm install**

**COPY ./ ./**
