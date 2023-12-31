# AREA

## Introduction

AREA is an Epitech school project. We had to recreate the environment of IFTTT, with a backend, a web frontend and a module frontend.

## **Authors**

- adrien.moreau@epitech.eu
- sobihan.mahedran@epitech.eu

### **QuickStart**

The first launch is the most complex has you need too create the database.

To make it eassier whe have created a shellscript `start_server.sh`.

Normaly a simple `./start_server.sh re` does the trick.

But Some times it fails, in which case you can do the following:

Open two terminal in this folder, In the first enter the following `rm -rf ./server/node_modules && rm -rf ./server/prisma/node_modules && rm -rf ./server/prisma/migrations && sudo rm -rf ./server/prisma/db && sudo docker-compose rm && mkdir ./server/prisma/db && sudo docker-compose up backend`

When the docker is up on the first terminal you can enter the following in the second terminal `cd ./server/prisma && sed -i 's/dbpostgres/172.17.0.1:5432/g' schema.prisma && npx prisma migrate dev --name init && sed -i 's/172.17.0.1:5432/dbpostgres/g' schema.prisma && cd ../ && rm -rf ./node_modules && npm install && cd ../ && sudo docker-compose stop && sudo docker-compose rm && sudo docker-compose up`

After that normally the database is created, aslong as the database is in place you only need to use `sudo docker-compose up` to start the server.

## **User API**

- User API ([documentation](./server/src/controllers/user/README.md))

## **AREA API**

- AREA API ([documentation](./server/src/controllers/job/README.md))

## **External API, API**

- External API ([documentation](./server/src/controllers/api_access/README.md))

## **Action / Reaction implementation**

- Action / Reaction implementation ([documentation](./server/src/area/README.md))
