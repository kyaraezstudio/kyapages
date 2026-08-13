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
   KYARAEZ ✦ FINAL CURSOR
========================================= */

if (window.matchMedia("(min-width: 901px)").matches) {

  document.body.style.cursor = "none";

  /* ✦ Cursor */
  const cursor = document.createElement("div");

  cursor.innerHTML = "✦";

  cursor.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 2147483647;
    font-size: 23px;
    line-height: 1;
    color: #8b7355;
    transform: translate(-50%, -50%);
    display: block;
  `;

  document.body.appendChild(cursor);


  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;


  /* Mouse */
  document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";

    createSparkle(mouseX, mouseY);

  });


  /* Sparkle otomatis saat diam */
  setInterval(() => {

    createSparkle(mouseX, mouseY);

  }, 400);


  /* ✦ Sparkle */
  function createSparkle(x, y) {

    const sparkle = document.createElement("span");

    sparkle.textContent =
      ["✦", "✧", "⋆"][Math.floor(Math.random() * 3)];

    sparkle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      z-index: 2147483646;
      color: #9b8364;
      font-size: ${10 + Math.random() * 8}px;
      transform: translate(-50%, -50%);
      opacity: 1;
      transition: all .9s ease;
    `;

    document.body.appendChild(sparkle);


    requestAnimationFrame(() => {

      sparkle.style.opacity = "0";

      sparkle.style.transform =
        `translate(
          ${-50 + (Math.random() * 100)}px,
          ${-50 + (Math.random() * 100)}px
        ) scale(.3)`;

    });


    setTimeout(() => {
      sparkle.remove();
    }, 900);

  }


  /* ✦ Click burst */
  document.addEventListener("click", (e) => {

    for (let i = 0; i < 8; i++) {

      createSparkle(e.clientX, e.clientY);

    }

  });

}
