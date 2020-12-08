"use strict"

function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function() {
        callback(webP.height == 2);
    };
    webP.src =
        "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function(support) {
    if (support == true) {
        document.querySelector("body").classList.add("webp");
    } else {
        document.querySelector("body").classList.add("no-webp");
    }
});

// смотрим масив элементов c классом item_animation 
const animItems = document.querySelectorAll('.item_animation');
var leftPointMap = [];
var topPointMap = [];

window.addEventListener('scroll', animOnScroll);

function animOnScroll() {
    let btnStt = document.querySelector(".scroll__to_top");
    btnStt.addEventListener('click', function() {
        document.querySelector("header").scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    });
    (pageYOffset < (window.innerHeight / 2)) ? btnStt.classList.remove('active'): btnStt.classList.add('active'); //активация кновки промотать вверх
    for (let i = 0; i < animItems.length; i++) {
        const animItem = animItems[i];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffSet = offset(animItem).top;
        const animStart = 4;
        let animItemPoint = window.innerHeight - animItemHeight / animStart;
        if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }
        if ((pageYOffset > animItemOffSet - animItemPoint) && pageYOffset < (animItemOffSet + animItemHeight)) {
            animItem.classList.add('animation');
        } else {
            animItem.classList.remove('animation');
        }
    }
    for (let i = 0; i < document.querySelectorAll(".map__points>g").length; i++) {
        let pointMap = document.querySelector("#pm" + (i + 1));
        // поочередное появление поинтов с задеркой 50мс
        if ((($('.map__points').position().top).toFixed()) < (pageYOffset - 80)) {
            setTimeout(() => {
                pointMap.classList.add('animation');
            }, (i + 1) * 50);
        }
    }
}

function offset(el) {
    const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
animOnScroll();




for (let i = 0; i < document.querySelectorAll(".map__points>g").length; i++) {
    let pointMap = document.querySelector("#pm" + (i + 1));
    // набиваем массив кординатами поинтов
    topPointMap.push(($(pointMap).position().top - $('.map__points').position().top).toFixed());
    leftPointMap.push(($(pointMap).position().left - $('.map__points').position().left).toFixed());
    $(pointMap).hover(function() {
        $('.map__point-text' + '[data-id=' + $(this).data('id') + ']').show();
    }, function() {
        $('.map__point-text').hide();
    });

}
//считаем количество страниц pages создаем кнопки по количеству страниц

var paginator = document.querySelector(".slider__pages");
var pages = document.querySelectorAll(".slider__page");
var page = "";
for (let i = 0; i < pages.length; i++) {
    page += "<p data-page=" + i + "  id=\"page" + (i + 1) + "\"class=\"slider__page-button tagline" + "\">" + (i + 1) + "</p>";
}
paginator.innerHTML = page;

//выводим первую страницу
pages[0].style.display = "flex";
// анимация
//1 кнопку активной
var mainPage = document.getElementById("page1");
mainPage.classList.add("active");

//листаем
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
        if (dataNum <= dataPage || dataNum >= dataPage)
            pages[i].style.display = "none";


    }

    for (var i = dataPage; i < pages.length; i++) {
        if (j >= 1) break;
        pages[i].style.display = "flex";
        animOnScroll();
        j++;
    }
}

// меню лендига
let linksMenu = document.querySelectorAll('.header__item > a, .contact__site-map > ul > li > a');
for (let linkMenu of linksMenu) {
    linkMenu.addEventListener('click', function(event) {
        let anchorlinkMenu = linkMenu.getAttribute('href');
        if (anchorlinkMenu !== "index.html")
            event.preventDefault(); //лишаем ссылку свойства ссылки
        anchorlinkMenu = anchorlinkMenu.replace("/", "."); //замена символа

        document.querySelector(anchorlinkMenu).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}









var textPointMap = ['г. Черкесск', 'г. Буденновск', 'г. Анапа', 'г. Волгодонск', 'г. Новочеркасск', 'Дальний Восток, Амурская область', 'г. Волгоград', 'г. Заречный', 'г. Волжский', 'г. Нововоронеж', 'г. Тобольск', 'г. Удомля', 'п/о Челобитьево', 'г. Щекино', 'г. Саратов', 'г. Санкт-Петербург', 'г. Кириши', 'г. Астрахань', 'г. Выборг'];
var page = "";
for (let i = 0; i < document.querySelectorAll(".map__points>g").length; i++) {
    const element = document.querySelectorAll(".map__points>g")[i];

    page += "<div class='map__point-text' data-id='" + element.dataset.id + "' style='top: " +
        (+topPointMap[i] + 220) + "px; left: " + (+leftPointMap[i] + 75) + "px;'>" + textPointMap[i] + "</div>";
}
document.querySelector('.map__point-texts').innerHTML = page;







// const elements = document.querySelectorAll('.slider__subtitle');
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