const initSpeakerSwiper = () => {
  const swiperContainer = document.querySelector('.speakerSwiper');
  if (!swiperContainer) return;

  const swiper = new Swiper('.speakerSwiper', {
    // Basic Setup
    slidesPerView: 1,
    spaceBetween: 20,
    grabCursor: true,
    loop: true,
    
    // Responsive Breakpoints: 4 -> 3 -> 2 -> 1
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
      1280: {
        slidesPerView: 4,
      },
    },

    // Pagination Only
    pagination: {
      el: '.speakerSwiper .swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },

    // Keyboard Controls
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    // Autoplay Config (Started paused)
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });

  // Stop autoplay initially
  swiper.autoplay.stop();

  // Intersection Observer: Only play when section is in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          swiper.autoplay.start();
        } else {
          swiper.autoplay.stop();
        }
      });
    },
    { threshold: 0.3 } // Triggers when 30% of the section is visible
  );

  observer.observe(swiperContainer);
};

const initUpdatesSwiper = () => {
  const swiperContainer = document.querySelector('.updatesSwiper');
  if (!swiperContainer) return;

  const swiper = new Swiper('.updatesSwiper', {
    // Basic Setup
    slidesPerView: 1,
    spaceBetween: 20,
    grabCursor: true,
    loop: true,
    
    // Responsive Breakpoints
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },

    // Pagination Only
    pagination: {
      el: '.updatesSwiper .swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },

    // Keyboard Controls
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    // Autoplay Config (Started paused)
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });

  // Stop autoplay initially
  swiper.autoplay.stop();

  // Intersection Observer: Only play when section is in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          swiper.autoplay.start();
        } else {
          swiper.autoplay.stop();
        }
      });
    },
    { threshold: 0.3 } // Triggers when 30% of the section is visible
  );

  observer.observe(swiperContainer);
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initSpeakerSwiper();
  initUpdatesSwiper();
});