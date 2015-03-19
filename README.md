EventDog.js
====================

EventDog - ��� ��������� ������, ������������ jQuery, ������� ����������� ajax �������, � ��� �� ��������� � ��������� �
���������� ��������� � �������� ������ ��� �������.

�������������
----------

��� ������ ������ ����� ���������� � ���������

```
&lt;script type="text/javascript" src="eventdog.js"&gt;&lt;/script&gt;
```

������ ��� $(document).ready() ����� �������� eventdog.

� eventdog ���� ��� ������:

0. eventdog.ajax() - ������������ ajax ��������, ����� ��������� �����:
* callback - �������, ������� ���������� ��� �������� �������� ��� ��������� ajax ��������.
* substring - ������, ������� ����� ������ � ������ �������.
* events - �������, ������� ����� ������. ����� ����: send success error complete
* element - �������� �����, ������� ����� ��������� (������ ���� � �� ������ ������� action).
* url - �����, �� �������� ����� ����������� �������.

������:
```javascript
eventdog.ajax({
	element: '#form_test',
	substring: '������ �������',
	events: 'send success error complete',
	url: 'test/test.php',
	callback: function () {
		alert('�� ����������!')
	}
});
```
0. eventdog.dom() - ������������ ��������� � ���������� ��������, ����� ��������� �����:
* callback - �������, ������� ���������� ��� ��������� ��������.
* substring - ������, ������� ����� � ��������� ��������.
* element - �������� ��������, ������� ����� ���������.

������:
```javascript
eventdog.dom({
	element: '#test_p',
	substring: '������ �������',
	callback: function () {
		alert('�� ����������!');
	}
});
```

[���������� ����](http://eventdog.dev.cubeline.ru/)

����������
----------

���� � ��� �������� ������� ��� ��������� �� ����������������� �������, ����������, ��������� � ����
sirotkin@cubeline.ru
http://www.cubeline.ru/contacts.html

License & Policy
---------------------------

Copyright (c) 2015 Philipp Sirotkin <sirotkin@cubeline.ru> Cubeline agency <http://www.cubeline.ru/>.
The script has been released under MIT License.