# 1  
Создать конструктор (без использования классов es6) **Collection**, который позволяет манипулировать массивом. Все функции должны быть преобразованы в модули СommonJS и подключенный из отдельных файлов. 

## Методы, которые надо реализовать в коллекции:  

map, filter, reduce - эти методы должны возвращать коллекцию с результатом не меняя старую коллекцию;  
transform, sanitize - преобразует текущую коллекцию (аналоги map, filter);  
every, indexOf - работают так же, как и стандартные методы в массиве;  
values, toArray - возвращают array;  
toJSON, toQueryString, toString - возвращают значение в указанном формате;  
isEmpty - проверяет, пустая коллекция или нет; 

## Статические методы, которые надо реализовать в коллекции:  

make - создает коллекцию на основании переданного массива;  
map, filter, reduce - эти методы должны возвращать коллекцию с результатом не меняя старую коллекцию;  
every, indexOf - работают так же, как и стандартные методы в массиве;  
toJSON, toQueryString - возвращают значение в указанном формате;  

## Свойства массива, которые надо реализовать в коллекции:  

lenght;  

### Синтаксис статики:  
```
Collection.make([arr: array = []]): Collection  
Collection.map(arr: array, callback: function): Collection  
Collection.filter(arr: array, callback: function): Collection  
Collection.reduce(arr: array, callback: function, [initial: any]): Collection  
Collection.every(arr: array, callback: function): boolean  
Collection.indexOf(arr: array, searchElement: string, [fromIndex: number = 0]): number  
Collection.toJSON(arr: array): string  
Collection.toQueryString(arr: array): string  
Collection.isEmpty(arr: array): boolean  
```

### Синтаксис методов объекта:
```
objCollection.map(callback: function): Collection  
objCollection.filter(callback: function): Collection  
objCollection.reduce(callback: function [initial: any]): Collection  
objCollection.transform(callback: function): Collection  
objCollection.sanitize(callback: function): Collection  
objCollection.every(callback: function): boolean  
objCollection.indexOf(searchElement: string, [fromIndex: number = 0]): number  
objCollection.toJSON(): string  
objCollection.toQueryString(): string  
objCollection.toString(): string  
objCollection.isEmpty(): boolean  
```

### Пример:  
```
const numbers = Collection.make([1, 2, 3, 4]);  
numbers.map(item => item * 2).filter(item => item > 2).toJSON() // "[4,6,8]"  
```

# 2  
Расширить конструктор **Collection** методами **find**, **avg**, **chunk**, **skip_until**, **contains**, **get**, **normalize**, **pluck**, **unique**, **fill** из предыдущих заданий. Все функции должны быть преобразованы в модули СommonJS и подключенный из отдельных файлов.  

### Cинтаксис статики:  
```
Collection.find(arr: array, search: string|regex): Collection  
Collection.avg(arr: array, [skipNaN: bool = false]): number  
Collection.chunk(arr: array, count: number): Collection[]  
Collection.skipUntil(arr: array, value: any): Collection  
Collection.contains(arr: array, search: string|regex): boolean  
Collection.get(arr: array, path:string): any  
Collection.normalize(arr: array, schema: string|Object, [transform: bool = false]): Collection  
Collection.pluck(arr: array, path: string): Collection  
Collection.unique(arr: array): Collection  
Collection.fill(lenght: number, value: any): Collection  
```

### Cинтаксис методов объекта:  
```
objCollection.find(search: string|regex): Collection  
objCollection.avg([skipNaN: bool = false]): number  
objCollection.chunk(count: number): Collection[]  
objCollection.skipUntil(value: any): Collection  
objCollection.contains(search: string|regex): boolean  
objCollection.get(path: string): any  
objCollection.normalize(schema: string|Object, [transform: bool = false]): Collection  
objCollection.pluck(path: string): Collection  
objCollection.unique(): Collection  
objCollection.fill(lenght: number, value: any): Collection  
```

# 3  
Расширить конструктор **Collection** методами сортировки:  
sort | sortDesc - сортирует массив | сортирует массив в обратном порядке;  
sortBy | sortByDesc - сортирует массив по ключу | сортирует массив по ключу в обратном порядке;  

Пользователь может передавать свою функцию сравнения значений

### Синтаксис статики:  
```
Collection.sort(arr: array, [compareFunction: function]): Collection  
Collection.sortDesc(arr: array, [compareFunction: function]): Collection  
Collection.sortBy(arr: array, column: string, [compareFunction: function]): Collection  
Collection.sortByDesc(arr: array, column: string, [compareFunction: function]): Collection  
```

### Синтаксис методов объекта:  
```
objCollection.sort([compareFunction: function]): Collection  
objCollection.sortDesc([compareFunction: function]): Collection  
objCollection.sortBy(column: string, [compareFunction: function]): Collection  
objCollection.sortByDesc(column: string, [compareFunction: function]): Collection  
```

### Пример:  
```
Collection.make([1, 10, 4, 60]).sort().values() // [1, 4, 10, 60]  
Collection.make([{age: 1}, {age: 10}, {age: 4}, {age: 60}]).sortBy("age").values() // [{age: 1}, {age: 4}, {age: 10}, {age: 60}]  
```

# 4  
Создать конструктор **Pagination**, который позволяет получать содержание коллекции постранично.  
make - создает пагинацию;  
page - возвращает указанную страницу;  
paginate - изменяет настройку пагинации;  
count - возвращает количество страниц;  

### Синтаксис статики:  
```
Pagination.make(collection: Collection, limit: number): Pagination  
```

### Синтаксис методов объекта:  
```
objPagination.page(page: number): Collection  
objPagination.paginate(limit: number): Pagination  
objPagination.count(): number  
```

### Пример:  
```
Pagination.make(Collection.make([1, 2, 3, 4, 5, 6]), 5).page(2).values() // [6]  

const objPagination = Pagination.make(Collection.make([1, 2, 3, 4, 5, 6]), 5)  
objPagination.page(2).values() // [6]  
objPagination.paginate(1).page(2).values() // [2]  
objPagination.page(2).values() // [2]  
```

# 5  
Расширить конструктор **Collection** добавив метод пагинирования.  

### Синтаксис статики:  
```
Collection.paginate(arr: array, limit: number): Pagination  
```

### Синтаксис методов объекта:  
```
objCollection.paginate(limit: number): Pagination  
```

### Пример:  
```
Collection.make([1, 2, 3, 4, 5, 6]).paginate(5).page(2).values() // [6]  
```

# 6  
Расширить конструктор **Pagination** добавив возможность курсорной пагинации.  
current - возвращает текущую страницу;  
next - возвращает следующую страницу;  
prev - возвращает предыдущую страницу;  
first - возвращает первую страницу;  
last - возвращает последнюю страницу;  
reset - устанавливает курсор на первую позицию;  

## Свойства которые надо реализовать:  
cursor - readonly свойство, которое возвращает текущее положение курсора;  

### Синтаксис методов объекта:  
```
objPagination.current(): Collection  
objPagination.next(): Collection  
objPagination.prev(): Collection  
objPagination.first(): Collection  
objPagination.last(): Collection  
objPagination.reset(): void  
```

### Пример:  
```
const objPagination = Collection.make([1, 2, 3, 4, 5, 6]).paginate(1);  

objPagination.current().values() // [1]  
objPagination.next()  
objPagination.next()  
objPagination.next()  
objPagination.current().values() // [4]  
objPagination.cursor // 4  
objPagination.reset()  
objPagination.current().values() // [1]  
```

# 7  
Вывести в консоль по 4 значения из переданного массива с интервалом в 2 секунды.  
```
const arr = [1, 2, 3, 4, 5, 6, 7, 8, "Vasya", "|", "123", 9, 10, 11, 12, 13, 14, 15]  
```

# 8  
С помощью коллекции преобразовать данные testData4 в следующий вид.  
```
["Rafshan", "Misha", "Vasya", "Dima", "Colya", "Ashan"]  
```

# 9  
На основании данных testData3 вывести последовательно в консоль имена программистов сгруппированных и отсортированных по их навыкам:  
```
----- PHP -----  
"Colya"  
.....  
----- JS ------  
......  
```

# 10  
Сделать функцию, которая будет возвращать объект прототипа Pagination при любых переданных ему данных.  

### Синтаксис:  
```
toPagination(data: any, limit: number): Pagination  
```

### Пример:  
```
toPagination([1, 2], 1)->first()->toJSON() //"[1]"  
toPagination(Collection.make([1, 2]), 1)->first()->toJSON() //"[1]"  
toPagination(false, 1)->first()->toJSON() //"[false]"  
toPagination(Collection.make([false, true, 1, 2]), 4)->first()->toJSON() //"[false,true,1,2]"  
```