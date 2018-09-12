'use strict';

var GOODS_NAMES = [
  'Чесночные сливки',
  'Огуречный педант',
  'Молочная хрюша',
  'Грибной шейк',
  'Баклажановое безумие',
  'Паприколу итальяно',
  'Нинзя-удар васаби',
  'Хитрый баклажан',
  'Горчичный вызов',
  'Кедровая липучка',
  'Корманный портвейн',
  'Чилийский задира',
  'Беконовый взрыв',
  'Арахис vs виноград',
  'Сельдерейная душа',
  'Початок в бутылке',
  'Чернющий мистер чеснок',
  'Раша федераша',
  'Кислая мина',
  'Кукурузное утро',
  'Икорный фуршет',
  'Новогоднее настроение',
  'С пивком потянет',
  'Мисс креветка',
  'Бесконечный взрыв',
  'Невинные винные',
  'Бельгийское пенное',
  'Острый язычок'
  ];
var GOODS_PICTURES = [
  'gum-cedar.jpg',
  'gum-chile.jpg',
  'gum-eggplant.jpg',
  'gum-mustard.jpg',
  'gum-portwine.jpg',
  'gum-wasabi.jpg',
  'ice-cucumber.jpg',
  'ice-eggplant.jpg',
  'ice-garlic.jpg',
  'ice-italian.jpg',
  'ice-mushroom.jpg',
  'ice-pig.jpg',
  'marmalade-beer.jpg',
  'marmalade-caviar.jpg',
  'marmalade-corn.jpg',
  'marmalade-new-year.jpg',
  'marmalade-sour.jpg',
  'marshmallow-bacon.jpg',
  'marshmallow-beer.jpg',
  'marshmallow-shrimp.jpg',
  'marshmallow-spicy.jpg',
  'marshmallow-wine.jpg',
  'soda-bacon.jpg',
  'soda-celery.jpg',
  'soda-cob.jpg',
  'soda-garlic.jpg',
  'soda-peanut-grapes.jpg',
  'soda-russian.jpg'
  ];
var CONTENTS_LIST = [
  'молоко',
  'сливки',
  'вода',
  'пищевой краситель',
  'патока',
  'ароматизатор бекона',
  'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному',
  'ароматизатор картофеля',
  'лимонная кислота',
  'загуститель',
  'эмульгатор',
  'консервант: сорбат калия',
  'посолочная смесь: соль, нитрит натрия',
  'ксилит',
  'карбамид',
  'вилларибо',
  'виллабаджо'
  ];
var currentContents;
var catalogCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.catalog__card');
var cartCardTemplate = document.querySelector('#card-order')
  .content
  .querySelector('.goods_card');
var cardsCatalog = document.querySelector('.catalog__cards');
var cartCardsCatalog = document.querySelector('.goods__cards');

var getRandomInt = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};

var getRandomItem = function (items) {
  return items[Math.round(Math.random() * (items.length - 1))];
};

var getContents = function (contentsList) {
  var contentsQuantity = getRandomInt(0, contentsList.length);
  currentContents = getRandomItem(contentsList);
  for (var i = 0; i < contentsQuantity; i++) {
    var newContent = getRandomItem(contentsList);
    currentContents = currentContents + ', ' + newContent;
  }
  return currentContents;
};

var getNutritionFacts = function () {
  var nutritionFacts = {
    sugar: Boolean(getRandomInt(0, 1)),
    energy: getRandomInt(70, 500),
    contents: getContents(CONTENTS_LIST),
  };
  return nutritionFacts;
};

var getRating = function () {
  var rating = {
    value: getRandomInt(1, 5),
    number: getRandomInt(10, 900)
  };
  return rating;
};

var getGoods = function () {
  var goods = {
    name: getRandomItem(GOODS_NAMES),
    picture: getRandomItem(GOODS_PICTURES),
    amount: getRandomInt(0, 20),
    price: getRandomInt(100, 1500),
    weight: getRandomInt(30, 300),
    rating: getRating(),
    nutritionFacts: getNutritionFacts()
  };
  return goods;
};

var getGoodsList = function (quantity) {
  var goodsList = [];
  for (var i = 0; i < quantity; i++) {
    goodsList[i] = getGoods();
  }
  return goodsList;
};

var renderCatalogItem = function (item) {
  var catalogItem = catalogCardTemplate.cloneNode(true);

  if (item.amount === 0) {
    catalogItem.classList.add('card--soon');
  } else if (item.amount > 1 && item.amount < 5) {
    catalogItem.classList.add('card--little');
  } else {
    catalogItem.classList.add('card--in-stock');
  }

  catalogItem.querySelector('.card__title').textContent = item.name;
  catalogItem.querySelector('.card__price').innerHTML = item.price + '<span class="card__currency">&#x20BD;</span> <span class="card__weight">/' + item.weight + 'Г</span>';

  catalogItem.querySelector('.stars__rating').classList.remove('stars__rating--five');

  var classRatingSuffix;
  switch(item.rating.value) {
    case 1: classRatingSuffix = 'one'; break;
    case 2: classRatingSuffix = 'two'; break;
    case 3: classRatingSuffix = 'three'; break;
    case 4: classRatingSuffix = 'four'; break;
    case 5: classRatingSuffix = 'five'; break;
  }
  catalogItem.querySelector('.stars__rating').classList.add('stars__rating--' + classRatingSuffix);

  catalogItem.querySelector('.star__count').textContent = item.rating.number;

  if (item.nutritionFacts.sugar) {
    catalogItem.querySelector('.card__characteristic').textContent = 'Содержит сахар';
  } else {
    catalogItem.querySelector('.card__characteristic').textContent = 'Без сахара';
  }
  return catalogItem;
};

var appendCatalog = function (catalogItems) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < catalogItems.length; i++) {
    fragment.appendChild(renderCatalogItem(catalogItems[i]));
  }
  cardsCatalog.appendChild(fragment);
};

var renderCartItem = function (item) {
  var cartItem = cartCardTemplate.cloneNode(true);
  cartItem.querySelector('.card-order__title').textContent = item.name;
  cartItem.querySelector('.card-order__price').innerHTML = item.price + '<span class="card__currency">&#x20BD;</span>';
  return cartItem;
};

var appendCart = function (cartItems) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < cartItems.length; i++) {
    fragment.appendChild(renderCartItem(cartItems[i]));
  }
  cartCardsCatalog.appendChild(fragment);
};

cardsCatalog.classList.remove('catalog__cards--load');
document.querySelector('.catalog__load').classList.add('visually-hidden');

appendCatalog(getGoodsList(26));

cartCardsCatalog.classList.remove('goods__cards--empty');
document.querySelector('.goods__card-empty').classList.add('visually-hidden');

appendCart(getGoodsList(3));
