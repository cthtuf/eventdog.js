EventDog.js
====================

	EventDog - ��� ��������� ������, ������������ jQuery, ������� ����������� ajax �������, � ��� �� ��������� � ��������� �
    ���������� ��������� � �������� ������ ��� �������.

�������������
----------

  ��� ������ ������ ����� ���������� � ���������
  
  <pre>
  &lt;script type="text/javascript" src="eventdog.js"&gt;&lt;/script&gt;
  </pre>
  
  ������ ��� $(document).ready() ����� �������� eventdog.
  
  � eventdog ���� ��� ������:
  0. eventdog.ajax() - ������������ ajax ��������, ����� ��������� �����:
  	* callback - �������, ������� ���������� ��� �������� �������� ��� ��������� ajax ��������.
	* substring - ������, ������� ����� ������ � ������ �������.
	* events - �������, ������� ����� ������. ����� ����: send success error complete
	* element - �������� �����, ������� ����� ��������� (������ ���� � �� ������ ������� action).
	* url - �����, �� �������� ����� ����������� �������.
	������:
	<pre>
	eventdog.ajax({
		element: '#form_test',
		substring: '������ �������',
		events: 'send success error complete',
		url: 'test/test.php',
		callback: function () {
			alert('�� ����������!')
		}
	});
	</pre>
  0. eventdog.dom() - ������������ ��������� � ���������� ��������, ����� ��������� �����:
  	* callback - �������, ������� ���������� ��� ��������� ��������.
	* substring - ������, ������� ����� � ��������� ��������.
	* element - �������� ��������, ������� ����� ���������.
	������:
	<pre>
	eventdog.dom({
		element: '#test_p',
		substring: '������ �������',
		callback: function () {
			alert('�� ����������!');
		}
	});
	</pre>

����������
----------

	���� � ��� �������� ������� ��� ��������� �� ����������������� �������, ����������, ��������� � ����
	[sirotkin@cubeline.ru]
	[http://www.cubeline.ru/contacts.html]

License & Policy
---------------------------

	Copyright (c) 2015 Philipp Sirotkin <sirotkin@cubeline.ru> Cubeline agency <http://www.cubeline.ru/>.
	The script has been released under MIT License.