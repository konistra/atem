"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function testWebP(callback) {
  var webP = new Image();

  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };

  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

window.onload = function () {
  $('.preloader').fadeOut('slow');
}; // смотрим масив элементов c классом item_animation 


var animItems = document.querySelectorAll('.item_animation');
var leftPointMap = [];
var topPointMap = [];
window.addEventListener('scroll', animOnScroll);

function animOnScroll() {
  var btnStt = document.querySelector(".scroll__to_top");
  btnStt.addEventListener('click', function () {
    document.querySelector("header").scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }); // .pageYOffset количество прокреченых пикселей
  // .innerHeight внутреняя высота экрана
  // .offsetHeight высота элемента 
  // offset(***).top 

  pageYOffset < window.innerHeight / 2 ? btnStt.classList.remove('active') : btnStt.classList.add('active'); //активация кновки промотать вверх

  for (var i = 0; i < animItems.length; i++) {
    var animItem = animItems[i];
    var animItemHeight = animItem.offsetHeight;
    var animItemOffSet = offset(animItem).top;
    var animStart = 4;
    var animItemPoint = window.innerHeight - animItemHeight / animStart;

    if (animItemHeight > window.innerHeight) {
      animItemPoint = window.innerHeight - window.innerHeight / animStart;
    }

    if (pageYOffset > animItemOffSet - animItemPoint && pageYOffset < animItemOffSet + animItemHeight) {
      // console.log(pageYOffset + ' > ' + animItemOffSet + ' - ' + animItemPoint);
      animItem.classList.add('animation');
    } else {
      animItem.classList.remove('animation');
    }
  }

  var _loop = function _loop(_i) {
    var pointMap = document.querySelector("#pm" + (_i + 1)); // поочередное появление поинтов с задеркой 50мс

    if ($('.map__points').position().top.toFixed() < pageYOffset - 80) {
      setTimeout(function () {
        pointMap.classList.add('animation');
      }, (_i + 1) * 50);
    }
  };

  for (var _i = 0; _i < document.querySelectorAll(".map__points>g").length; _i++) {
    _loop(_i);
  }
}

function offset(el) {
  var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
}

animOnScroll();

for (var i = 0; i < document.querySelectorAll(".map__points>g").length; i++) {
  var pointMap = document.querySelector("#pm" + (i + 1)); // набиваем массив кординатами поинтов

  topPointMap.push(($(pointMap).position().top - $('.map__points').position().top).toFixed());
  leftPointMap.push(($(pointMap).position().left - $('.map__points').position().left).toFixed());
  $(pointMap).hover(function () {
    $('.map__point-text' + '[data-id=' + $(this).data('id') + ']').show();
  }, function () {
    $('.map__point-text').hide();
  });
} //считаем количество страниц pages создаем кнопки по количеству страниц


var paginator = document.querySelector(".slider__pages");
var pages = document.querySelectorAll(".slider__page");
var page = "";

for (var _i2 = 0; _i2 < pages.length; _i2++) {
  page += "<p data-page=" + _i2 + "  id=\"page" + (_i2 + 1) + "\"class=\"slider__page-button tagline" + "\">" + (_i2 + 1) + "</p>";
}

paginator.innerHTML = page; //выводим первую страницу

pages[0].style.display = "flex"; // анимация
//1 кнопку активной

var mainPage = document.getElementById("page1");
mainPage.classList.add("active"); //листаем

function pagination(event) {
  var e = event || window.event;
  var target = e.target;
  var id = target.id;
  if (target.tagName.toLowerCase() != "p") return; //проверка на клик только на <p> с номером

  var dataPage = +target.dataset.page; //получаем data-page на который кликнули

  mainPage.classList.remove("active");
  mainPage = document.getElementById(id);
  mainPage.classList.add("active");
  var j = 0;

  for (var i = 0; i < pages.length; i++) {
    var dataNum = pages[i].dataset.num;
    if (dataNum <= dataPage || dataNum >= dataPage) pages[i].style.display = "none";
  }

  for (var i = dataPage; i < pages.length; i++) {
    if (j >= 1) break;
    pages[i].style.display = "flex";
    animOnScroll();
    j++;
  }
} // меню лендига


var linksMenu = document.querySelectorAll('.header__item > a, .contact__site-map > ul > li > a');

var _iterator = _createForOfIteratorHelper(linksMenu),
    _step;

try {
  var _loop2 = function _loop2() {
    var linkMenu = _step.value;
    linkMenu.addEventListener('click', function (event) {
      var anchorlinkMenu = linkMenu.getAttribute('href');
      if (anchorlinkMenu !== "index.html") event.preventDefault(); //лишаем ссылку свойства ссылки

      anchorlinkMenu = anchorlinkMenu.replace("/", "."); //замена символа

      document.querySelector(anchorlinkMenu).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  };

  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    _loop2();
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}

var textPointMap = ['г. Черкесск', 'г. Буденновск', 'г. Анапа', 'г. Волгодонск', 'г. Новочеркасск', 'Дальний Восток, Амурская область', 'г. Волгоград', 'г. Заречный', 'г. Волжский', 'г. Нововоронеж', 'г. Тобольск', 'г. Удомля', 'п/о Челобитьево', 'г. Щекино', 'г. Саратов', 'г. Санкт-Петербург', 'г. Кириши', 'г. Астрахань', 'г. Выборг'];
var page = "";

for (var _i3 = 0; _i3 < document.querySelectorAll(".map__points>g").length; _i3++) {
  var element = document.querySelectorAll(".map__points>g")[_i3];

  page += "<div class='map__point-text' data-id='" + element.dataset.id + "' style='top: " + (+topPointMap[_i3] + 220) + "px; left: " + (+leftPointMap[_i3] + 75) + "px;'>" + textPointMap[_i3] + "</div>";
}

document.querySelector('.map__point-texts').innerHTML = page; // const elements = document.querySelectorAll('.slider__subtitle');
// const collection = [];
// for (let i = 0; i < elements.length; i++) {
//     const key = elements[i].dataset.id;
//     if (!collection[key]) collection[key] = [];
//     collection[key].push(elements[i].innerText);
// }
// var resultHtml = Object.keys(collection)
//     .reduce((result, key) => {
//         return result + "<div class='map__point-text' data-id='" + key + "' style='top: " + (+topPointMap[+key - 1] + 180) + "px; left: " + (+leftPointMap[+key - 1] + 65) + "px;'>" + collection[key].join('') + "</div>";
//     }, '');
// document.querySelector('.map__maps1').innerHTML = resultHtml;