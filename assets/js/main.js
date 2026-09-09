const siteData = window.OG_SAIGON_SITE_DATA || {};

function formatRating(value) {
  const rating = Number(value);
  return Number.isFinite(rating) ? rating.toFixed(1) : String(value ?? "");
}

function formatReviewCount(value) {
  const count = Number(value);
  if (!Number.isFinite(count)) return String(value ?? "");

  return `${count.toLocaleString("en-US")} ${count === 1 ? "review" : "reviews"}`;
}

function applyPlatformLinks() {
  document.querySelectorAll("[data-platform-link]").forEach((link) => {
    const platformKey = link.dataset.platformLink;
    const platform = siteData.reviews?.[platformKey];

    if (platform?.url) {
      link.href = platform.url;
    }
  });
}

function applyReviewData() {
  document.querySelectorAll("[data-review-platform]").forEach((container) => {
    const platformKey = container.dataset.reviewPlatform;
    const platform = siteData.reviews?.[platformKey];

    if (!platform) return;

    const ratingText = formatRating(platform.rating);
    const reviewCountText = formatReviewCount(platform.count);

    container.querySelectorAll("[data-review-rating]").forEach((element) => {
      element.textContent = ratingText;
    });

    container.querySelectorAll("[data-review-count]").forEach((element) => {
      element.textContent = reviewCountText;
    });

    if (container.matches("a")) {
      if (platform.url) {
        container.href = platform.url;
      }

      const ariaAction =
        container.dataset.reviewAriaAction || "View OG Saigon on";
      container.setAttribute(
        "aria-label",
        `${ariaAction} ${platform.name}, ${ratingText} from ${reviewCountText}, opens in a new tab`,
      );
    }
  });

  const secondarySummary = document.querySelector(
    "[data-secondary-review-summary]",
  );

  if (secondarySummary) {
    const getYourGuide = siteData.reviews?.getyourguide;
    const airbnb = siteData.reviews?.airbnb;

    if (getYourGuide && airbnb) {
      secondarySummary.textContent =
        `Also ${formatRating(getYourGuide.rating)} on GetYourGuide · ` +
        `${formatRating(airbnb.rating)} on Airbnb`;
    }
  }

  const reviewSection = document.querySelector(".review-strip");
  if (reviewSection && siteData.reviewsLastChecked) {
    reviewSection.dataset.reviewsLastChecked = siteData.reviewsLastChecked;
  }
}

function applyContactData() {
  const whatsappNumber = siteData.contact?.whatsappNumber;

  if (whatsappNumber) {
    document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
      let message = "";

      try {
        const currentUrl = new URL(link.href, window.location.href);
        message = currentUrl.searchParams.get("text") || "";
      } catch {
        // Keep the existing fallback link if it cannot be parsed.
      }

      link.href = `https://wa.me/${whatsappNumber}${
        message ? `?text=${encodeURIComponent(message)}` : ""
      }`;
    });
  }

  const phoneHref = siteData.contact?.phoneHref;
  const phoneDisplay = siteData.contact?.phoneDisplay;

  document.querySelectorAll("[data-phone-link]").forEach((link) => {
    if (phoneHref) {
      link.href = `tel:${phoneHref}`;
    }

    if (phoneDisplay && /^[+\d\s().-]+$/.test(link.textContent.trim())) {
      link.textContent = phoneDisplay;
    }
  });
}

function applySiteData() {
  applyPlatformLinks();
  applyReviewData();
  applyContactData();
}

applySiteData();

const menuButton = document.querySelector("[data-menu-btn]");
const mobileMenu = document.querySelector("[data-mobile-menu]");

function setMobileMenu(open) {
  if (!menuButton || !mobileMenu) return;

  mobileMenu.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute(
    "aria-label",
    open ? "Close navigation menu" : "Open navigation menu",
  );
  menuButton.textContent = open ? "Close" : "Menu";
}

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    setMobileMenu(!mobileMenu.classList.contains("open"));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMobileMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMobileMenu(false);
  });
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

// Help visitors stay oriented by marking the current primary navigation item.
const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
document
  .querySelectorAll(".navlinks a:not(.btn), .mobile-menu a")
  .forEach((link) => {
    const linkPath =
      new URL(link.href, window.location.href).pathname.replace(/\/$/, "") || "/";

    if (linkPath !== "/" && currentPath.startsWith(linkPath)) {
      link.setAttribute("aria-current", "page");
    }
  });

const customForm = document.querySelector("#customTripForm");

if (customForm) {
  customForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(customForm);
    const interests = [
      ...customForm.querySelectorAll('input[name="interest"]:checked'),
    ].map((checkbox) => checkbox.value);

    const message = `Hi OG Saigon, I'd like help planning a custom experience.

Travel date: ${formData.get("date") || "Not decided"}
Travelers: ${formData.get("guests") || "Not sure"}
Duration: ${formData.get("duration") || "Not sure"}
Pickup area: ${formData.get("pickup") || "Not decided"}
Interests: ${interests.length ? interests.join(", ") : "Open to suggestions"}
Must include / avoid: ${formData.get("notes") || "None"}

Could you suggest an itinerary and price?`;

    const whatsappNumber =
      siteData.contact?.whatsappNumber || "84938033395";
    const whatsappUrl =
      `https://wa.me/${whatsappNumber}?text=` + encodeURIComponent(message);
    const submitButton = customForm.querySelector('button[type="submit"]');
    const formStatus = customForm.querySelector("[data-form-status]");

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Opening WhatsApp…";
    }

    if (formStatus) {
      formStatus.textContent =
        "Your message is ready. WhatsApp will open in a new tab; nothing is booked until we confirm with you.";
    }

    const whatsappWindow = window.open(whatsappUrl, "_blank", "noopener");

    if (!whatsappWindow && formStatus) {
      formStatus.textContent =
        "Your browser blocked the new tab. Please allow pop-ups for this site, then try again.";
    }

    window.setTimeout(() => {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent =
          submitButton.dataset.submitLabel || "Send My Request on WhatsApp";
      }
    }, 1200);
  });
}
