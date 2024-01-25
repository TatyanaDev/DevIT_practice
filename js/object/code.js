'use strict'

function _typeof (obj) {
  //принимает что-то и возвращает тип
  '@babel/helpers - typeof' //импорт typeof из бабеля
  //если typeof Symbol === 'function' и typeof Symbol.iterator === 'symbol'то возращаем тип объекта
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof (obj) {
      return typeof obj
    }
  } else {
    _typeof = function _typeof (obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj
    }
  }
  return _typeof(obj)
}

// console.log(_typeof('symbol')) //оба блока по отделности возвращают тип объекта

function _classCallCheck (instance, Constructor) {
  //проверка на instance
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

const simpleStr = 'Это обычная строка' //выкидывает ошибку т.к. обычная строка не instance конструктора String
const myString = new String() //undefined

// console.log(_classCallCheck(myString, String))

//наследование прототипов классов
function _inherits (subClass, superClass) {
  //валидация superClass чтоб был функцией или null
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function')
  }
  //создаем объект в subClass.prototype в который кладем superClass и его прототип
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  })
  //устанавливаем superClass в __proto__ subClass
  if (superClass) _setPrototypeOf(subClass, superClass)
  //ничего не возвращает
}

function _createSuper (Derived) {
  //запускаем _isNativeReflectConstruct
  var hasNativeReflectConstruct = _isNativeReflectConstruct()
  return function _createSuperInternal () {
    //запускаем _getPrototypeOf и передаем полученное значение
    var Super = _getPrototypeOf(Derived),
      result
    //если true
    if (hasNativeReflectConstruct) {
      //вызываем конструктор прототипа this
      var NewTarget = _getPrototypeOf(this).constructor
      //создаем new в который кладем прототип переданного объекта, объект, который содержит аргументы, переданные в функцию и конструктор прототипа this
      result = Reflect.construct(Super, arguments, NewTarget)
    } else {
      //иначе вызываем Super с this и arguments
      result = Super.apply(this, arguments)
    }
    //если второй передаваемый аргумент объект или функция то вернет его, иначе вернет первый аргумент
    return _possibleConstructorReturn(this, result)
  }
}

//возможный возврат конструктора
function _possibleConstructorReturn (self, call) {
  //если второй передаваемый аргумент объект или функция то вернет его, иначе вернет первый аргумент
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call
  }
  //вернет инициализированный объект или ошибку
  return _assertThisInitialized(self)
}

// console.log(_possibleConstructorReturn(10,{})) //{}

//проверка на инициализацию объекта, возвращает ошибку или объект
function _assertThisInitialized (self) {
  //если self = undefined
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }
  return self
}

//обертка NativeSuper
function _wrapNativeSuper (Class) {
  //создаем new Map()
  var _cache = typeof Map === 'function' ? new Map() : undefined
  _wrapNativeSuper = function _wrapNativeSuper (Class) {
    //если Class не null и не нативная функция, возвращае класс
    if (Class === null || !_isNativeFunction(Class)) return Class
    //если typeof Class !== 'function'=> выкидываем ошибку
    if (typeof Class !== 'function') {
      throw new TypeError('Super expression must either be null or a function')
    }
    if (typeof _cache !== 'undefined') {
      // console.log(typeof _cache) //object
      // has()=>возвращает логическое значение, указывающее, существует ли элемент с указанным ключом или нет
      // get()=>возвращает заданный элемент из Map объекта
      if (_cache.has(Class)) return _cache.get(Class)
      // set()=>добавляет или обновляет элемент с указанным ключом и значением к Map объекту
      _cache.set(Class, Wrapper)
    }
    function Wrapper () {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor)
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    })
    return _setPrototypeOf(Wrapper, Class)
  }
  return _wrapNativeSuper(Class)
}

function _construct (Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct //функция construct
  } else {
    _construct = function _construct (Parent, args, Class) {
      var a = [null]
      // push вызванную функцию а с аргументами
      a.push.apply(a, args)
      //создать функцю с вызовом Parent с аргументами а
      var Constructor = Function.bind.apply(Parent, a)
      var instance = new Constructor()
      //устанавливаем Class.prototype в __proto__ instance и возвращаем instance
      if (Class) _setPrototypeOf(instance, Class.prototype)
      return instance
    }
  }
  //возвращаем функцию construct с переданными аргументами
  return _construct.apply(null, arguments)
}
//родной рефлект конструктор
function _isNativeReflectConstruct () {
  // Reflect - встроенный объект, который предоставляет методы для перехватывания JavaScript операций
  //typeof Reflect="object"
  //Статический метод Reflect.construct() работает как new operator
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false
  if (Reflect.construct.sham) return false
  // Объект Proxy «оборачивается» вокруг другого объекта и может перехватывать (и, при желании, самостоятельно обрабатывать) разные действия с ним, например чтение/запись свойств и другие.
  //typeof Proxy"function"
  if (typeof Proxy === 'function') return true
  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    )
    return true
  } catch (e) {
    return false
  }
}

// console.log(_isNativeReflectConstruct()) //true

//отличить функцию скрипта JavaScript от собственной функции JavaScript
function _isNativeFunction (fn) {
  return Function.toString.call(fn).indexOf('[native code]') !== -1
}

function _setPrototypeOf (o, p) {
  //принимает 2 объекта и устанавливает второй в __proto__ первого
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf (o, p) {
      o.__proto__ = p
      return o
    }
  return _setPrototypeOf(o, p)
}

// console.log(_setPrototypeOf({ 1: 'name' }, { 2: 'test' }))
//{1: "name"}
// 1: "name"
// __proto__:
// 2: "test"__proto__: Object

function _getPrototypeOf (o) {
  //принимает объект и возвращает его __proto__
  //если передаем сразу прототип то его сразу и вернет, иначе достанет
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf (o) {
        return o.__proto__ || Object.getPrototypeOf(o)
      }
  return _getPrototypeOf(o)
}

var Test = /*#__PURE__*/ (function (_String) {
  _inherits(Test, _String)
  var _super = _createSuper(Test)
  function Test () {
    _classCallCheck(this, Test)
    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }
    return _super.call.apply(_super, [this].concat(args))
  }
  return Test
})(/*#__PURE__*/ _wrapNativeSuper(String))

//скомпилированный код через бабель
