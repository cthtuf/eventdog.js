EventDog.js
====================

EventDog - это небольшой плагин, использующий jQuery, который отслеживает ajax запросы, а так же изменения в структуре и
содержимом элементов и вызывает нужную вам функцию.

Использование
----------

Для начала нужно подключить к документу скрипт и библиотеку jQuery:

```
<script src="//code.jquery.com/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="eventdog.js"></script>
```

Теперь при $(document).ready() можно вызывать eventdog.

У eventdog есть два метода:

1. eventdog.ajax() - отслеживание ajax запросов, имеет следующие опции:
	* callback - функция, которая вызывается при событиях отправки или получения ajax запросов.
	
	  > требуется обязательно
	  > по умолчанию: none
	  
	* substring - строка, которую нужно искать в ответе запроса.
	
	  > по умолчанию: none
	  
	* events - события, пишутся через пробел. Могут быть: send success error complete
	
	  > по умолчанию: send
	  
	* element - селектор формы, которую нужно проверять (только если в ей указан атрибут action).
	
	  > по умолчанию: none
	  
	* url - адрес, по которому нужно отслеживать запросы.
	
	  > по умолчанию: all - все запросы
	  

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
2. eventdog.dom() - отслеживание изменение в содержимом элемента, имеет следующие опции:
	* callback - функция, которая вызывается при изменении элемента.
	
	  > требуется обязательно
	  > по умолчанию: none
	  
	* substring - строка, которую нужно в изменённом элемента.
	
	  > по умолчанию: null
	  
	* element - селектор элемента, который нужно проверять.
	
	  > по умолчанию: document
	  

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

Если у вас возникли вопросы или пожелания по совершенствованию проекта, пожалуйста, свяжитесь с нами:

sirotkin@cubeline.ru

http://www.cubeline.ru/contacts.html

Лицензия
---------------------------

Copyright (c) 2015 Philipp Sirotkin <sirotkin@cubeline.ru> Cubeline agency <http://www.cubeline.ru/>.
The script has been released under MIT License.