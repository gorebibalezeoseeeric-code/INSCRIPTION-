// Modifiez ici les coordonnées et informations de contact de l'activité.
const POULET_DE_LA_MARAHOUE = {
  whatsappNumber: "2250747114305",
  phoneNumber: "+225 07 47 11 43 05",
  location: "",
  hours: "",
};

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");

function closeMenu() {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Ouvrir le menu");
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Ouvrir le menu" : "Fermer le menu");
  navigation?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const whatsappNumber = POULET_DE_LA_MARAHOUE.whatsappNumber.replace(/\D/g, "");
const standardMessage = "Bonjour, je voudrais avoir des informations sur vos poulets de chair.";

function setWhatsAppLink(link, message) {
  if (!whatsappNumber) {
    link.hidden = true;
  } else {
    link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
}

document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
  setWhatsAppLink(link, link.dataset.whatsappMessage || standardMessage);
});

document.querySelectorAll("[data-product]").forEach((link) => {
  setWhatsAppLink(link, `Bonjour, je souhaite commander : ${link.dataset.product}. Merci de me confirmer la disponibilité et le prix.`);
});

document.querySelectorAll("[data-format]").forEach((link) => {
  setWhatsAppLink(link, `Bonjour, je souhaite commander des poulets au format ${link.dataset.format}. Merci de me confirmer la disponibilité et le prix.`);
});

const phoneLinks = document.querySelectorAll("[data-phone]");
phoneLinks.forEach((link) => {
  if (!POULET_DE_LA_MARAHOUE.phoneNumber.trim()) {
    link.hidden = true;
    return;
  }
  link.href = `tel:${POULET_DE_LA_MARAHOUE.phoneNumber.replace(/[^\d+]/g, "")}`;
  link.textContent = POULET_DE_LA_MARAHOUE.phoneNumber;
});

[
  ["[data-location]", POULET_DE_LA_MARAHOUE.location],
  ["[data-footer-location]", POULET_DE_LA_MARAHOUE.location],
  ["[data-hours]", POULET_DE_LA_MARAHOUE.hours],
].forEach(([selector, value]) => {
  const element = document.querySelector(selector);
  if (element && value.trim()) {
    element.textContent = value.trim();
    element.hidden = false;
  }
});

const imageDialog = document.querySelector(".image-dialog");
const dialogImage = imageDialog?.querySelector("img");

document.querySelectorAll(".image-open").forEach((button) => {
  button.addEventListener("click", () => {
    if (!imageDialog || !dialogImage) return;
    dialogImage.src = button.dataset.image;
    dialogImage.alt = button.dataset.alt || "";
    imageDialog.showModal();
  });
});

imageDialog?.querySelector(".dialog-close")?.addEventListener("click", () => imageDialog.close());
imageDialog?.addEventListener("click", (event) => {
  if (event.target === imageDialog) imageDialog.close();
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());
