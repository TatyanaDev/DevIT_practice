# Структура файлов  
```  
.  
..  
./docker  
./src  
./.env.example  
./docker-compose.yml  
./README.md  
```  

# Сервисы  
```  
node:14 - должна быть прокинута папка ./src и порты 80, 9229  
mysql:latest - сервис node должен иметь к ней доступ по домену db-mysql  
phpmyadmin - настроенный на работу с mysql сервисом  
mongo:latest - сервис node должен иметь к ней доступ по домену db-mongo  
mongo-express - настроенный на работу с mongo сервисом  
```  