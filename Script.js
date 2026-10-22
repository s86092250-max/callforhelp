const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      menuButton.focus();
    }
  });
}

const year = document.querySelector("#current-year");
if (year) year.textContent = new Date().getFullYear();

const heroVideo = document.querySelector(".hero-video");
if (heroVideo) {
  const supportClips = [
    "customer-support-call.mp4",
    "support-woman-1.mp4",
    "support-man-2.mp4"
  ];
  let activeClip = 0;

  heroVideo.addEventListener("loadeddata", () => {
    heroVideo.classList.remove("is-switching");
  });

  window.setInterval(() => {
    activeClip = (activeClip + 1) % supportClips.length;
    heroVideo.classList.add("is-switching");
    heroVideo.src = supportClips[activeClip];
    heroVideo.load();
    heroVideo.play().catch(() => {});
  }, 7500);
}

const serviceCards = [...document.querySelectorAll(".service-card")];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const aboutHeading = document.querySelector("#about .section-title h2");

if (aboutHeading && !prefersReducedMotion) {
  if ("IntersectionObserver" in window) {
    const aboutObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("about-heading-animate");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.25 });
    aboutObserver.observe(aboutHeading);
  } else {
    aboutHeading.classList.add("about-heading-animate");
  }
}

if (serviceCards.length && !prefersReducedMotion) {
  serviceCards.forEach((card, index) => {
    card.classList.add("reveal-ready");
    card.style.setProperty("--reveal-delay", `${(index % 4) * 90}ms`);
  });

  if ("IntersectionObserver" in window) {
    const serviceObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const card = entry.target;
        card.classList.add("reveal-entering");
        card.addEventListener("animationend", () => {
          card.classList.remove("reveal-entering", "reveal-ready");
          card.classList.add("reveal-visible");
        }, { once: true });
        observer.unobserve(card);
      });
    }, { threshold: 0.12 });

    serviceCards.forEach((card) => serviceObserver.observe(card));
  } else {
    serviceCards.forEach((card) => {
      card.classList.remove("reveal-ready");
      card.classList.add("reveal-visible");
    });
  }
}

const inquiryForm = document.querySelector("#inquiry-form");
const formStatus = document.querySelector("#form-status");

if (inquiryForm && formStatus) {
  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(inquiryForm);
    if (formData.get("website_check")) return;

    const fields = [
      ["Full name", formData.get("name")],
      ["Business email", formData.get("email")],
      ["Company", formData.get("company")],
      ["Website", formData.get("website") || "Not provided"],
      ["Service required", formData.get("service")],
      ["Estimated support volume", formData.get("volume")],
      ["Preferred contact method", formData.get("contactMethod")],
      ["Phone", formData.get("phone") || "Not provided"],
      ["Project details", formData.get("details")]
    ];

    const message = fields.map(([label, value]) => `${label}: ${value}`).join("\n\n");
    const subject = encodeURIComponent(`Call for Help inquiry — ${formData.get("service")}`);
    const body = encodeURIComponent(message);
    const recipient = "callforhelpsupport@gmail.com"; // Replace with the confirmed business inbox before launch.

    formStatus.textContent = "Your email app should open with the inquiry ready to review and send. If it does not open, use the email link shown beside this form.";
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
}

const chatToggle = document.querySelector("#chat-toggle");
const chatPopover = document.querySelector("#chat-popover");
const chatClose = document.querySelector("#chat-close");

function setChatOpen(isOpen) {
  if (!chatToggle || !chatPopover) return;
  chatPopover.hidden = !isOpen;
  chatToggle.setAttribute("aria-expanded", String(isOpen));
  chatToggle.setAttribute("aria-label", isOpen ? "Close contact box" : "Open contact box");
  if (isOpen) chatClose?.focus();
}

document.querySelector(".main-nav .nav-cta")?.addEventListener("click", (event) => {
  event.preventDefault();
  navigation?.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Open navigation");
  setChatOpen(true);
});

chatToggle?.addEventListener("click", () => {
  setChatOpen(chatPopover?.hidden ?? true);
});

chatClose?.addEventListener("click", () => {
  setChatOpen(false);
  chatToggle?.focus();
});

document.querySelector("#chat-form-link")?.addEventListener("click", () => {
  setChatOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && chatPopover && !chatPopover.hidden) {
    setChatOpen(false);
    chatToggle?.focus();
  }
});
