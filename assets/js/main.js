/*
 * Gulshan Portfolio Website
 * Designed & Coded by : 'Gulshan Songara'
 */

"use strict";

const body = document.body;
const preloader = document.querySelector("#preloader");
const hero = document.querySelector("#hero");
const about = document.querySelector("#about");
const portfolio = document.querySelector("#portfolio");
const contact = document.querySelector("#contact");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".dot");
const socialBar = document.querySelector("#social-bar");
const socialLinks = document.querySelectorAll(".foot-social-links");
const scrollDown = document.querySelector(".scroll-down");
const backTop = document.querySelector(".back-to-top");
const orbitWrapper = document.querySelector(".orbit-wrapper");
const mailId = document.querySelector(".mail-id");
const toolTip = document.querySelector(".tool-tip");

window.addEventListener("load", () => {
  setTimeout(() => {
    body.classList.remove("overflow-hide");
    preloader.classList.add("preloaded");
  }, 3500);

  setTimeout(() => {
    preloader.remove();
  }, 5000);
});

const jumpTo = (jump) => {
  jump.scrollIntoView();
};

navLinks.forEach((currLink) => {
  currLink.addEventListener("click", () => {
    let sec = currLink.getAttribute("data-scroll");

    if (sec === "hero") {
      jumpTo(hero);
    } else if (sec === "about") {
      jumpTo(about);
    } else if (sec === "portfolio") {
      jumpTo(portfolio);
    } else if (sec === "contact") {
      jumpTo(contact);
    }
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY >= 80) {
    scrollDown.classList.add("pop");
  } else {
    scrollDown.classList.remove("pop");
  }
});

backTop.addEventListener("click", () => {
  jumpTo(hero);
});

mailId.addEventListener("mouseover", () => {
  toolTip.innerText = "Click to copy";
  toolTip.classList.add("popped");
});

mailId.addEventListener("mouseleave", () => {
  toolTip.classList.remove("popped");
});

mailId.addEventListener("click", () => {
  navigator.clipboard.writeText(mailId.innerText);
  toolTip.innerText = "Copied";
});

const scrollSpyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let id = entry.target.id;

        navLinks.forEach((link) => {
          let currAttr = link.getAttribute("data-scroll");

          link.classList.remove("active");

          if (id === currAttr) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  {
    threshold: 0.5,
  }
);

sections.forEach((section) => {
  scrollSpyObserver.observe(section);
});

const orbitObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        orbitWrapper.classList.remove("paused");
      } else {
        orbitWrapper.classList.add("paused");
      }
    });
  },
  {
    threshold: 0.7,
  }
);

orbitObserver.observe(about);

const socialLinksObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }

      if (entry.target.classList.contains("show")) {
        socialBar.classList.add("hide");
        backTop.classList.remove("pop");
      } else {
        socialBar.classList.remove("hide");
        backTop.classList.add("pop");
      }
    });
  },
  {
    threshold: 1,
  }
);

socialLinks.forEach((link) => {
  socialLinksObserver.observe(link);
});

const swiperOne = new Swiper(".img-swiper", {
  grabCursor: true,
  speed: 600,

  effect: "creative",
  creativeEffect: {
    prev: {
      shadow: false,
      translate: [0, 0, -400],
    },
    next: {
      translate: ["110%", 0, 0],
    },
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
});

const swiperTwo = new Swiper(".txt-swiper", {
  grabCursor: true,
  speed: 600,
  slidesPerView: "auto",
  spaceBetween: 50,
});

swiperOne.controller.control = swiperTwo;
swiperTwo.controller.control = swiperOne;
