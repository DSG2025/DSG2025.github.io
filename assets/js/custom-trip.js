(() => {
  // Use a page-specific form ID so the shared legacy form handler cannot bind here.
  const form = document.querySelector('#customExperienceForm');
  if (!form) return;

  const status = document.querySelector('#customExperienceStatus');
  const button = form.querySelector('button[type="submit"]');
  const whatsappNumber = '84938033395';

  const valuesFor = (name) =>
    [...form.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();

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

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;

    if (status) status.textContent = 'Opening WhatsApp with your trip idea...';
    if (button) button.disabled = true;

    window.open(url, '_blank', 'noopener');

    window.setTimeout(() => {
      if (button) button.disabled = false;
      if (status) status.textContent = 'Your details are ready in WhatsApp. Nothing is booked until we confirm with you.';
    }, 650);
  });
})();
