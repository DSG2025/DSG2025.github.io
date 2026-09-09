const menuButton = document.querySelector("[data-menu-btn]");
const mobileMenu = document.querySelector("[data-mobile-menu]");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    menuButton.setAttribute(
      "aria-expanded",
      mobileMenu.classList.contains("open"),
    );
  });
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const customForm = document.querySelector("#customTripForm");

if (customForm) {
  customForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(customForm);
    const interests = [
      ...customForm.querySelectorAll('input[name="interest"]:checked'),
    ].map((checkbox) => checkbox.value);

    const message = `Hi Duy, I'd like help planning a custom OG Saigon experience.

Travel date: ${formData.get("date") || "Not decided"}
Travelers: ${formData.get("guests") || "Not sure"}
Duration: ${formData.get("duration") || "Not sure"}
Pickup area: ${formData.get("pickup") || "Not decided"}
Interests: ${interests.length ? interests.join(", ") : "Open to suggestions"}
Must include / avoid: ${formData.get("notes") || "None"}

Could you suggest an itinerary and price?`;

    const whatsappUrl =
      "https://wa.me/84938033395?text=" + encodeURIComponent(message);

    window.open(whatsappUrl, "_blank");
  });
}
