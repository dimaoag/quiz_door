'use strict';

svg4everybody();

function scrollToDiv(element, navheight){
  if (typeof element === 'undefined') return undefined;
  var offset = element.offset();
  var offsetTop = offset.top;
  var totalScroll = offsetTop-navheight;
  var speed = 700;
  if(totalScroll < 1000) speed = 500;

  $('body,html').animate({
    scrollTop: totalScroll
  }, speed);
}

function createSwiperNav(target, arrows, pagination) {
  if (typeof target === 'object') {
    var slider = target
  } else {
    var slider = document.querySelector(target);
  }
  if (arrows || pagination) {
    var nav = document.createElement('div');
    nav.className = 'b-slider__nav';
  }

  if (arrows) {
    var arrowPrev = document.createElement('div');
    arrowPrev.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="34" viewBox="0 0 252.1 477.2"><path d="M3.9 248.1L229 473.2a13.2 13.2 0 0 0 9.5 4 13.6 13.6 0 0 0 9.5-23.1L32.5 238.6 248 23.1A13.506 13.506 0 0 0 228.9 4L3.8 229.1a13.4 13.4 0 0 0 .1 19z"/></svg>';
    arrowPrev.className = 'b-slider__prev';

    var arrowNext = document.createElement('div');
    arrowNext.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="34" viewBox="0 0 252.1 477.2"><path d="M248.1 229.1L23 4A13.506 13.506 0 1 0 3.9 23.1l215.5 215.5L3.9 454.1a13.6 13.6 0 0 0 9.5 23.1 13.2 13.2 0 0 0 9.5-4L248 248.1a13.4 13.4 0 0 0 .1-19z"/></svg>';
    arrowNext.className = 'b-slider__next';

    nav.appendChild(arrowPrev);
    nav.appendChild(arrowNext);
  }

  if (pagination) {
    var pagination = document.createElement('div');
    pagination.className = 'b-slider__pagination';

    nav.appendChild(pagination);
  }
  if (arrows || pagination) {
    slider.appendChild(nav);
  }
}

$(document).ready(function(){
  
  if (document.documentMode || /Edge/.test(navigator.userAgent)) {
    var IE = true;
  } else {
    var IE = false;
  }

  if (!IE) {
    $('.b-header').parallax({
      src: 'img/header-bg.jpg',
      speed: 0.3,
      afterRender: function() {
        $('.b-header').css('background-image', 'none');
      }
    });
    $('.b-contract').parallax({
      src: 'img/contract-bg.jpg',
      speed: 0.3,
      afterRender: function() {
        $('.b-contract').css('background-image', 'none');
      }
    });
    $('.b-special').parallax({
      src: 'img/special-bg.jpg',
      speed: 0.3,
      afterRender: function() {
        $('.b-special').css('background-image', 'none');
      }
    });
  }

  if ($(window).outerWidth() > 1000) {
    // new Waypoint({
    //   element: $('.b-services__list')[0],
    //   handler: function(direction) {
    //     $('.b-services__list').find('.b-service').each(function(i){
    //       $(this).css('animation-delay', i * 0.3 + 's').addClass('animated zoomIn');
    //     });
    //     this.destroy();
    //   },
    //   offset: '100%'
    // });

    new Waypoint({
      element: $('.b-adv')[0],
      handler: function(direction) {
        $('.b-adv__title').each(function(){
          $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
          },
          {
            duration: 2000,
            easing: 'swing',
            step: function(now) {
              $(this).text(Math.ceil(now))
            }
          })
        });
        this.destroy();
      },
      offset: '100%'
    });
  }
  
  $('.b-menu__link, .js-scroll').on('click', function(e){
    e.preventDefault();
    var el = $(this).attr('href');
    var elWrapped = $(el);
    scrollToDiv(elWrapped, 0);
  });

  $('.b-catalog__list').each(function(){
    createSwiperNav(this, true);
    var $parent = $(this);
    var $next = $parent.find('.b-slider__next');
    var $prev = $parent.find('.b-slider__prev');
    var swiper = new Swiper(this.firstElementChild, {
      slidesPerView: 4,
      loop: true,
      speed: 600,
      spaceBetween: 50,
      slidesPerGroup: 4,
      navigation: {
        nextEl: $next,
        prevEl: $prev
      },
      breakpoints: {
        1700: {
          spaceBetween: 20
        },
        959: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 20,
        },
        767: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 20,
        },
        479: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 20,
        }
      },
    });
  });

  // $('.b-responses__list').each(function(){
  //   createSwiperNav(this, true, true);
  //   var $parent = $(this);
  //   var $next = $parent.find('.b-slider__next');
  //   var $prev = $parent.find('.b-slider__prev');
  //   var $pagination = $parent.find('.b-slider__pagination');
  //   var swiper = new Swiper(this.firstElementChild, {
  //     slidesPerView: 3,
  //     loop: true,
  //     speed: 600,
  //     navigation: {
  //       nextEl: $next,
  //       prevEl: $prev
  //     },
  //     pagination: {
  //       el: $pagination,
  //       clickable: true
  //     },
  //     breakpoints: {
  //       767: {
  //         slidesPerView: 2
  //       },
  //       479: {
  //         slidesPerView: 1
  //       }
  //     }
  //   });
  // });

  $('a, img').on('dragstart', function(e){
    e.preventDefault();
  });

  $('.js-btn').on('click', function(e){
    e.preventDefault();
    var $this = $(this);
    $.magnificPopup.open({
      items: {
        src: $this.attr('href')
      },
      type: 'inline',
      removalDelay: 400,
      mainClass: 'mfp-zoom-in',
      autoFocusLast: false
    })
  });

  $('.js-iframe').on('click', function(e){
    e.preventDefault();
    var $target = $(this);
    var src = $(this).attr('href');
    var $iframe = $target.find('iframe');
    if ($iframe.length > 0) {
      $iframe.attr('src', src);
    } else {
      $target.append('<iframe src=' + src +'></iframe>');
      $target.addClass('hide-bg');
    }
  });

  $('[data-tab-link]').on('click', function(e){
      e.preventDefault();

      var $target = $(this);

      if($target.hasClass('active')) {return;}

      var link = $target.data('tab-link');

      var wrapper = $target.closest('[data-tab]');

      var items = wrapper.find('[data-tab-item]');
      var links = wrapper.find('[data-tab-link]');

      items.removeClass('active');
      links.removeClass('active');

      $target.addClass('active');

      items.map(function(item){
          if( items[item].getAttribute('data-tab-item') === link ) {
              items[item].classList.add('active')
          }
      })
  });

  $('[data-video-link]').on('click', function(e){
      e.preventDefault();

      var $target = $(this);
      var src = $target.data('video-link');

      var wrapper = $target.closest('[data-video]');
      var container = wrapper.find('[data-video-container]');
      var $iframe = container.find('iframe');

      if ($iframe.length > 0) {
          $iframe.attr('src', src);
      } else {
          container.append('<iframe src=' + src +'></iframe>');
          container.addClass('hide-bg');
      }

      console.log(src);
  });


  $('.js-img').on('click', function(e) {
    e.preventDefault();
  }).magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    removalDelay: 300,
    tLoading: "",
    mainClass: 'mfp-zoom-in',
    autoFocusLast: false,
    callbacks: {
      imageLoadComplete: function() {
        var self = this;
        setTimeout(function() {
          self.wrap.addClass('mfp-image-loaded');
        }, 16);
      },
      close: function() {
        this.wrap.removeClass('mfp-image-loaded');
      },
    },
  });
  
  $.validator.addMethod("myphone", function (phone_number, element) {
    phone_number = phone_number.replace(/\s+/g, "");
    return this.optional(element) || phone_number.length > 9 && /^[0-9,+,-]+$/.test(phone_number);
  },	"Неверный формат телефона");

  jQuery.validator.setDefaults({

    errorElement: 'div',
    wrapper: 'div',

    onfocusout: function(element) {
      if (!this.checkable(element) && element.name in this.submitted) {
        this.element(element);
      }
    },

    errorPlacement: function(error, element) {
      $(element).closest('.b-field').append(error);
      //$(element).closest('.b-field').addClass('has-error');
      error.addClass('b-field__error');
    },

  });



  $('.js-form').each(function(){
    var $this = $(this);
    $this.validate({
      highlight: function(element) {
        setTimeout(function(){
          $(element).closest('.b-field').addClass('has-error');
        }, 100)
      },
      unhighlight: function(element) {
        $(element).closest('.b-field').removeClass('has-error');
      },
      onkeyup: false,
      onclick: false,
      rules: {
        Имя: {
          required: true,
        },
        Телефон: {
          required: true,
          myphone: true
        },
      },
      messages: {
        Имя: {
          required: "Введите имя",
        },
        Телефон: {
          required: "Введите номер телефона"
        }
      },
      submitHandler: function(form) {
        $.ajax({
          type: "POST",
          url: "mail.php",
          data: $(form).serialize()
        }).done(function() {
          $.magnificPopup.open({
            items: {
              src: '#popup-thanks'
            },
            type: 'inline',
            mainClass: 'mfp-zoom-in',
            removalDelay: 400,
            autoFocusLast: false
          });
          ga('send', 'event', 'catalog', 'send');
          $this.trigger("reset");
        });
        return false;
      },
    });
  });	
});


 $('.swiper-wrapper').each(function(){
    $(this).magnificPopup({
      type: 'image',
      delegate: '.b-gallery__item',
      gallery: {
        enabled: true,
        tPrev: '',
        tNext: '',
        tCounter: '',
        arrowMarkup: '<button type="button" class="mfp-arrow mfp-arrow-%dir%"><svg class="svg" width="30" height="30"><use xlink:href="img/sprite.svg#arrow-%dir%"></use></svg></button>',
      },
      closeOnContentClick: true,
      removalDelay: 300,
      tLoading: "",
      mainClass: 'mfp-zoom-in-gallery',
      autoFocusLast: false,
      callbacks: {
        elementParse: function(item) {
          // the class name
          if($(item.el).hasClass('is-video')) {
            item.type = 'iframe';
          } else {
            item.type = 'image';
          }
        },
        imageLoadComplete: function() {
          var self = this;
          setTimeout(function() {
            self.wrap.addClass('mfp-image-loaded');
          }, 16);
        },
        close: function() {
          this.wrap.removeClass('mfp-image-loaded');
        },
        open: function() {
          $.magnificPopup.instance.next = function() {
              var self = this;
              self.wrap.removeClass('mfp-image-loaded');
              setTimeout(function() { $.magnificPopup.proto.next.call(self); }, 120);
          }
          $.magnificPopup.instance.prev = function() {
              var self = this;
              self.wrap.removeClass('mfp-image-loaded');
              setTimeout(function() { $.magnificPopup.proto.prev.call(self); }, 120);
          }
        },
        // imageLoadComplete: function() {
        //     var self = this;
        //     setTimeout(function() { self.wrap.addClass('mfp-image-loaded'); }, 16);
        // }
      },
    });
  });


/*
 jQuery Masked Input Plugin
 Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
 Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
 Version: 1.4.1
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(o&&o.length&&o.length>a.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){B.get(0)===document.activeElement&&(z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a))},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});

((function ($) {
    $(function(){

        $(document).ready(function() {
            $("[data-mask='callback-catalog-phone']").mask("+3 80 9 9 - 9 9 9 - 9 9 - 9 9");
        });
    })
})(jQuery));


// $('.carousel-b-item').each(function(){
//     $(this).magnificPopup({
//         type: 'image',
//         delegate: '.carousel-b-item',
//         gallery: {
//             enabled: true,
//             // arrowMarkup: '<button type="button" class="mfp-arrow mfp-arrow-%dir%"><svg class="svg" width="30" height="30"><use xlink:href="img/sprite.svg#arrow-%dir%"></use></svg></button>',
//         },
//         closeOnContentClick: true,
//         removalDelay: 300,
//         tLoading: "",
//         mainClass: 'mfp-zoom-in-gallery',
//         autoFocusLast: false,
//         callbacks: {
//             elementParse: function(item) {
//                 // the class name
//                 if($(item.el).hasClass('is-video')) {
//                     item.type = 'iframe';
//                 } else {
//                     item.type = 'image';
//                 }
//             },
//             imageLoadComplete: function() {
//                 var self = this;
//                 setTimeout(function() {
//                     self.wrap.addClass('mfp-image-loaded');
//                 }, 16);
//             },
//             close: function() {
//                 this.wrap.removeClass('mfp-image-loaded');
//             },
//             open: function() {
//                 $.magnificPopup.instance.next = function() {
//                     var self = this;
//                     self.wrap.removeClass('mfp-image-loaded');
//                     setTimeout(function() { $.magnificPopup.proto.next.call(self); }, 120);
//                 }
//                 $.magnificPopup.instance.prev = function() {
//                     var self = this;
//                     self.wrap.removeClass('mfp-image-loaded');
//                     setTimeout(function() { $.magnificPopup.proto.prev.call(self); }, 120);
//                 }
//             },
//             // imageLoadComplete: function() {
//             //     var self = this;
//             //     setTimeout(function() { self.wrap.addClass('mfp-image-loaded'); }, 16);
//             // }
//         },
//     });
// });


$('.doors-gallery').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    prevArrow: $('.doors-gallery-prev'),
    nextArrow: $('.doors-gallery-next'),
    responsive: [
        {
            breakpoint: 768,
            settings: {
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
            }
        }
    ]
});


baguetteBox.run('.doors-gallery', {
    animation: 'slideIn',
});

baguetteBox.run('.carousel-container-1', {
    animation: 'fadeIn',
});
baguetteBox.run('.carousel-container-2', {
    animation: 'fadeIn',
});
baguetteBox.run('.carousel-container-3', {
    animation: 'fadeIn',
});
baguetteBox.run('.carousel-container-4', {
    animation: 'fadeIn',
});
baguetteBox.run('.carousel-container-5', {
    animation: 'fadeIn',
});









//hide finale page
$('.final-page').hide();




//insert percents in span and width
var countSlides1 = $('#slides1 .slide-quiz').length - 1;
var currentCount1 = 0;
$('.quiz__progress1').each(function (el) {
    $(this).find('.progress-bar__label span').html(currentCount1 + '%');
    $(this).find('.progress-bar__field span').css('width',currentCount1 + '%');
    currentCount1 += Math.round(100 / countSlides1);
});
currentCount1 = 0;
$('.progress-bar_mobile1').each(function (el) {
    $(this).find('.progress-bar__label span').html(currentCount1 + '%');
    $(this).find('.progress-bar__field span').css('width',currentCount1 + '%');
    currentCount1 += Math.round(100 / countSlides1);
});


//insert percents in span and width
var countSlides2 = $('#slides2 .slide-quiz').length - 1;
var currentCount2 = 0;
$('.quiz__progress2').each(function (el) {
    $(this).find('.progress-bar__label span').html(currentCount2 + '%');
    $(this).find('.progress-bar__field span').css('width',currentCount2 + '%');
    currentCount2 += Math.round(100 / countSlides2);
});
currentCount2 = 0;
$('.progress-bar_mobile2').each(function (el) {
    $(this).find('.progress-bar__label span').html(currentCount2 + '%');
    $(this).find('.progress-bar__field span').css('width',currentCount2 + '%');
    currentCount2 += Math.round(100 / countSlides2);
});



//next slide
function nextSlide1(currentSlide2) {
    var slides2 = $('#slides1 .slide-quiz');
    if (currentSlide2 == (slides2.length - 2)){
        $('.final-page').show();
    }
    var currentSlide = $('#slides1').children().eq(currentSlide2);
    var buttonNext = currentSlide.find('.quiz-buttons__button_next');
    if(buttonNext.is('[disabled=disabled]')){
        // return false;
    } else {
        currentSlide.removeClass('showing');
        var nextSlide = (currentSlide2 + 1) % slides2.length;
        $('#slides1').children().eq(nextSlide).addClass("showing");
    }
}

//next slide
function nextSlide2(currentSlide2) {
    var slides2 = $('#slides2 .slide-quiz');
    if (currentSlide2 == (slides2.length - 2)){
        $('.final-page').show();
    }
    var currentSlide = $('#slides2').children().eq(currentSlide2);
    var buttonNext = currentSlide.find('.quiz-buttons__button_next');
    if(buttonNext.is('[disabled=disabled]')){
        // return false;
    } else {
        currentSlide.removeClass('showing');
        var nextSlide = (currentSlide2 + 1) % slides2.length;
        $('#slides2').children().eq(nextSlide).addClass("showing");
    }
}




//next prev slide
function prewSlide1(currentSlide2) {
    var slides2 = $('#slides1 .slide-quiz');
    var currentSlide = $('#slides1').children().eq(currentSlide2);
    currentSlide.removeClass('showing');
    var prevSlide = currentSlide2 = (currentSlide2 - 1) % slides2.length;
    $('#slides1').children().eq(prevSlide).addClass("showing");
}

//next prev slide
function prewSlide2(currentSlide2) {
    var slides2 = $('#slides2 .slide-quiz');
    var currentSlide = $('#slides2').children().eq(currentSlide2);
    currentSlide.removeClass('showing');
    var prevSlide = currentSlide2 = (currentSlide2 - 1) % slides2.length;
    $('#slides2').children().eq(prevSlide).addClass("showing");
}




//click on answer
function diss(current, variantGroupId, variandId) {


    //is checkbox
    if ($('#'+variandId+' input').is(':checkbox')){


        //is disabled
        if (typeof $(current).data('disabled') !== 'undefined') {

            if (!$('#'+variandId+' input').is(":checked")) {
                if (typeof $('#'+variantGroupId).data('gallery') == 'undefined') {
                    $('#'+ variandId).removeClass('answer-variants__textVariant_selected');
                }
                $(current).attr('disabled', 'disabled');
            } else {
                if (typeof $('#'+variantGroupId).data('gallery') == 'undefined') {
                    $('#'+ variandId).addClass(" answer-variants__textVariant_selected");
                }
            }

            $('#'+variantGroupId).find("input[type='checkbox']").each(function(){
                if ($(this).is(":checked")){
                    $(current).removeAttr("disabled");
                }
            });

            //is not disabled
        } else {

            if (!$('#'+variandId+' input').is(":checked")) {
                if (typeof $('#'+variantGroupId).data('gallery') == 'undefined') {
                    $('#'+ variandId).removeClass('answer-variants__textVariant_selected');
                }

            } else {
                if (typeof $('#'+variantGroupId).data('gallery') == 'undefined') {
                    $('#'+ variandId).addClass(" answer-variants__textVariant_selected");
                }
            }

        }

        //is radio
    } else {

        //is disabled
        if (typeof $(current).data('disabled') !== 'undefined') {
            $(current).removeAttr("disabled");
        }

        if (typeof $('#'+variandId).data('img') !== 'undefined'){
            var src = $('#'+variandId).data('src');
            $('#'+variantGroupId+' img').attr("src", src);
        }

        //is not disabled and is not gallery

        if (typeof $('#'+variantGroupId).data('gallery') == 'undefined'){
            $('#'+variantGroupId + ' .answer-variants__textVariant').each(function (el) {
                $(this).removeClass('answer-variants__textVariant_selected');
            });
            $('#'+ variandId).addClass(" answer-variants__textVariant_selected");
        }



    }


}



//open pop up
$('.open-popup-link').magnificPopup({
    type:'inline',
    closeOnBgClick: false,
});



// gallery radio
var mySwiper = new Swiper ('.sw-wrap-radio', {
    direction: 'horizontal',
    observer: true,
    observeParents: true,
    slidesPerView: 4,
    navigation: {
        nextEl: '.sw-next-radio',
        prevEl: '.sw-prev-radio',
    },
    scrollbar: {
        el: '.sw-scroll-radio',
    },
    breakpoints: {
        // when window width is <= 320px
        380: {
            slidesPerView: 1

        },
        // when window width is <= 480px
        500: {
            slidesPerView: 2,

        },
        // when window width is <= 640px
        700: {
            slidesPerView: 3,

        },
        // when window width is <= 992
        992: {
            slidesPerView: 4,

        },
        // when window width is <= 1199
        1199: {
            slidesPerView: 4,
        },
    }
});


// gallery checkbox
var mySwiper = new Swiper ('.sw-wrap-checkbox', {
    direction: 'horizontal',
    observer: true,
    observeParents: true,
    slidesPerView: 4,
    navigation: {
        nextEl: '.sw-next-checkbox',
        prevEl: '.sw-prev-checkbox',
    },
    scrollbar: {
        el: '.sw-scroll-checkbox',
    },
    breakpoints: {
        // when window width is <= 320px
        380: {
            slidesPerView: 1

        },
        // when window width is <= 480px
        500: {
            slidesPerView: 2,

        },
        // when window width is <= 640px
        700: {
            slidesPerView: 3,

        },
        // when window width is <= 992
        992: {
            slidesPerView: 4,

        },
        // when window width is <= 1199
        1199: {
            slidesPerView: 4,
        },
    }
});


