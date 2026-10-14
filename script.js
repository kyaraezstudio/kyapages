/* =========================================
   KYARAEZ — Main Script
   Static site + Google Sheets via Apps Script
========================================= */

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
      "Area ini menampilkan produk & jasa dari katalog. Data diambil dari Google Sheets.",
    askBusiness: "Tanya tentang business",
    achievementEyebrow: "10 MOMENTS",
    contactText:
      "Untuk kerja sama, pertanyaan, atau sekadar say hi, isi form di bawah atau chat WhatsApp."
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
      "This space shows products & services from the catalog. Data is loaded from Google Sheets.",
    askBusiness: "Ask about the business",
    achievementEyebrow: "10 MOMENTS",
    contactText:
      "For collaborations, questions, or simply to say hi, fill the form below or chat on WhatsApp."
  }
};

/* =========================================
   CURRENT YEAR
========================================= */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* =========================================
   LANGUAGE SWITCHER
========================================= */
document.querySelectorAll(".lang-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const lang = button.dataset.lang;
    document.documentElement.lang = lang;
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn === button);
    });
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });
  });
});

/* =========================================
   MOBILE MENU
========================================= */
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    mobileNav.setAttribute("aria-hidden", !isOpen);
  });

  document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* =========================================
   PLANT SLIDER
========================================= */
const slides = [...document.querySelectorAll(".plant-slider .slide")];
const dotsContainer = document.querySelector(".dots");
let currentSlide = 0;

if (slides.length && dotsContainer) {
  slides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.className = "dot" + (index === 0 ? " active" : "");
    dot.setAttribute("aria-label", "Go to slide " + (index + 1));
    dot.addEventListener("click", () => showSlide(index));
    dotsContainer.appendChild(dot);
  });

  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentSlide);
    });
    [...dotsContainer.children].forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  }

  const prevBtn = document.querySelector(".plant-slider .prev");
  const nextBtn = document.querySelector(".plant-slider .next");
  if (prevBtn) prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));

  setInterval(() => showSlide(currentSlide + 1), 5000);
}

/* =========================================
   SCROLL REVEAL
========================================= */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* =========================================
   HELPERS — API & FORMAT
========================================= */
function apiUrl(action) {
  const base = (window.KY_CONFIG && KY_CONFIG.WEB_APP_URL) || "";
  if (!base || base.includes("YOUR_DEPLOYMENT_ID")) return null;
  const sep = base.includes("?") ? "&" : "?";
  return base + sep + "action=" + encodeURIComponent(action);
}

function formatPrice(amount, currency) {
  const cur = currency || (window.KY_CONFIG && KY_CONFIG.CURRENCY) || "IDR";
  const locale = (window.KY_CONFIG && KY_CONFIG.LOCALE) || "id-ID";
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: cur,
      maximumFractionDigits: 0
    }).format(Number(amount) || 0);
  } catch (e) {
    return cur + " " + (Number(amount) || 0);
  }
}

async function fetchJSON(action) {
  const url = apiUrl(action);
  if (!url) return { ok: false, error: "WEB_APP_URL not configured", offline: true };
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow" });
    const data = await res.json();
    return data;
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

async function postJSON(payload) {
  const base = (window.KY_CONFIG && KY_CONFIG.WEB_APP_URL) || "";
  if (!base || base.includes("YOUR_DEPLOYMENT_ID")) {
    return { ok: false, error: "WEB_APP_URL not configured" };
  }
  try {
    const res = await fetch(base, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* =========================================
   CART (localStorage)
========================================= */
const CART_KEY = "kyaraez_cart_v1";

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  updateCartUI();
}

function cartCount() {
  return loadCart().reduce((s, i) => s + (i.qty || 1), 0);
}

function cartTotal() {
  return loadCart().reduce((s, i) => s + (Number(i.price) || 0) * (i.qty || 1), 0);
}

function addToCart(product) {
  const items = loadCart();
  const existing = items.find((i) => i.id === product.id);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    items.push({
      id: product.id,
      name: product.name,
      price: Number(product.price) || 0,
      currency: product.currency || "IDR",
      qty: 1
    });
  }
  saveCart(items);
}

function setQty(id, qty) {
  let items = loadCart();
  items = items
    .map((i) => (i.id === id ? Object.assign({}, i, { qty: Math.max(0, qty) }) : i))
    .filter((i) => i.qty > 0);
  saveCart(items);
}

function removeFromCart(id) {
  saveCart(loadCart().filter((i) => i.id !== id));
}

function updateCartUI() {
  const countEl = document.getElementById("cartCount");
  if (countEl) countEl.textContent = cartCount();

  const list = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  if (!list) return;

  const items = loadCart();
  if (!items.length) {
    list.innerHTML = '<p class="cart-empty">Keranjang masih kosong.</p>';
  } else {
    list.innerHTML = items
      .map(
        (i) =>
          '<div class="cart-line" data-id="' +
          escapeHtml(i.id) +
          '">' +
          '<div class="cart-line-info">' +
          "<strong>" +
          escapeHtml(i.name) +
          "</strong>" +
          "<span>" +
          formatPrice(i.price, i.currency) +
          " × " +
          i.qty +
          "</span>" +
          "</div>" +
          '<div class="cart-line-qty">' +
          '<button type="button" data-qty-minus aria-label="Kurangi">−</button>' +
          "<span>" +
          i.qty +
          "</span>" +
          '<button type="button" data-qty-plus aria-label="Tambah">+</button>' +
          "</div>" +
          '<button type="button" class="cart-line-remove" data-remove aria-label="Hapus">×</button>' +
          "</div>"
      )
      .join("");
  }
  if (totalEl) totalEl.textContent = formatPrice(cartTotal());
}

const cartModal = document.getElementById("cartModal");
const cartOpenBtn = document.getElementById("cartOpenBtn");

function openCart() {
  if (!cartModal) return;
  updateCartUI();
  cartModal.classList.add("open");
  cartModal.setAttribute("aria-hidden", "false");
}

function closeCart() {
  if (!cartModal) return;
  cartModal.classList.remove("open");
  cartModal.setAttribute("aria-hidden", "true");
}

if (cartOpenBtn) cartOpenBtn.addEventListener("click", openCart);
document.querySelectorAll("[data-close-cart]").forEach((el) => {
  el.addEventListener("click", closeCart);
});

document.getElementById("cartItems") &&
  document.getElementById("cartItems").addEventListener("click", (e) => {
    const line = e.target.closest(".cart-line");
    if (!line) return;
    const id = line.dataset.id;
    const items = loadCart();
    const item = items.find((i) => i.id === id);
    if (!item) return;
    if (e.target.closest("[data-qty-plus]")) setQty(id, (item.qty || 1) + 1);
    if (e.target.closest("[data-qty-minus]")) setQty(id, (item.qty || 1) - 1);
    if (e.target.closest("[data-remove]")) removeFromCart(id);
  });

/* =========================================
   PRODUCTS
========================================= */
async function loadProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  const result = await fetchJSON("products");

  if (result.offline || !result.ok) {
    grid.innerHTML =
      '<div class="service-card reveal visible"><span>01</span><h3>Curated goods</h3><p>Produk pilihan dengan karakter yang selaras dengan dunia KYARAEZ.</p><p class="products-loading" style="padding:0.5rem 0 0;font-size:0.8rem">' +
      (result.offline
        ? "Hubungkan Google Sheets di config.js untuk katalog dinamis."
        : "Gagal memuat katalog.") +
      "</p></div>" +
      '<div class="service-card reveal visible"><span>02</span><h3>Creative work</h3><p>Ruang untuk project, collaboration, design, dan creative services.</p></div>' +
      '<div class="service-card reveal visible"><span>03</span><h3>Digital stories</h3><p>Konten, guides, notes, dan digital products yang bisa tumbuh bersama audiens.</p></div>';
    return;
  }

  const products = result.data || [];
  if (!products.length) {
    grid.innerHTML = '<div class="products-loading">Belum ada produk aktif.</div>';
    return;
  }

  grid.innerHTML = products
    .map((p) => {
      const img = p.image_url
        ? '<div class="product-image"><img src="' +
          escapeHtml(p.image_url) +
          '" alt="' +
          escapeHtml(p.name) +
          '" loading="lazy"></div>'
        : "";
      return (
        '<article class="product-card reveal visible" data-product-id="' +
        escapeHtml(p.id) +
        '">' +
        img +
        '<div class="product-body">' +
        '<span class="product-cat">' +
        escapeHtml(p.category || "product") +
        "</span>" +
        "<h3>" +
        escapeHtml(p.name) +
        "</h3>" +
        '<p class="product-desc">' +
        escapeHtml(p.description || "") +
        "</p>" +
        '<div class="product-price">' +
        formatPrice(p.price, p.currency) +
        "</div>" +
        '<button type="button" class="btn btn-primary btn-add" data-add-cart>Tambah ke keranjang</button>' +
        "</div></article>"
      );
    })
    .join("");

  grid.querySelectorAll("[data-add-cart]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest("[data-product-id]");
      const id = card.dataset.productId;
      const product = products.find((x) => String(x.id) === String(id));
      if (product) {
        addToCart(product);
        btn.textContent = "Ditambahkan ✓";
        setTimeout(() => {
          btn.textContent = "Tambah ke keranjang";
        }, 1200);
      }
    });
  });
}

/* =========================================
   JOURNAL
========================================= */
async function loadJournal() {
  const grid = document.querySelector(".journal-grid");
  if (!grid) return;

  const result = await fetchJSON("journal");

  if (result.offline || !result.ok) {
    grid.innerHTML =
      '<article class="story-card reveal visible"><div class="story-image"><img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=85" alt=""></div><p class="story-tag">STORY</p><h3>Notes from a season of starting again.</h3><a href="#contact">Read story →</a></article>' +
      '<article class="story-card reveal visible"><div class="story-image"><img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85" alt=""></div><p class="story-tag">BUSINESS</p><h3>Building a small brand, one detail at a time.</h3><a href="#contact">Read story →</a></article>' +
      '<article class="story-card reveal visible"><div class="story-image"><img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=85" alt=""></div><p class="story-tag">CREATIVITY</p><h3>Making space for ideas to breathe.</h3><a href="#contact">Read story →</a></article>';
    return;
  }

  const posts = result.data || [];
  if (!posts.length) {
    grid.innerHTML = '<div class="products-loading">Belum ada journal.</div>';
    return;
  }

  grid.innerHTML = posts
    .map(
      (j) =>
        '<article class="story-card reveal visible"><div class="story-image"><img src="' +
        escapeHtml(j.image_url || "") +
        '" alt="" loading="lazy"></div><p class="story-tag">' +
        escapeHtml(j.tag || "STORY") +
        "</p><h3>" +
        escapeHtml(j.title) +
        '</h3><a href="' +
        escapeHtml(j.link || "#contact") +
        '">Read story →</a></article>'
    )
    .join("");
}

/* =========================================
   ACHIEVEMENTS
========================================= */
let achievementIndex = 0;
let achievementsData = [];

function renderAchievements(list) {
  const track = document.querySelector(".achievement-track");
  const countEl = document.querySelector(".achievement-count");
  if (!track) return;

  achievementsData = list;
  if (!list.length) {
    track.innerHTML =
      '<article class="achievement active"><span>01</span><h3>Belum ada data</h3><p>Isi sheet Achievements.</p></article>';
    if (countEl) countEl.textContent = "01 / 01";
    return;
  }

  track.innerHTML = list
    .map(
      (a, i) =>
        '<article class="achievement' +
        (i === 0 ? " active" : "") +
        '"><span>' +
        String(i + 1).padStart(2, "0") +
        "</span><h3>" +
        escapeHtml(a.title || "") +
        "</h3><p>" +
        escapeHtml(a.description || "") +
        (a.year ? " · " + escapeHtml(a.year) : "") +
        "</p></article>"
    )
    .join("");

  achievementIndex = 0;
  track.style.transform = "translateX(0)";
  if (countEl) countEl.textContent = "01 / " + String(list.length).padStart(2, "0");
}

function showAchievement(index) {
  const track = document.querySelector(".achievement-track");
  const countEl = document.querySelector(".achievement-count");
  if (!track || !achievementsData.length) return;
  achievementIndex = (index + achievementsData.length) % achievementsData.length;
  track.style.transform = "translateX(-" + achievementIndex * 100 + "%)";
  if (countEl) {
    countEl.textContent =
      String(achievementIndex + 1).padStart(2, "0") +
      " / " +
      String(achievementsData.length).padStart(2, "0");
  }
}

async function loadAchievements() {
  const result = await fetchJSON("achievements");
  if (result.offline || !result.ok) {
    renderAchievements([
      { title: "First creative project", description: "Tambahkan pencapaian di Google Sheets." },
      { title: "Competition / award", description: "Detail prestasi atau kompetisi." },
      { title: "First business milestone", description: "First sale, first client, atau launch." }
    ]);
  } else {
    renderAchievements(result.data || []);
  }

  const prev = document.querySelector(".achievement-prev");
  const next = document.querySelector(".achievement-next");
  if (prev) prev.onclick = () => showAchievement(achievementIndex - 1);
  if (next) next.onclick = () => showAchievement(achievementIndex + 1);
}

/* =========================================
   CONTACT FORM
========================================= */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const status = document.getElementById("cf-status");
    const btn = document.getElementById("cf-submit");
    const name = document.getElementById("cf-name").value.trim();
    const whatsapp = document.getElementById("cf-wa").value.trim();
    const email = document.getElementById("cf-email").value.trim();
    const message = document.getElementById("cf-message").value.trim();

    if (!name || !message || !whatsapp) {
      status.textContent = "Nama, WhatsApp, dan pesan wajib diisi.";
      status.className = "form-status err";
      return;
    }

    btn.disabled = true;
    status.textContent = "Mengirim…";
    status.className = "form-status";

    const result = await postJSON({
      action: "message",
      name: name,
      whatsapp: whatsapp,
      email: email,
      message: message,
      source: "website"
    });

    if (result.ok) {
      status.textContent = "Pesan terkirim! Terima kasih.";
      status.className = "form-status ok";
      contactForm.reset();
    } else {
      status.textContent = result.error || "Gagal mengirim. Coba lagi atau pakai WhatsApp.";
      status.className = "form-status err";
    }
    btn.disabled = false;
  });
}

/* =========================================
   ORDER FORM
========================================= */
const orderForm = document.getElementById("orderForm");
if (orderForm) {
  orderForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const status = document.getElementById("of-status");
    const btn = document.getElementById("of-submit");
    const items = loadCart();
    if (!items.length) {
      status.textContent = "Keranjang masih kosong.";
      status.className = "form-status err";
      return;
    }
    const name = document.getElementById("of-name").value.trim();
    const whatsapp = document.getElementById("of-wa").value.trim();
    const note = document.getElementById("of-note").value.trim();
    if (!name || !whatsapp) {
      status.textContent = "Nama dan WhatsApp wajib.";
      status.className = "form-status err";
      return;
    }

    btn.disabled = true;
    status.textContent = "Mengirim order…";
    status.className = "form-status";

    const result = await postJSON({
      action: "order",
      name: name,
      whatsapp: whatsapp,
      items: items,
      total: cartTotal(),
      note: note
    });

    if (result.ok) {
      status.textContent = "Order " + (result.order_id || "") + " tersimpan. Terima kasih!";
      status.className = "form-status ok";
      saveCart([]);
      orderForm.reset();
    } else {
      status.textContent = result.error || "Gagal menyimpan order.";
      status.className = "form-status err";
    }
    btn.disabled = false;
  });
}

document.getElementById("of-wa-checkout") &&
  document.getElementById("of-wa-checkout").addEventListener("click", () => {
    const items = loadCart();
    if (!items.length) {
      const status = document.getElementById("of-status");
      if (status) {
        status.textContent = "Keranjang masih kosong.";
        status.className = "form-status err";
      }
      return;
    }
    const name = (document.getElementById("of-name") && document.getElementById("of-name").value.trim()) || "";
    const note = (document.getElementById("of-note") && document.getElementById("of-note").value.trim()) || "";
    const lines = items.map(
      (i) => "• " + i.name + " x" + i.qty + " = " + formatPrice(i.price * i.qty, i.currency)
    );
    const text = [
      "Halo, saya mau order dari KYARAEZ:",
      ...lines,
      "Total: " + formatPrice(cartTotal()),
      name ? "Nama: " + name : "",
      note ? "Catatan: " + note : ""
    ]
      .filter(Boolean)
      .join("\n");

    const wa = (window.KY_CONFIG && KY_CONFIG.WHATSAPP_NUMBER) || "6285286707303";
    window.open("https://wa.me/" + wa + "?text=" + encodeURIComponent(text), "_blank");
  });

/* =========================================
   SPARKLE CURSOR (desktop)
========================================= */
if (window.matchMedia("(min-width: 901px)").matches) {
  const style = document.createElement("style");
  style.textContent =
    "html, body { cursor: none; }" +
    "a, button, .service-card, .slider-arrow, .dot, .product-card, input, textarea { cursor: none; }" +
    ".ky-final-cursor { position: fixed; z-index: 9999; pointer-events: none; font-size: 18px; color: var(--green-dark); transform: translate(-50%, -50%); transition: transform 0.15s ease; }" +
    ".ky-final-cursor.hover { transform: translate(-50%, -50%) scale(1.45); }" +
    ".ky-final-sparkle { position: fixed; z-index: 9998; pointer-events: none; font-size: 12px; color: var(--green); animation: ky-sparkle 0.9s ease forwards; }" +
    "@keyframes ky-sparkle { 0% { opacity: 1; transform: translate(0,0) scale(1); } 100% { opacity: 0; transform: translate(var(--sx), var(--sy)) scale(0.3); } }";
  document.head.appendChild(style);

  const cursor = document.createElement("div");
  cursor.className = "ky-final-cursor";
  cursor.textContent = "✦";
  document.body.appendChild(cursor);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
    if (Math.random() < 0.3) createSparkle(mouseX, mouseY);
  });

  setInterval(() => createSparkle(mouseX, mouseY), 450);

  document.querySelectorAll("a, button, .service-card, .slider-arrow, .dot, .product-card").forEach((element) => {
    element.addEventListener("mouseenter", () => cursor.classList.add("hover"));
    element.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
  });

  function createSparkle(x, y) {
    const sparkle = document.createElement("span");
    sparkle.className = "ky-final-sparkle";
    sparkle.textContent = ["✦", "✧", "⋆"][Math.floor(Math.random() * 3)];
    sparkle.style.left = x + "px";
    sparkle.style.top = y + "px";
    sparkle.style.setProperty("--sx", (Math.random() - 0.5) * 65 + "px");
    sparkle.style.setProperty("--sy", (Math.random() - 0.5) * 65 + "px");
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 900);
  }

  document.addEventListener("click", (event) => {
    for (let i = 0; i < 8; i++) createSparkle(event.clientX, event.clientY);
  });
}

/* =========================================
   INIT
========================================= */
updateCartUI();
loadProducts();
loadJournal();
loadAchievements();
