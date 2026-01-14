// js/contact.js
const FORM_ENDPOINT = "https://formspree.io/f/mzddzzyd"; // <-- remplace ici

const form = document.getElementById("accverse-contact-form");
const statusEl = document.getElementById("formStatus");
const sendBtn = document.getElementById("sendBtn");

function setStatus(msg, ok = true) {
  statusEl.textContent = msg;
  statusEl.style.opacity = "0.85";
  statusEl.style.color = ok ? "#000" : "#8a0000";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Validations simples
  if (!email) return setStatus("Email is required.", false);
  if (!message) return setStatus("Message is required.", false);

  sendBtn.disabled = true;
  sendBtn.style.opacity = "0.7";
  setStatus("Sending…");

  try {
    const payload = {
      firstName,
      email,
      message,
      page: window.location.href,
      userAgent: navigator.userAgent,
      ts: new Date().toISOString(),
    };

    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      // Formspree renvoie du JSON, mais on reste safe
      throw new Error("Request failed");
    }

    form.reset();
    setStatus("Message sent. Thank you.");
  } catch (err) {
    setStatus("Could not send. Please try again or email us directly.", false);
  } finally {
    sendBtn.disabled = false;
    sendBtn.style.opacity = "1";
  }
});
