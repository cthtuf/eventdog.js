/**
 * EventDog v1.1
 * (c) 2015 Cubeline agency. http://www.cubeline.ru/
 * author: Philipp Sirotkin. labstersrak@gmail.com
 * License: MIT
 */

var eventdog = (function () {
  var origOn = $.fn.on;
  var origEvent = EventTarget.prototype.addEventListener; // store original
  /**
   * Добавление пользователького события addEvent при добавлении других событий jQuery
   */
  $.fn.on = function () {
    return origOn.apply(this, arguments).trigger("addEvent");
  };
  /**
   * Добавление пользователького события addEvent при добавлении других событий javascript
   */
  EventTarget.prototype.addEventListener = function (type, fn, capture) {
    this.origEvent = origEvent;
    this.origEvent(type, fn, capture); // call original method
    $(this).trigger('addEvent');
  };
  /**
   * Переводит строку из юникода в символы
   */
  String.prototype.unicodeToChar = function () {
    return this.replace(/\\u[\dABCDEFabcdef][\dABCDEFabcdef][\dABCDEFabcdef][\dABCDEFabcdef]/g,
      function (match) {
        return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
      });
  };
  /**
   * Ф-ция для перевода первой буквы в верхний регистр
   */
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };
  /**
   * Очищает строку от всех символов, кроме a-z, а-я, 0-9, -, !, ?
   */
  String.prototype.clearText = function () {
    return this.unicodeToChar().toLowerCase().replace(/[^a-zа-я0-9-!?ё]/g, '');
  };
  /**
   * Создает консольную ошибку о забытых параметрах
   */
  var throwError = function () {
    console.error('Нужно указать функцию через параметр callback для её последующего вызова вызова');
  };
  /**
   * Ф-ция для вызова первым обработчика события среди других
   * @param eventType (String) - тип события
   * @param eventData (Object) - передаваемы атрибуты
   * @param handler (Function) - обработчик
   */
  $.fn.bindFirst = function (eventType, eventData, handler) {
    var indexOfDot = eventType.indexOf(".");
    var eventNameSpace = indexOfDot > 0 ? eventType.substring(indexOfDot) : "";

    eventType = indexOfDot > 0 ? eventType.substring(0, indexOfDot) : eventType;
    handler = handler == undefined ? eventData : handler;
    eventData = typeof eventData == "function" ? {} : eventData;

    return this.each(function () {
      var $this = $(this);
      var currentAttrListener = this["on" + eventType];

      if (currentAttrListener) {
        $this.bind(eventType, function (e) {
          return currentAttrListener(e.originalEvent);
        });

        this["on" + eventType] = null;
      }

      $this.bind(eventType + eventNameSpace, eventData, handler);

      var allEvents = $this.data("events") || $._data($this[0], "events");
      var typeEvents = allEvents[eventType];
      var newEvent = typeEvents.pop();
      typeEvents.unshift(newEvent);
    });
  };
  $.fn.bindLast = function (event, cbFunc) {
    return this.each(function () {

      var highIndex = 1000000;
      var eventData = event.split('.');
      var eventName = eventData[0];

      $(this).on(event, cbFunc);

      var elem = this;
      $(this).on('addEvent', function (e) {
        var events = $._data(elem, "events"),
          ourIndex = false,
          usedIndicies = {};
        $.each(events[eventName], function (index, func) {
          if (func.handler === cbFunc) {
            ourIndex = index;
          }
          usedIndicies[index] = 1;
        });
        if (ourIndex !== false) {
          while (usedIndicies[highIndex] == 1) {
            highIndex++;
          }

          var pos = events[eventName].length - 1,
            item = events[eventName][ourIndex];
          events[eventName].splice(ourIndex, 1);
          events[eventName].splice(pos, 0, item);

          $(elem).data('events', events);
        }
      })
    });
  };

  return {
    /**
     * Функция для проверки содержимого ajax запросов и вызова пользовательской ф-ции.
     * @param options.callback (function) - функция, которая вызывается при ajax запросах событиях
     * @param options.events (string) - события, пишутся через пробел, могут быть (send, success, error, complete)
     * @param options.element (string) - селектор формы, которую нужно отслеживать
     * @param options.url (string) - url, по которому нужно отслеживать запросы
     * @param options.substring (string) - строка, которую нужно искать в ответе запроса
     */
    ajax: function (options) {
      options = typeof options !== 'undefined' ? options : {};
      options.callback = typeof options.callback !== 'undefined' ? options.callback : -1;

      // Проверяем, указан ли параметр events
      if (typeof options.events !== 'undefined') {
        options.events = options.events.toLowerCase().split(' ');
        for (var i = 0; i < options.events.length; ++i) {
          options.events[i] = 'ajax' + options.events[i].capitalize();
        }
        options.events = options.events.toString().replace(',', ' ');
      } else {
        options.events = 'ajaxSend';
      }

      // Берём значение action из блока, если нет options.url
      if (typeof options.element !== 'undefined' && typeof options.url == 'undefined') {
        options.element = $(options.element);
        if (options.element.attr('action').length) {
          options.url = options.element.attr('action');
        }
      }

      // Проверяем на то, какие запросы нам следить (либо по определённой ссылке, либо все)
      if (typeof options.url !== 'undefined') {
        $(document).on(options.events, function (event, xhr, settings, data) {
          if (settings.url.indexOf(options.url) !== -1) {
            if (typeof options.substring !== 'undefined') {
              if (typeof data == 'undefined') return;
              if (data.clearText().indexOf(options.substring.clearText()) !== -1) {
                try {
                  options.callback();
                } catch (e) {
                  throwError();
                }
              }
            } else {
              try {
                options.callback();
              } catch (e) {
                throwError();
              }
            }
          }
        });
      } else {
        $(document).on(options.events, function (event, xhr, settings, data) {
          if (typeof options.substring !== 'undefined') {
            if (typeof data == 'undefined') return;
            if (data.clearText().indexOf(options.substring.clearText()) !== -1) {
              try {
                options.callback();
              } catch (e) {
                throwError();
              }
            }
          } else {
            try {
              options.callback();
            } catch (e) {
              throwError();
            }
          }
        });
      }
    },
    /**
     * Функция для проверки содержимого блока при его изменении
     * @param options.callback (function) - функция, которая вызывается при изменении блока
     * @param options.element (string) - селектор блока, который нужно проверять
     * @param options.substring (string) - строка, для поиска в изменённом блоке
     */
    dom: function (options) {
      options = typeof options !== 'undefined' ? options : {};
      if (typeof options.element == 'undefined') {
        options.element = document;
      }
      var $element = $(options.element);
      if (typeof options.substring == 'undefined') {
        $element.on('DOMSubtreeModified keyup change', function () {
          try {
            options.callback();
          } catch (e) {
            throwError();
          }
        });
      } else {
        $element.on('DOMSubtreeModified change', function () {
          var text = null;
          if ($element[0].tagName == 'INPUT' || $element[0].tagName == 'TEXTAREA' || $element[0].tagName == 'SELECT') {
            text = $element.val();
          } else {
            text = $element.text();
          }
          if (text.clearText().indexOf(options.substring.clearText()) !== -1) {
            try {
              options.callback();
            } catch (e) {
              throwError();
            }
          }
        });
      }
    },
    /**
     * Функция для вызова callback ф-ции первой при событии click
     * @param options.callback (function) - функция, которая вызывается
     * @param options.element (string) - селектор элемента
     */
    click: function (options) {
      try {
        var $element = $(options.element);
        $element.bindFirst('click', options.callback);
      } catch (e) {
        throwError();
      }
    },
    /**
     * Функция для вызова callback ф-ции первой при событии submit
     * @param options.callback (function) - функция, которая вызывается
     * @param options.element (string) - селектор элемента
     */
    submit: function (options) {
      try {
        var $element = $(options.element);
        $element.bindFirst('submit', options.callback);
      } catch (e) {
        throwError();
      }
    },
    /**
     * Функция для вызова callback ф-ции последней при событии change
     * @param options.callback (function) - функция, которая вызывается
     * @param options.element (string) - селектор элемента
     */
    change: function (options) {
      try {
        var $element = $(options.element);
        $element.bindLast('change', options.callback);
      } catch (e) {
        throwError();
      }
    }
  }
})();