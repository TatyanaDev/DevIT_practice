#! /usr/bin/make

all: help

build: ## compile images                 
	@docker build .

up: build ## raise the stack in the background (depends on build)
	@docker-compose up --detach

down: ## stop the stack
	@docker-compose stop

remove: ## delete the stack and all its resources
	@docker-compose down -v --rmi local

sh-node: ## start a disposable node service and connect to it with the console
	@docker run -i -t --rm node /bin/bash

exec-node: ## connect to the node service with the console
	@docker exec -it node bash

help: ## display an instruction with all commands in the console
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {printf "  \033[92m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)