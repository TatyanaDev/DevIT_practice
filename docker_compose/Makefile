#! /usr/bin/make

all: help

build:## собрать образы                 
	docker build .

up: build## поднять стек в фоне (зависит от build)
	docker-compose up --detach

down:## остановить стек
	docker-compose stop

remove:## удалить стек и все его ресурсы
	docker-compose down -v --rmi local

sh-node:## запустить одноразовый сервис node и подключится к нему консолью
	docker run -i -t --rm node /bin/bash

exec-node:## подключится консолью к сервису node
	docker exec -it node bash

help:## выводит в консоль инструкцию со всеми командами
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {printf "  \033[92m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)