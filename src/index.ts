$(document).ready(function () {
  $('.slider-standard_component').each(function () {
    const $swiperContainer = $(this).find('.swiper')[0];
    const numberOfSlides = $swiperContainer.querySelectorAll('.swiper-slide').length;

    if (numberOfSlides === 0) {
      return;
    }

    let autoMode = $(this).attr('auto-mode');
    let autoModeDelay = 5000;
    if (autoMode !== 'false') {
      autoMode = true;
      autoModeDelay = parseInt(autoMode, 10) || 5000;
    } else {
      autoMode = false;
    }

    const sliderDuration = $(this).attr('transition-speed')
      ? parseInt($(this).attr('transition-speed'), 10)
      : 300;
    const pauseOnHover = $(this).attr('pause-on-hover') === 'true';
    const itemsDesktop = $(this).attr('items-desktop')
      ? parseInt($(this).attr('items-desktop'), 10)
      : 3;
    const itemsTablet = $(this).attr('items-tablet')
      ? parseInt($(this).attr('items-tablet'), 10)
      : 2;
    const itemsMobileLandscape = $(this).attr('items-mobile-landscape')
      ? parseInt($(this).attr('items-mobile-landscape'), 10)
      : 1;
    const itemsMobilePortrait = $(this).attr('items-mobile-portrait')
      ? parseInt($(this).attr('items-mobile-portrait'), 10)
      : 1;
    const spaceBetweenDesktop = $(this).attr('space-between-desktop')
      ? parseInt($(this).attr('space-between-desktop'), 10)
      : 40;
    const spaceBetweenTablet = $(this).attr('space-between-tablet')
      ? parseInt($(this).attr('space-between-tablet'), 10)
      : 40;
    const spaceBetweenMobileLandscape = $(this).attr('space-between-mobile-landscape')
      ? parseInt($(this).attr('space-between-mobile-landscape'), 10)
      : 40;
    const spaceBetweenMobilePortrait = $(this).attr('space-between-mobile-portrait')
      ? parseInt($(this).attr('space-between-mobile-portrait'), 10)
      : 40;

    const isLessThanRequired =
      numberOfSlides <=
      Math.max(itemsDesktop, itemsTablet, itemsMobileLandscape, itemsMobilePortrait);
    const $controlsDiv = $(this).find('[slider-controls=true]');
    const $swiperDragWrapper = $(this).find('.swiper-drag-wrapper');
    const $swiperBulletWrapper = $(this).find('.swiper-bullet-wrapper');

    if (isLessThanRequired) {
      $controlsDiv.hide();
      $swiperDragWrapper.hide();
      $swiperBulletWrapper.hide();
      return; // Don't initialize the slider
    }
    $controlsDiv.show();
    $swiperDragWrapper.show();
    $swiperBulletWrapper.show();

    let slideWidth = '100%';
    if (numberOfSlides === 3) {
      slideWidth = '33.33%';
    } else if (numberOfSlides === 2) {
      slideWidth = '50%';
    }

    $($swiperContainer).find('.swiper-slide').css('width', slideWidth);

    const swiper = new Swiper($swiperContainer, {
      speed: sliderDuration,
      loop: !isLessThanRequired,
      autoplay:
        autoMode && !isLessThanRequired
          ? {
              delay: autoModeDelay,
              pauseOnMouseEnter: pauseOnHover,
            }
          : false,
      autoHeight: false,
      centeredSlides: !isLessThanRequired,
      followFinger: true,
      freeMode: false,
      slideToClickedSlide: false,
      slidesPerView: 1,
      spaceBetween: '4%',
      rewind: false,
      mousewheel: {
        forceToAxis: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      breakpoints: {
        320: {
          slidesPerView: itemsMobilePortrait,
          spaceBetween: spaceBetweenMobilePortrait,
        },
        480: {
          slidesPerView: itemsMobileLandscape,
          spaceBetween: spaceBetweenMobileLandscape,
        },
        768: {
          slidesPerView: itemsTablet,
          spaceBetween: spaceBetweenTablet,
        },
        992: {
          slidesPerView: itemsDesktop,
          spaceBetween: spaceBetweenDesktop,
        },
      },
      pagination: !isLessThanRequired
        ? {
            el: $(this).find('.swiper-bullet-wrapper')[0],
            bulletActiveClass: 'is-active',
            bulletClass: 'swiper-bullet',
            bulletElement: 'button',
            clickable: true,
          }
        : false,
      navigation: {
        nextEl: $(this).find('.swiper-next')[0],
        prevEl: $(this).find('.swiper-prev')[0],
        disabledClass: 'is-disabled',
      },
      scrollbar: {
        el: $(this).find('.swiper-drag-wrapper')[0],
        draggable: true,
        dragClass: 'swiper-drag',
        snapOnRelease: true,
      },
      slideActiveClass: 'is-active',
      slideDuplicateActiveClass: 'is-active',
    });
  });
});
