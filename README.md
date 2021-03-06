EventDog.js
====================

EventDog - это небольшой плагин, использующий jQuery, который отслеживает:

* _ajax_ запросы
* события: _submit_, _change_, _click_ (submit и click - ставятся в приоритете вызова первыми, change - последним)
* изменения в структуре и содержимом блоков (_DOM_)

и вызывает нужную вам функцию (_callback_)

Использование
----------

Для начала нужно подключить к документу скрипт и библиотеку jQuery:

```
<script src="//code.jquery.com/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="eventdog.js"></script>
```

Теперь при _$(document).ready()_ можно вызывать eventdog.

У _eventdog.js_ есть четыре метода:

**eventdog.ajax()** - отслеживание ajax запросов, имеет следующие опции:

* callback - функция, которая вызывается при событиях отправки или получения ajax запросов.

        требуется обязательно
* substring - строка, которую нужно искать в ответе запроса.

        по умолчанию: none
* events - события, пишутся через пробел. Могут быть: send success error complete

        по умолчанию: 'send'
* element - селектор формы, которую нужно проверять (только если у неё указан атрибут action).

        по умолчанию: none
* url - адрес, по которому нужно отслеживать запросы.

        по умолчанию: all - все запросы
	  

Пример:
```javascript
eventdog.ajax({
	element: '#selector',
	substring: 'нужная строчка',
	events: 'send success error complete',
	url: 'test/test.php',
	callback: function () {
		...
	}
});
```
**eventdog.dom()** - отслеживание изменение в содержимом элемента, имеет следующие опции:

* callback - функция, которая вызывается при изменении элемента.

        требуется обязательно
* substring - строка, которую нужно в изменённом элемента.

        по умолчанию: null
* element - селектор элемента, который нужно проверять.

        по умолчанию: document

Пример:
```javascript
eventdog.dom({
	element: '#selector',
	substring: 'нужная строчка',
	callback: function () {
		...
	}
});
```
**eventdog.click()** - отслеживание события submit у формы и вызов callback ф-ции первой, среди других обработчиков:

* callback - функция, которая вызывается при изменении элемента.

        требуется обязательно
* element - селектор элемента, который нужно проверять.

        требуется обязательно

Пример:
```javascript
eventdog.click({
	element: '#selector, .selector',
	callback: function () {
		...
	}
});
```
**eventdog.submit()** - отслеживание события submit у формы и вызов callback ф-ции первой, среди других обработчиков:

* callback - функция, которая вызывается при изменении элемента.

        требуется обязательно
* element - селектор элемента, который нужно проверять.

        требуется обязательно

Пример:
```javascript
eventdog.submit({
	element: '#selector',
	callback: function () {
		...
	}
});
```
```
**eventdog.change()** - отслеживание события change у элемента (input, select, textarea) и вызов callback ф-ции, при этом она ставится самая последняя среди всех обработчиков:

* callback - функция, которая вызывается при изменении элемента.

        требуется обязательно
* element - селектор элемента, который нужно проверять.

        требуется обязательно

Пример:
```javascript
eventdog.change({
	element: '#selector',
	callback: function () {
		...
	}
});
```

[Посмотреть демо](http://eventdog.dev.cubeline.ru/)


Содействие
----------

Если у вас возникли вопросы или пожелания по совершенствованию проекта, пожалуйста, свяжитесь с нами:

sirotkin@cubeline.ru

http://www.cubeline.ru/contacts.html

Лицензия
---------------------------

Copyright (c) 2015 Philipp Sirotkin <sirotkin@cubeline.ru> Cubeline agency <http://www.cubeline.ru/>.
The script has been released under MIT License.