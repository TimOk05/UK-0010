(() => {
  const form = document.querySelector('#project-brief');
  const routeCards = [...document.querySelectorAll('.route-card')];
  const routeInputs = [...form.querySelectorAll('input[name="project-type"]')];
  const routeSummary = document.querySelector('#route-summary');
  const fileInput = form.querySelector('input[type="file"]');
  const fileState = form.querySelector('.file-state');
  const message = document.querySelector('#form-message');

  const setRoute = (route, scrollToBrief) => {
    const chosen = routeInputs.find((input) => input.value.toLowerCase() === route);
    if (!chosen) return;

    chosen.checked = true;
    routeSummary.textContent = chosen.value;
    routeCards.forEach((card) => {
      const selected = card.dataset.route === route;
      card.classList.toggle('is-selected', selected);
      card.setAttribute('aria-pressed', String(selected));
    });

    if (scrollToBrief) {
      document.querySelector('#brief').scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(() => form.querySelector('input[name="postcode"]').focus({ preventScroll: true }), 450);
    }
  };

  routeCards.forEach((card) => {
    card.addEventListener('click', () => setRoute(card.dataset.route, true));
  });

  routeInputs.forEach((input) => {
    input.addEventListener('change', () => setRoute(input.value.toLowerCase(), false));
  });

  fileInput.addEventListener('change', () => {
    const count = fileInput.files.length;
    fileState.textContent = count ? count + (count === 1 ? ' photo' : ' photos') : 'Optional';
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    message.hidden = true;

    if (!form.checkValidity()) {
      form.reportValidity();
      message.textContent = 'Please complete the selected project type and the highlighted details before preparing the brief.';
      message.hidden = false;
      return;
    }

    const route = form.querySelector('input[name="project-type"]:checked').value;
    routeSummary.textContent = route;
    message.textContent = 'Your ' + route.toLowerCase() + ' brief is ready. This concept does not send, store or transmit your details; it shows a clearer next step for an enquiry.';
    message.hidden = false;
    message.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
})();
