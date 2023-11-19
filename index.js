document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("testimonial-player");
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        video.pause();
        playButton.style.display = "block";
        pauseButton.style.display = "none";
      } else {
        // Optionally, play the video when it comes into view
        // video.play();
      }
    });
  }, {});

  observer.observe(video);
  /*start of swiper initiation*/
  initializeSwipers();

  $(window).resize(function () {
    initializeSwipers();
  });

  function initializeSwipers() {
    $(".slider-main_component").each(function (index) {
      const isMobileOnly = $(this).data("mobile-only") === true;
      const swiperElement = $(this).find(".swiper")[0];
      const isSwiperInitialized = swiperElement && swiperElement.swiper;

      if (!isMobileOnly || (isMobileOnly && $(window).width() < 992)) {
        if (!isSwiperInitialized) {
          initializeSwiper($(this));
        }
      } else if (isSwiperInitialized) {
        swiperElement.swiper.destroy(true, true);
      }
    });
  }

  function initializeSwiper(element) {
    let loopMode = false;
    if (element.attr("loop-mode") === "true") {
      loopMode = true;
    }
    let sliderDuration = 300;
    if (element.attr("slider-duration") !== undefined) {
      sliderDuration = +element.attr("slider-duration");
    }
    let spaceBetween = 0;
    if (element.attr("space-between") !== undefined) {
      spaceBetween = +element.attr("space-between");
    }
    let autoPlay = false;
    if (element.attr("auto-play") === "true") {
      autoPlay = true;
    }
    let centerSlides = false;
    if (element.attr("center-slides") === "true") {
      centerSlides = true;
    }
    let slidePerView = "auto";
    if (element.attr("slide-per-view") !== undefined) {
      slidePerView = +element.attr("slide-per-view");
    }

    const swiper = new Swiper(element.find(".swiper")[0], {
      speed: sliderDuration,
      loop: loopMode,
      autoHeight: false,
      centeredSlides: centerSlides,
      followFinger: true,
      freeMode: false,
      slideToClickedSlide: false,
      slidesPerView: slidePerView,
      spaceBetween: spaceBetween,
      rewind: false,
      mousewheel: {
        forceToAxis: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: "auto",
        },
        768: {
          slidesPerView: "auto",
        },
        992: {
          slidesPerView: slidePerView,
        },
      },
      slideActiveClass: "is--active",
      slideDuplicateActiveClass: "is--active",
    });
  }
  /*end of swiper*/

  gsap.registerPlugin(ScrollTrigger);
  $(".odometer._2").each(function () {
    var startValue = "99900";

    var endValue = "100000";
    var odometer = new Odometer({
      el: this,
      value: startValue,
      format: "(,ddd).ddd",
      duration: 2000,
    });
    odometer.render(startValue);
    ScrollTrigger.create({
      trigger: this,
      start: "center 70%",
      onEnter: () => {
        odometer.update(endValue);
      },
    });
  });
  $(".odometer._3").each(function () {
    var startValue = "14900";
    var endValue = "15700";
    var odometer = new Odometer({
      el: this,
      value: startValue,
      format: "(,ddd).ddd",
      duration: 2000,
    });
    odometer.render(startValue);
    ScrollTrigger.create({
      trigger: this,
      start: "center 70%",
      onEnter: () => {
        odometer.update(endValue);
      },
    });
  });
});
