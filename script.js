const translations = {
  id: {
    navAbout: "About",
    navJournal: "Journal",
    navBusiness: "Business",
    navAchievements: "Achievements",
    navContact: "Contact",

    heroEyebrow: "PERSONAL SPACE · SMALL BUSINESS",

    heroText:
      "Tempat untuk cerita personal, perjalanan membangun small business, kreativitas, dan hal-hal kecil yang layak dirayakan.",

    discover: "Kenalan lebih dekat",

    explore: "Lihat business →",

    aboutEyebrow: "A LITTLE INTRO",

    bioLead:
      "Aku percaya ide yang baik tumbuh dari rasa ingin tahu, konsistensi, dan keberanian untuk mulai.",

    bioBody:
      "KYARAEZ adalah ruang personal untuk berbagi cerita, pengalaman, proses kreatif, serta perjalanan kecil membangun sesuatu yang punya makna. Bagian bio ini bisa kamu ganti dengan biografi lengkap, pendidikan, pekerjaan, passion, atau cerita brand-mu.",

    stat1: "Personal blog",
    stat2: "Creative journey",
    stat3: "Small business",

    journalEyebrow: "FROM THE JOURNAL",

    businessEyebrow: "SMALL BUSINESS",

    businessText:
      "Area ini siap dikembangkan menjadi katalog produk, jasa, digital products, pre-order, atau koleksi pilihan KYARAEZ.",

    askBusiness: "Tanya tentang business",

    achievementEyebrow: "10 MOMENTS",

    contactText:
      "Untuk kerja sama, pertanyaan, atau sekadar say hi, kirim pesan lewat WhatsApp."
  },


  en: {
    navAbout: "About",
    navJournal: "Journal",
    navBusiness: "Business",
    navAchievements: "Achievements",
    navContact: "Contact",

    heroEyebrow: "PERSONAL SPACE · SMALL BUSINESS",

    heroText:
      "A personal space for stories, the journey of building a small business, creativity, and little things worth celebrating.",

    discover: "Get to know me",

    explore: "Explore business →",

    aboutEyebrow: "A LITTLE INTRO",

    bioLead:
      "I believe good ideas grow from curiosity, consistency, and the courage to begin.",

    bioBody:
      "KYARAEZ is a personal space for stories, experiences, creative processes, and the little journey of building something meaningful. Replace this section with your full bio, education, work, passions, or brand story.",

    stat1: "Personal blog",
    stat2: "Creative journey",
    stat3: "Small business",

    journalEyebrow: "FROM THE JOURNAL",

    businessEyebrow: "SMALL BUSINESS",

    businessText:
      "This space can grow into a catalog for products, services, digital products, pre-orders, or curated KYARAEZ collections.",

    askBusiness: "Ask about the business",

    achievementEyebrow: "10 MOMENTS",

    contactText:
      "For collaborations, questions, or simply to say hi, send a message on WhatsApp."
  }
};


/* =========================================
   CURRENT YEAR
========================================= */

document.getElementById("year").textContent =
  new Date().getFullYear();



/* =========================================
   LANGUAGE SWITCHER
========================================= */

document.querySelectorAll(".lang-btn").forEach((button) => {

  button.addEventListener("click", () => {

    const lang = button.dataset.lang;

    document.documentElement.lang = lang;


    /*
      Update active language button
    */

    document
      .querySelectorAll(".lang-btn")
      .forEach((btn) => {

        btn.classList.toggle(
          "active",
          btn === button
        );

      });


    /*
      Update all translated elements
    */

    document
      .querySelectorAll("[data-i18n]")
      .forEach((element) => {

        const key = element.dataset.i18n;

        if (translations[lang][key]) {

          element.textContent =
            translations[lang][key];

        }

      });

  });

});



/* =========================================
   MOBILE MENU
========================================= */

const menuToggle =
  document.querySelector(".menu-toggle");

const mobileNav =
  document.querySelector(".mobile-nav");


menuToggle.addEventListener("click", () => {

  const isOpen =
    mobileNav.classList.toggle("open");


  menuToggle.setAttribute(
    "aria-expanded",
    isOpen
  );


  mobileNav.setAttribute(
    "aria-hidden",
    !isOpen
  );

});


/*
  Close mobile menu after
  clicking a navigation link
*/

document
  .querySelectorAll(".mobile-nav a")
  .forEach((link) => {

    link.addEventListener("click", () => {

      mobileNav.classList.remove("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });



/* =========================================
   PLANT SLIDER
========================================= */

const slides =
  [
    ...document.querySelectorAll(
      ".plant-slider .slide"
    )
  ];


const dotsContainer =
  document.querySelector(".dots");


let currentSlide = 0;


/*
  Create slider dots
*/

slides.forEach((slide, index) => {

  const dot =
    document.createElement("button");

  dot.className =
    "dot" +
    (index === 0 ? " active" : "");

  dot.setAttribute(
    "aria-label",
    `Go to slide ${index + 1}`
  );


  dot.addEventListener(
    "click",
    () => showSlide(index)
  );


  dotsContainer.appendChild(dot);

});


/*
  Show selected slide
*/

function showSlide(index) {

  currentSlide =
    (index + slides.length) %
    slides.length;


  slides.forEach((slide, i) => {

    slide.classList.toggle(
      "active",
      i === currentSlide
    );

  });


  [
    ...dotsContainer.children
  ].forEach((dot, i) => {

    dot.classList.toggle(
      "active",
      i === currentSlide
    );

  });

}


/*
  Previous button
*/

document
  .querySelector(".plant-slider .prev")
  .addEventListener(
    "click",
    () => showSlide(currentSlide - 1)
  );


/*
  Next button
*/

document
  .querySelector(".plant-slider .next")
  .addEventListener(
    "click",
    () => showSlide(currentSlide + 1)
  );


/*
  Automatic slideshow
  every 5 seconds
*/

setInterval(() => {

  showSlide(currentSlide + 1);

}, 5000);



/* =========================================
   ACHIEVEMENT SLIDER
========================================= */

const achievementTrack =
  document.querySelector(
    ".achievement-track"
  );


const achievements =
  [
    ...document.querySelectorAll(
      ".achievement"
    )
  ];


const achievementCount =
  document.querySelector(
    ".achievement-count"
  );


let achievementIndex = 0;


/*
  Show achievement
*/

function showAchievement(index) {

  achievementIndex =
    (index + achievements.length) %
    achievements.length;


  achievementTrack.style.transform =
    `translateX(-${achievementIndex * 100}%)`;


  achievementCount.textContent =
    `${String(achievementIndex + 1).padStart(2, "0")} / 10`;

}


/*
  Previous achievement
*/

document
  .querySelector(".achievement-prev")
  .addEventListener(
    "click",
    () => showAchievement(
      achievementIndex - 1
    )
  );


/*
  Next achievement
*/

document
  .querySelector(".achievement-next")
  .addEventListener(
    "click",
    () => showAchievement(
      achievementIndex + 1
    )
  );



/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const observer =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

        }

      });

    },
    {
      threshold: 0.12
    }
  );


document
  .querySelectorAll(".reveal")
  .forEach((element) => {

    observer.observe(element);

  });



/* =========================================
   SIMPLE CART COUNTER
========================================= */

let cartCount = 0;


document
  .querySelectorAll(".service-card")
  .forEach((card) => {

    card.style.cursor = "pointer";


    card.addEventListener("click", () => {

      cartCount++;


      document.getElementById(
        "cartCount"
      ).textContent = cartCount;

    });

  });
/* =========================================
   KYARAEZ ✦ FINAL SPARKLE CURSOR
========================================= */

if (window.matchMedia("(min-width: 901px)").matches) {

  /* Hide default cursor */
  const style = document.createElement("style");

  style.textContent = `
    html,
    body,
    body *,
    a,
    button,
    input,
    textarea,
    select {
      cursor: none !important;
    }

    .ky-final-cursor {
      position: fixed;
      pointer-events: none;
      z-index: 2147483647;

      font-size: 24px;
      line-height: 1;

      color: #8b7355;

      transform:
        translate(-50%, -50%)
        scale(1);

      transition:
        transform .2s ease,
        font-size .2s ease;

      text-shadow:
        0 0 6px rgba(139,115,85,.3),
        0 0 14px rgba(139,115,85,.18);
    }

    .ky-final-cursor.hover {
      font-size: 34px;

      transform:
        translate(-50%, -50%)
        scale(1.05)
        rotate(15deg);
    }

    .ky-final-sparkle {
      position: fixed;
      pointer-events: none;
      z-index: 2147483646;

      color: #9b8364;
      font-size: 13px;

      transform:
        translate(-50%, -50%)
        scale(.5);

      animation:
        kyFinalSparkle .9s ease-out forwards;
    }

    @keyframes kyFinalSparkle {

      0% {
        opacity: 0;
      }

      20% {
        opacity: 1;
      }

      100% {
        opacity: 0;

        transform:
          translate(
            calc(-50% + var(--sx)),
            calc(-50% + var(--sy))
          )
          scale(0);
      }

    }
  `;

  document.head.appendChild(style);


  /* =====================================
     ✦ CREATE CURSOR
  ===================================== */

  const cursor = document.createElement("div");

  cursor.className = "ky-final-cursor";

  cursor.textContent = "✦";

  document.body.appendChild(cursor);


  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;


  /* =====================================
     🖱️ MOUSE MOVE
  ===================================== */

  document.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

    /* Trail */
    if (Math.random() < 0.3) {
      createSparkle(mouseX, mouseY);
    }

  });


  /* =====================================
     ✨ SPARKLE SAAT MOUSE DIAM
  ===================================== */

  setInterval(() => {

    createSparkle(mouseX, mouseY);

  }, 450);


  /* =====================================
     👆 HOVER
  ===================================== */

  const clickableElements = document.querySelectorAll(
    "a, button, .service-card, .slider-arrow, .dot"
  );

  clickableElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {

      cursor.classList.add("hover");

    });

    element.addEventListener("mouseleave", () => {

      cursor.classList.remove("hover");

    });

  });


  /* =====================================
     ✦ CREATE SPARKLE
  ===================================== */

  function createSparkle(x, y) {

    const sparkle =
      document.createElement("span");

    sparkle.className =
      "ky-final-sparkle";

    sparkle.textContent =
      ["✦", "✧", "⋆"][

        Math.floor(
          Math.random() * 3
        )

      ];


    sparkle.style.left =
      `${x}px`;

    sparkle.style.top =
      `${y}px`;


    sparkle.style.setProperty(
      "--sx",
      `${(Math.random() - .5) * 50}px`
    );

    sparkle.style.setProperty(
      "--sy",
      `${(Math.random() - .5) * 50}px`
    );


    document.body.appendChild(
      sparkle
    );


    setTimeout(() => {

      sparkle.remove();

    }, 900);

  }


  /* =====================================
     ✨ CLICK BURST
  ===================================== */

  document.addEventListener("click", (event) => {

    for (let i = 0; i < 8; i++) {

      createSparkle(
        event.clientX,
        event.clientY
      );

    }

  });

}
