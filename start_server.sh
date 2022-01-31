#!/bin/bash

shopt -s lastpipe

sleep_time=20

if [ "$1" = "recreate" ] || [ "$1" = "re" ]
then
    rm -rf ./server/node_modules
    rm -rf ./server/prisma/node_modules
    rm -rf ./server/prisma/migrations
    sudo rm -rf ./server/prisma/db
    docker-compose rm

    mkdir ./server/prisma/db
    docker-compose up --detach
    sleep $sleep_time
    cd ./server/prisma
    sed -i 's/dbpostgres/172.17.0.1:5432/g' schema.prisma
    sudo npx prisma migrate dev --name init
    sed -i 's/172.17.0.1:5432/dbpostgres/g' schema.prisma
    cd ../
    rm -rf ./node_modules
    npm install
    cd ../
    docker-compose stop
    docker-compose rm
    docker-compose up
elif [ "$1" = "full_recreate" ] || [ "$1" = "fre" ]
then
    rm -rf ./server/node_modules
    rm -rf ./server/prisma/node_modules
    rm -rf ./server/prisma/migrations
    sudo rm -rf ./server/prisma/db
    sudo docker container stop $(sudo docker container ls -aq)
    sudo docker system prune -af --volumes

    mkdir ./server/prisma/db
    docker-compose up --detach
    sleep $sleep_time
    cd ./server/prisma
    sed -i 's/dbpostgres/172.17.0.1:5432/g' schema.prisma
    sudo npx prisma migrate dev --name init
    sed -i 's/172.17.0.1:5432/dbpostgres/g' schema.prisma
    cd ../
    rm -rf ./node_modules
    npm install
    cd ../
    docker-compose stop
    docker-compose rm
    docker-compose up
elif [ "$1" = "clean" ] || [ "$1" = "cl" ]
then
    rm -rf ./server/node_modules
    rm -rf ./server/prisma/node_modules
    rm -rf ./server/prisma/migrations
    sudo rm -rf ./server/prisma/db
    docker-compose rm
elif [ "$1" = "full_clean" ] || [ "$1" = "fcl" ]
then
    rm -rf ./server/node_modules
    rm -rf ./server/prisma/node_modules
    rm -rf ./server/prisma/migrations
    sudo rm -rf ./server/prisma/db
    sudo docker container stop $(sudo docker container ls -aq)
    sudo docker system prune -af --volumes
else
    ls ./server/prisma/ | grep -o "db" | wc -l | read is_data
    if [ $is_data -eq 1 ]
    then
        sudo chmod -R 777 ./server/prisma/db
        docker-compose up
    else
        mkdir ./server/prisma/db
        docker-compose up --detach
        sleep $sleep_time
        cd ./server/prisma
        sed -i 's/dbpostgres/172.17.0.1:5432/g' schema.prisma
        sudo npx prisma migrate dev --name init
        sed -i 's/172.17.0.1:5432/dbpostgres/g' schema.prisma
        cd ../
        rm -rf ./node_modules
        npm install
        cd ../
        docker-compose stop
        docker-compose rm
        docker-compose up
    fi
fi