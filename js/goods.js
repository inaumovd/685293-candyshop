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
  'Острый язычок'];
var GOODS_PICTURES = [
  'img/cards/gum-cedar.jpg',
  'img/cards/gum-chile.jpg',
  'img/cards/gum-eggplant.jpg',
  'img/cards/gum-mustard.jpg',
  'img/cards/gum-portwine.jpg',
  'img/cards/gum-wasabi.jpg',
  'img/cards/ice-cucumber.jpg',
  'img/cards/ice-eggplant.jpg',
  'img/cards/ice-garlic.jpg',
  'img/cards/ice-italian.jpg',
  'img/cards/ice-mushroom.jpg',
  'img/cards/ice-pig.jpg',
  'img/cards/marmalade-beer.jpg',
  'img/cards/marmalade-caviar.jpg',
  'img/cards/marmalade-corn.jpg',
  'img/cards/marmalade-new-year.jpg',
  'img/cards/marmalade-sour.jpg',
  'img/cards/marshmallow-bacon.jpg',
  'img/cards/marshmallow-beer.jpg',
  'img/cards/marshmallow-shrimp.jpg',
  'img/cards/marshmallow-spicy.jpg',
  'img/cards/marshmallow-wine.jpg',
  'img/cards/soda-bacon.jpg',
  'img/cards/soda-celery.jpg',
  'img/cards/soda-cob.jpg',
  'img/cards/soda-garlic.jpg',
  'img/cards/soda-peanut-grapes.jpg',
  'img/cards/soda-russian.jpg'];
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
  'виллабаджо'];
var currentContents;
var catalogCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.catalog__card');
var cartCardTemplate = document.querySelector('#card-order')
  .content
  .querySelector('.goods_card');
var cardsCatalog = document.querySelector('.catalog__cards');
var cartCardsCatalog = document.querySelector('.goods__cards');

var getRundomInt = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};

var getRandomItem = function (items) {
  return items[Math.round(Math.random() * (items.length - 1))];
};

var getContents = function (contentsList) {
  var contentsQuantity = getRundomInt(0, contentsList.length);
  currentContents = getRandomItem(contentsList);
  for (var i = 0; i < contentsQuantity; i++) {
    var newContent = getRandomItem(contentsList);
    currentContents = currentContents + ', ' + newContent;
  }
  return currentContents;
};

var getNutritionFacts = function () {
  var nutritionFacts = {
    sugar: Boolean(getRundomInt(0, 1)),
    energy: getRundomInt(70, 500),
    contents: getContents(CONTENTS_LIST),
  };
  return nutritionFacts;
};

var getRating = function () {
  var rating = {
    value: getRundomInt(1, 5),
    number: getRundomInt(10, 900)
  };
  return rating;
};

var getGoods = function () {
  var goods = {
    name: getRandomItem(GOODS_NAMES),
    picture: getRandomItem(GOODS_PICTURES),
    amount: getRundomInt(0, 20),
    price: getRundomInt(100, 1500),
    weight: getRundomInt(30, 300),
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

  if (item.rating.value === 1) {
    catalogItem.querySelector('.stars__rating').classList.add('stars__rating--one');
  } else if (item.rating.value === 2) {
    catalogItem.querySelector('.stars__rating').classList.add('stars__rating--two');
  } else if (item.rating.value === 3) {
    catalogItem.querySelector('.stars__rating').classList.add('stars__rating--three');
  } else if (item.rating.value === 4) {
    catalogItem.querySelector('.stars__rating').classList.add('stars__rating--four');
  } else {
    catalogItem.querySelector('.stars__rating').classList.add('stars__rating--five');
  }

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
