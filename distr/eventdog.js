/**
 * EventDog v1.0
 * (c) 2015 Cubeline agency. http://www.cubeline.ru/
 * author: Philipp Sirotkin. sirotkin@cubeline.ru
 * License: MIT
 */

eventdog = (function () {
    /**
     * Делает строку с заглавной буквой
     */
    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
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
    return {
        /**
         * Фунеция для проверки содержимого при ajax запросах и выхове нужной ф-ции
         * @param options.callback (function) - функция, которая вызывается при разных событиях
         * @param options.events (string) - события, пишутся через пробел, могут быть (send, success, error, complete)
         * @param options.element (string) - селектор формы, которую нужно отслеживать
         * @param options.url (string) - url, по которому нужно отслеживать запросы
         * @param options.substring (string) - строка, которую нужно искать в ответе запроса
         */
        ajax: function (options) {
            options = typeof options !== 'undefined' ? options : {};
            options.callback = typeof options.callback !== 'undefined' ? options.callback : -1;

            // Проверяем, если указаг параметр events и преобразуем нужные нам события
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
            if(typeof options.element !== 'undefined' && typeof options.url == 'undefined'){
                options.element = $(options.element);
                if(options.element.attr('action').length){
                    options.url = options.element.attr('action');
                }
            }

            // Проверяем на то, какие запросы нам следить (либо по определённой ссылке, либо все)
            if (typeof options.url !== 'undefined') {
                $(document).on(options.events, function (event, xhr, settings, data) {
                    if (settings.url.indexOf(options.url) !== -1) {
                        if (typeof options.substring !== 'undefined') {
                            if(typeof data == 'undefined') return;
                            if(data.clearText().indexOf(options.substring.clearText()) !== -1){
                                try {
                                    options.callback();
                                } catch (e) {
                                    throwError();
                                }
                            }
                        }else{
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
                        if(typeof data == 'undefined') return;
                        if(data.clearText().indexOf(options.substring.clearText()) !== -1){
                            try {
                                options.callback();
                            } catch (e) {
                                throwError();
                            }
                        }
                    }else{
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
         * Фунеция для проверки содержимого блока при его изменении
         * @param options.callback (function) - функция, которая вызывается при изменении блока
         * @param options.element (string) - селектор блока, который нужно проверять
         * @param options.substring (string) - строка, которую нужно в изменённом блоке
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
                    if($element[0].tagName == 'INPUT' || $element[0].tagName == 'TEXTAREA'){
                        text = $element.val();
                    }else{
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
        }
    }
})();