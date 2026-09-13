const WHATSAPP_NUMBER = "916206831428";
const OWNER_EMAIL = "lavkushkumar80266@gmail.com";

document.getElementById("enquiryForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const form = event.target;
  const button = form.querySelector("button");
  const data = new FormData(form);

  const enquiry = {
    name: data.get("name"),
    phone: data.get("phone"),
    programme: data.get("programme"),
    message: data.get("message") || "Not specified",
    _subject: "New JRU Admission Enquiry",
    _template: "table"
  };

  button.textContent = "Sending enquiry...";
  button.disabled = true;

  try {
    await fetch(`https://formsubmit.co/ajax/${OWNER_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(enquiry)
    });
  } catch (error) {
    console.log("Email sending failed, WhatsApp will still open.");
  }

  const message =
    `*New JRU Admission Enquiry*%0A%0A` +
    `*Name:* ${enquiry.name}%0A` +
    `*Mobile:* ${enquiry.phone}%0A` +
    `*Programme:* ${enquiry.programme}%0A` +
    `*Message:* ${enquiry.message}`;

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
    "_blank"
  );

  form.reset();
  button.textContent = "Enquiry Sent ✓";

  setTimeout(() => {
    button.textContent = "Send Enquiry on WhatsApp →";
    button.disabled = false;
  }, 4000);
});

document.getElementById("menuButton").addEventListener("click", function () {
  document.getElementById("nav").classList.toggle("open");
});
