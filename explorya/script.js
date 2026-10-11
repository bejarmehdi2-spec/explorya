// Navigation menu toggle (guarded)
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
let menuBtnIcon = null;
if (menuBtn && navLinks) {
  menuBtnIcon = menuBtn.querySelector("i");

  menuBtn.addEventListener("click", (e) => {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    if (menuBtnIcon) menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
  });

  navLinks.addEventListener("click", (e) => {
    navLinks.classList.remove("open");
    if (menuBtnIcon) menuBtnIcon.setAttribute("class", "ri-menu-line");
  });
}

// Scroll reveal (guarded)
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

if (typeof ScrollReveal === 'function') {
  ScrollReveal().reveal(".header__container h1", { ...scrollRevealOption });
  ScrollReveal().reveal(".offer__image img", { ...scrollRevealOption, origin: "left" });
  ScrollReveal().reveal(".offer__content .section__subheader", { ...scrollRevealOption, delay: 500 });
  ScrollReveal().reveal(".offer__content .section__header", { ...scrollRevealOption, delay: 1000 });
  ScrollReveal().reveal(".offer__content .section__description", { ...scrollRevealOption, delay: 1500 });
  ScrollReveal().reveal(".offer__content h5, .offer__ratings", { ...scrollRevealOption, delay: 2000 });
  ScrollReveal().reveal(".offer__content .offer__btn", { ...scrollRevealOption, delay: 2500 });
  ScrollReveal().reveal(".service__card", { ...scrollRevealOption, interval: 500 });
}

// Client testimonial image sync (use same URLs as the slides)
const clientImageArr = [
  "https://webdesignmastery.github.io/Travelty_31-01-24/assets/user-1.jpg",
  "https://webdesignmastery.github.io/Travelty_31-01-24/assets/user-2.jpg",
  "https://webdesignmastery.github.io/Travelty_31-01-24/assets/user-3.jpg",
];

const clientImage = document.querySelector(".client__image img");

// Helper to set the client image with a small fade so it matches the active slide
function setClientImage(index) {
  if (!clientImage) return;
  index = (typeof index === 'number') ? index : 0;
  const src = clientImageArr[index] || clientImageArr[0];

  // ensure transition is set
  clientImage.style.transition = 'opacity 300ms ease';

  // If already at full opacity, fade out and then swap; otherwise just set
  const onFadeOut = function () {
    clientImage.removeEventListener('transitionend', onFadeOut);
    clientImage.src = src;
    // fade in on next frame
    requestAnimationFrame(() => { clientImage.style.opacity = '1'; });
  };

  clientImage.addEventListener('transitionend', onFadeOut);
  clientImage.style.opacity = '0';
} 

// Initialize swiper only if available on the page
if (typeof Swiper === 'function' && document.querySelector('.swiper')) {
  const swiperEl = document.querySelector('.swiper');
  const swiper = new Swiper(swiperEl, {
    loop: true,

    navigation: {
      nextEl: ".swiper-next",
      prevEl: ".swiper-prev",
    },
  });

  // make sure client image matches the initial active slide
  setClientImage(swiper.realIndex || 0);

  // update image when slides change
  swiper.on('slideChange', function () {
    setClientImage(this.realIndex);
  });
}

// Duplicate banner items only if banner exists
const banner = document.querySelector(".banner__wrapper");
if (banner) {
  Array.from(banner.children).forEach((item) => {
    const duplicateNode = item.cloneNode(true);
    duplicateNode.setAttribute("aria-hidden", true);
    banner.appendChild(duplicateNode);
  });
}