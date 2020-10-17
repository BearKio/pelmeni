"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

window.onload = function () {
  var app = new Vue({
    el: '#main',
    data: {
      heightPromoSection: 0,
      categoriesMenu: [],
      sectionMenu: [],
      productsBlocks: [],
      currentProductsBlock: [],
      sectionMenuTitle: 'Наше меню',
      numberInCart: 0
    },
    methods: {
      getHeightPromoSection: function getHeightPromoSection() {
        var promoSection = document.querySelector('.promo');
        this.heightPromoSection = promoSection.clientHeight;
      },
      fixedHeader: function fixedHeader() {
        var header = document.querySelector('.header');

        if (window.pageYOffset > this.heightPromoSection - 200) {
          header.classList.add('header--fixed');
        } else {
          if (header.classList.contains('header--fixed')) {
            header.classList.remove('header--fixed');
          }
        }
      },
      initEventsClick: function initEventsClick(arr, section) {
        var _this = this;

        if (arr.length > 1) {
          arr.forEach(function (item) {
            item.addEventListener('click', function (event) {
              event.preventDefault();

              if (document.querySelector('body').classList.contains('menu-active')) {
                document.querySelector('body').classList.remove('menu-active');
              }

              _this.scrollInSection(section);
            });
          });
        } else {
          arr[0].addEventListener('click', function (event) {
            event.preventDefault();

            if (document.querySelector('body').classList.contains('menu-active')) {
              document.querySelector('body').classList.remove('menu-active');
            }

            _this.scrollInSection(section);
          });
        }
      },
      initEventsScroll: function initEventsScroll() {
        var aboutLink = document.querySelectorAll('.link-about');
        var sectionWhy = document.querySelector('.why');
        this.initEventsClick(aboutLink, sectionWhy);
        var menuLink = document.querySelectorAll('.link-menu');
        var sectionMenu = document.querySelector('.menu');
        this.initEventsClick(menuLink, sectionMenu);
        var deliveryLink = document.querySelectorAll('.link-delivery');
        var sectionDelivery = document.querySelector('.delivery');
        this.initEventsClick(deliveryLink, sectionDelivery);
        var contactsLink = document.querySelectorAll('.link-contacts');
        var sectionFooter = document.querySelector('.footer');
        this.initEventsClick(contactsLink, sectionFooter);
        var orderLink = document.querySelectorAll('.link-order');
        var sectionOrder = document.querySelector('.order');
        this.initEventsClick(orderLink, sectionOrder);
      },
      getCoords: function getCoords(elem) {
        var box = elem.getBoundingClientRect();
        return box.top + pageYOffset;
      },
      scrollInSection: function scrollInSection(section) {
        var top = this.getCoords(section);
        window.scrollTo({
          top: top - 100,
          // height fixed header
          behavior: 'smooth'
        });
      },
      toggleAdaptiveMenu: function toggleAdaptiveMenu() {
        document.querySelector('body').classList.toggle('menu-active');
      },
      openProducts: function openProducts(event) {
        var title = event.target.textContent;
        var currentCategory = event.target.parentElement;
        var currentCategoryId = currentCategory.getAttribute('data-id');
        this.currentProductsBlock = this.productsBlocks.filter(function (item) {
          if (item.getAttribute('data-id') === currentCategoryId) {
            return item;
          }
        });

        if (this.currentProductsBlock.length) {
          this.sectionMenuTitle = title;
          this.categoriesMenu.style.display = 'none';
          this.currentProductsBlock[0].style.height = 'auto';

          if (window.innerWidth < 1615) {
            this.currentProductsBlock[0].classList.add('catalog-block--active');
          }

          this.sectionMenu.classList.add('menu--active');
          this.scrollInSection(this.sectionMenu);
        }
      },
      closeProductsBlock: function closeProductsBlock() {
        this.sectionMenuTitle = 'Наше меню';
        this.categoriesMenu.style.display = 'flex';
        this.currentProductsBlock[0].style.height = '0';

        if (this.currentProductsBlock[0].classList.contains('catalog-block--active')) {
          this.currentProductsBlock[0].classList.remove('catalog-block--active');
        }

        this.sectionMenu.classList.remove('menu--active');
      },
      addProductToCart: function addProductToCart(event) {
        this.numberInCart++;
        var item = this.getCatalogItem(event.target);
        var id = item.getAttribute('data-id');
        console.log(id);
      },
      getCatalogItem: function getCatalogItem(target) {
        if (!target.hasAttribute('data-id')) {
          target = target.parentElement;
          return this.getCatalogItem(target);
        } else {
          return target;
        }
      }
    },
    mounted: function mounted() {
      var _this2 = this;

      this.initEventsScroll();
      this.getHeightPromoSection();
      window.addEventListener('resize', function () {
        _this2.getHeightPromoSection();
      });
      window.addEventListener('scroll', this.fixedHeader);
      this.categoriesMenu = document.querySelector('.menu-block');
      this.sectionMenu = document.querySelector('.menu');
      this.productsBlocks = this.sectionMenu.querySelectorAll('.catalog-block');
      this.productsBlocks = _toConsumableArray(this.productsBlocks);
    }
  });

  try {
    // Slider Best Products
    var bestProductSlider = document.querySelector('.best-slider');

    var initBestSlider = function initBestSlider(flag, section) {
      if (flag) {
        var parent = section.parentElement;
        var arrowNext = parent.querySelector('.arrow-next');
        var arrowPrev = parent.querySelector('.arrow-prev');
        $(section).slick({
          dots: true,
          infinite: false,
          arrows: true,
          nextArrow: $(arrowNext),
          prevArrow: $(arrowPrev),
          speed: 300,
          slidesToShow: 3,
          slidesToScroll: 1,
          responsive: [{
            breakpoint: 1200,
            settings: {
              slidesToShow: 2
            }
          }, {
            breakpoint: 800,
            settings: {
              slidesToShow: 1
            }
          }]
        });
      } else {
        $(section).slick('unslick');
      }
    };

    if (window.innerWidth < 1615) {
      bestProductSlider && initBestSlider(true, bestProductSlider);
    }

    window.addEventListener('resize', function () {
      if (window.innerWidth < 1615) {
        if (!bestProductSlider.classList.contains('slick-initialized')) {
          bestProductSlider && initBestSlider(true, bestProductSlider);
        }
      } else {
        if (bestProductSlider.classList.contains('slick-initialized')) {
          bestProductSlider && initBestSlider(false, bestProductSlider);
        }
      }
    });
  } catch (e) {
    console.log(e + 'best slider');
  }

  try {
    //Slider Products
    var productsSliders = document.querySelectorAll('.product-slider');

    var initProductsSlider = function initProductsSlider(flag, section) {
      if (flag) {
        var parent = section.parentElement;
        var arrowNext = parent.querySelector('.arrow-next');
        var arrowPrev = parent.querySelector('.arrow-prev');
        $(section).slick({
          dots: true,
          infinite: false,
          arrows: true,
          nextArrow: $(arrowNext),
          prevArrow: $(arrowPrev),
          speed: 300,
          slidesToShow: 3,
          slidesToScroll: 1,
          responsive: [{
            breakpoint: 1200,
            settings: {
              slidesToShow: 2
            }
          }, {
            breakpoint: 800,
            settings: {
              slidesToShow: 1
            }
          }]
        });
      } else {
        $(section).slick('unslick');
      }
    };

    if (window.innerWidth < 1615) {
      productsSliders && productsSliders.forEach(function (slider) {
        initProductsSlider(true, slider);
      });
    }

    window.addEventListener('resize', function () {
      if (window.innerWidth < 1615) {
        productsSliders.forEach(function (slider) {
          if (!slider.classList.contains('slick-initialized')) {
            initProductsSlider(true, slider);
          }
        });
      } else {
        productsSliders.forEach(function (slider) {
          if (slider.classList.contains('slick-initialized')) {
            initProductsSlider(false, slider);
          }
        });
      }
    });
  } catch (e) {
    console.log(e + 'products sliders');
  }
};