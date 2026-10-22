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
