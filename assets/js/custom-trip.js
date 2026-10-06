(() => {
  // Use a page-specific form ID so the shared legacy form handler cannot bind here.
  const form = document.querySelector('#customExperienceForm');
  if (!form) return;

  const status = document.querySelector('#customExperienceStatus');
  const button = form.querySelector('button[type="submit"]');
  const prefillNote = document.querySelector('#customExperiencePrefill');
  const fallback = document.querySelector('#customExperienceFallback');
  const messageBox = document.querySelector('#customExperienceMessage');
  const reopenLink = document.querySelector('#customExperienceReopen');
  const copyButton = document.querySelector('#customExperienceCopy');

  // Single source of truth is site-data.js; the literal is only a last-resort fallback.
  const whatsappNumber =
    (window.OG_SAIGON_SITE_DATA &&
      window.OG_SAIGON_SITE_DATA.contact &&
      window.OG_SAIGON_SITE_DATA.contact.whatsappNumber) ||
    '84938033395';

  // ------------------------------------------------------------
  // Prefill: /custom-trip/?from=<key>#trip-builder
  // Whitelist only. Unknown keys are ignored; no URL text is ever
  // copied into the form, so a crafted link cannot inject content.
  // Edit labels / starter text / checkbox values here.
  // destination and interest values must match the form checkboxes.
  // ------------------------------------------------------------
  const SOURCES = {
    'cu-chi-tunnels': {
      label: 'Cu Chi Tunnels experience',
      destinations: ['Cu Chi'],
      interests: ['History'],
      idea: 'I’m interested in the Cu Chi Tunnels experience and would like to adjust it: '
    },
    'cu-chi-war-museum': {
      label: 'Cu Chi + War Remnants Museum experience',
      destinations: ['Saigon', 'Cu Chi'],
      interests: ['History'],
      idea: 'I’m interested in the Cu Chi + War Remnants Museum day and would like to adjust it: '
    },
    'hidden-saigon': {
      label: 'Hidden Saigon experience',
      destinations: ['Saigon'],
      interests: ['Food', 'Local life'],
      idea: 'I’m interested in Hidden Saigon and would like to adjust it: '
    },
    transport: {
      label: 'Transport page',
      destinations: [],
      interests: [],
      idea: 'I’m arranging transport and would also like to plan a private experience: '
    }
  };

  const params = new URLSearchParams(window.location.search);
  const fromKey = params.get('from');
  const source =
    fromKey && Object.prototype.hasOwnProperty.call(SOURCES, fromKey) ? SOURCES[fromKey] : null;

  const tickAll = (name, values) => {
    values.forEach((value) => {
      const input = [...form.querySelectorAll(`input[name="${name}"]`)].find(
        (el) => el.value === value
      );
      if (input) input.checked = true;
    });
  };

  // Do not reapply defaults on reload/back, or over restored visitor choices.
  const navigationType = window.performance?.getEntriesByType?.('navigation')[0]?.type;
  const hasVisitorValues = () =>
    [...form.querySelectorAll('input[type="checkbox"]')].some((input) => input.checked) ||
    Boolean(form.elements.tripIdea?.value.trim()) ||
    Boolean(form.elements.tripDate?.value) ||
    (form.elements.travelers && form.elements.travelers.value !== form.elements.travelers.defaultValue) ||
    (form.elements.duration && form.elements.duration.value !== form.elements.duration.options[0].value);
  const mayPrefill = source && !['reload', 'back_forward'].includes(navigationType) && !hasVisitorValues();

  if (mayPrefill) {
    tickAll('destination', source.destinations);
    tickAll('interest', source.interests);

    const idea = form.elements.tripIdea;
    // Never overwrite something the visitor already typed (e.g. browser restored the form).
    if (idea && !idea.value.trim()) idea.value = source.idea;

    if (prefillNote) {
      prefillNote.textContent = `Starting from: ${source.label}. Change anything below.`;
      prefillNote.hidden = false;
    }
  }

  const valuesFor = (name) =>
    [...form.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);

  const buildMessage = () => {
    const date = form.elements.tripDate?.value || 'Not decided yet';
    const travelers = form.elements.travelers?.value || 'Not decided yet';
    const duration = form.elements.duration?.value || 'Not sure yet';
    const destinations = valuesFor('destination');
    const interests = valuesFor('interest');
    const idea = (form.elements.tripIdea?.value || '').trim();

    const lines = [
      "Hi OG Saigon, I'd like to build a custom experience.",
      '',
      `Travel date: ${date}`,
      `Travelers: ${travelers}`,
      `Time available: ${duration}`,
      `Interested in: ${destinations.length ? destinations.join(', ') : 'Not sure yet'}`,
      `I'm into: ${interests.length ? interests.join(', ') : 'Open to suggestions'}`,
      `My idea: ${idea || 'I would like your help shaping the experience.'}`
    ];

    // Lets the team see which page the enquiry started from (not shown if visitor came directly).
    if (source) lines.push('', `Started from: ${source.label}`);

    return lines.join('\n');
  };

  const setStatus = (text) => {
    if (status) status.textContent = text;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();

    const message = buildMessage();
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Always show the message and a real link, so the visitor is never stuck
    // if the new tab is blocked, an in-app browser ignores window.open, or
    // WhatsApp is not installed.
    if (messageBox) messageBox.value = message;
    if (reopenLink) reopenLink.href = url;
    if (fallback) fallback.hidden = false;

    document.body.classList.add('form-message-ready');
    setStatus('Your message is ready below and updates automatically when you edit the form. Continue in WhatsApp and tap Send there. If WhatsApp does not open, use the link below or copy your message. Nothing is booked until we confirm with you.');

    // Keep opener isolation. The real link and copy action are always available.
    try {
      window.open(url, '_blank', 'noopener');
    } catch (error) {
      // The visible fallback remains usable even if a browser rejects window.open.
    }

    // Short lock only to avoid opening several tabs from a double tap.
    if (button) {
      button.disabled = true;
      window.setTimeout(() => {
        button.disabled = false;
      }, 800);
    }
  });

  // Keep the visible message and retry link in sync when the visitor edits the form.
  const refreshFallback = () => {
    if (!fallback || fallback.hidden) return;
    const message = buildMessage();
    if (messageBox) messageBox.value = message;
    if (reopenLink) reopenLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };
  form.addEventListener('input', refreshFallback);
  form.addEventListener('change', refreshFallback);

  if (copyButton) {
    copyButton.addEventListener('click', async () => {
      const text = messageBox ? messageBox.value : '';
      if (!text) return;

      let copied = false;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
          copied = true;
        }
      } catch (error) {
        copied = false;
      }

      if (!copied && messageBox) {
        messageBox.focus();
        messageBox.select();
        try {
          copied = document.execCommand('copy');
        } catch (error) {
          copied = false;
        }
      }

      setStatus(
        copied
          ? 'Message copied. Paste it into WhatsApp and tap Send.'
          : 'Could not copy automatically. Please select the message above and copy it.'
      );
    });
  }
})();
