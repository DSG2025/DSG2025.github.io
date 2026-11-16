(() => {
  const form = document.querySelector('#customExperienceForm');
  if (!form) return;

  const status = document.querySelector('#customExperienceStatus');
  const fallback = document.querySelector('#customExperienceFallback');
  const messageBox = document.querySelector('#customExperienceMessage');
  const reopenLink = document.querySelector('#customExperienceReopen');
  const copyButton = document.querySelector('#customExperienceCopy');
  const prefillNote = document.querySelector('#customExperiencePrefill');
  const button = form.querySelector('button[type="submit"]');
  const number = window.OG_SAIGON_SITE_DATA?.contact?.whatsappNumber || '84938033395';

  // Keep existing experience-page referral URLs functional.
  const sources = {
    'cu-chi-tunnels': ['Cu Chi Tunnels', "I'm interested in the Cu Chi Tunnels and would like a private version."],
    'cu-chi-war-museum': ['Cu Chi + War Remnants Museum', "I'm interested in Cu Chi and the War Remnants Museum on a private day trip."],
    'hidden-saigon': ['Hidden Saigon', "I'm interested in local Saigon food and would like to customize the experience."],
    'transport': ['Transport', "I'm looking for private transport and perhaps a custom experience."]
  };
  const from = new URLSearchParams(location.search).get('from');
  const source = Object.prototype.hasOwnProperty.call(sources, from) ? sources[from] : null;
  const idea = form.elements.tripIdea;
  const navType = performance?.getEntriesByType?.('navigation')?.[0]?.type;
  if (source && idea && !idea.value.trim() && !['reload','back_forward'].includes(navType)) {
    idea.value = source[1];
    if (prefillNote) {
      prefillNote.textContent = "Starting from: " + source[0] + ". Feel free to change the idea.";
      prefillNote.hidden = false;
    }
  }

  const message = () => {
    const parts = ["Hi OG Saigon, I'd like to discuss a private trip."];
    const date = form.elements.tripDate?.value;
    const travelers = form.elements.travelers?.value;
    const description = idea?.value.trim();
    if (date) parts.push("Travel date: " + date);
    if (travelers) parts.push("Travelers: " + travelers);
    parts.push("My idea: " + (description || "I'd love your suggestions."));
    if (source) parts.push("Starting from: " + source[0]);
    return parts.join('\n');
  };
  const urlFor = () => "https://wa.me/" + number + "?text=" + encodeURIComponent(message());
  const refresh = () => {
    if (!fallback || fallback.hidden) return;
    if (messageBox) messageBox.value = message();
    if (reopenLink) reopenLink.href = urlFor();
  };
  form.addEventListener('input', refresh);
  form.addEventListener('change', refresh);
  form.addEventListener('submit', event => {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (fallback) fallback.hidden = false;
    document.body.classList.add('form-message-ready');
    refresh();
    if (status) status.textContent = "Your message is ready. Open WhatsApp and tap Send there. If it doesn't open, copy the message below.";
    try { window.open(urlFor(), '_blank', 'noopener'); } catch (_) { /* The link remains visible. */ }
    if (button) {
      button.disabled = true;
      window.setTimeout(() => { button.disabled = false; }, 800);
    }
  });
  if (copyButton) {
    copyButton.addEventListener('click', async () => {
      const value = message();
      let copied = false;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(value);
          copied = true;
        }
      } catch (_) { /* Fallback selection below. */ }
      if (!copied && messageBox) {
        messageBox.focus(); messageBox.select();
        try { copied = document.execCommand('copy'); } catch (_) {}
      }
      if (status) status.textContent = copied ? "Message copied. Paste into WhatsApp and tap Send." : "Select and copy the message to send on WhatsApp.";
    });
  }
})();

// Native swipe galleries with optional desktop and keyboard controls. No autoplay.
(() => {
  document.querySelectorAll('[data-custom-carousel]').forEach(gallery => {
    const track = gallery.querySelector('.custom-carousel-track');
    const slides = [...gallery.querySelectorAll('.custom-carousel-slide')];
    const prev = gallery.querySelector('.custom-carousel-prev');
    const next = gallery.querySelector('.custom-carousel-next');
    const count = gallery.querySelector('.custom-carousel-count');
    if (!track || slides.length < 2 || !prev || !next || !count) return;
    let active = 0;
    let frame = 0;
    const left = index => slides[index].offsetLeft - slides[0].offsetLeft;
    const refresh = () => {
      frame = 0;
      const x = track.scrollLeft;
      let closest = 0;
      slides.forEach((slide, i) => { if (Math.abs(left(i) - x) < Math.abs(left(closest) - x)) closest = i; });
      active = closest;
      count.textContent = (active + 1) + ' / ' + slides.length;
      prev.disabled = active === 0;
      next.disabled = active === slides.length - 1;
    };
    const move = delta => {
      refresh();
      const destination = Math.max(0, Math.min(slides.length - 1, active + delta));
      const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      track.scrollTo({left: left(destination), behavior: reduceMotion ? 'auto' : 'smooth'});
    };
    prev.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    track.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        move(event.key === 'ArrowRight' ? 1 : -1);
      }
    });
    track.addEventListener('scroll', () => {
      if (!frame) frame = window.requestAnimationFrame(refresh);
    }, {passive:true});
    window.addEventListener('resize', refresh, {passive:true});
    refresh();
  });
})();
