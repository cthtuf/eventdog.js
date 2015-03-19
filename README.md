EventDog.js
====================

EventDog - это небольшой плагин, использующий jQuery, который отслеживает ajax запросы, а так же изменения в структуре и
содержимом элементов и вызывает нужную вам функцию.

Использование
----------

Для начала скрипт нужно подключить к документу

```
&lt;script type="text/javascript" src="eventdog.js"&gt;&lt;/script&gt;
```

Теперь при $(document).ready() можно вызывать eventdog.

У eventdog есть два метода:

0. eventdog.ajax() - отслеживание ajax запросов, имеет следующие опции:
* callback - функция, которая вызывается при событиях отправки или получения ajax запросов.
* substring - строка, которую нужно искать в ответе запроса.
* events - события, пишутся через пробел. Могут быть: send success error complete
* element - селектор формы, которую нужно проверять (только если в ей указан атрибут action).
* url - адрес, по которому нужно отслеживать запросы.

Пример:
```javascript
eventdog.ajax({
	element: '#form_test',
	substring: 'нужная строчка',
	events: 'send success error complete',
	url: 'test/test.php',
	callback: function () {
		alert('Всё получилось!')
	}
});
```
0. eventdog.dom() - отслеживание изменение в содержимом элемента, имеет следующие опции:
* callback - функция, которая вызывается при изменении элемента.
* substring - строка, которую нужно в изменённом элемента.
* element - селектор элемента, который нужно проверять.

Пример:
```javascript
eventdog.dom({
	element: '#test_p',
	substring: 'нужная строчка',
	callback: function () {
		alert('Всё получилось!');
	}
});
```

[Посмотреть демо](http://eventdog.dev.cubeline.ru/)

Содействие
----------

Если у вас возникли вопросы или пожелания по совершенствованию проекта, пожалуйста, свяжитесь с нами
sirotkin@cubeline.ru
http://www.cubeline.ru/contacts.html

License & Policy
---------------------------

Copyright (c) 2015 Philipp Sirotkin <sirotkin@cubeline.ru> Cubeline agency <http://www.cubeline.ru/>.
The script has been released under MIT License.