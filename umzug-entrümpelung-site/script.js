// Helper: show/hide service groups depending on selection
const leadForm = document.getElementById('leadForm');
const serviceSelect = document.getElementById('service');
const statusBox = document.getElementById('formStatus');

function updateServiceGroups() {
  const val = serviceSelect.value;
  document.querySelectorAll('.service-group').forEach(group => {
    const type = group.getAttribute('data-service');
    const shouldShow = (val === 'Beides' || val === type);
    group.style.display = shouldShow ? 'block' : 'none';
  });
}
if (serviceSelect) {
  serviceSelect.addEventListener('change', updateServiceGroups);
  updateServiceGroups();
}

// Submit -> open WhatsApp directly with filled details
leadForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Basic validation
  let valid = true;
  statusBox.textContent = '';
  statusBox.className = 'form-status';

  leadForm.querySelectorAll('.form-field').forEach(ff => ff.classList.remove('invalid'));

  const requiredFields = ['name','email','service','moveDate','privacy'];
  requiredFields.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const field = el.closest('.form-field') || el.closest('.checkbox');
    if ((el.type === 'checkbox' && !el.checked) ||
        (el.type !== 'checkbox' && !el.value)) {
      valid = false;
      field.classList.add('invalid');
    }
  });

  // Email format
  const email = document.getElementById('email');
  if (email?.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    valid = false;
    email.closest('.form-field').classList.add('invalid');
  }

  // Honeypot
  const hp = document.getElementById('company')?.value;
  if (hp) { return; }

  if (!valid) {
    statusBox.textContent = 'Bitte prüfen Sie die rot markierten Felder.';
    statusBox.classList.add('error');
    return;
  }

  // Collect data
  const fd = new FormData(leadForm);
  const data = Object.fromEntries(fd.entries());

  // Build WhatsApp message
  const lines = [];
  lines.push('Hallo! Ich habe eine Anfrage.');
  lines.push('');
  if (data.service) lines.push(`Auftrag: ${data.service}`);

  // Move details
  if (data.service === 'Umzug' || data.service === 'Beides') {
    const mv = [];
    if (data.from) mv.push(`Von: ${data.from}`);
    if (data.to) mv.push(`Nach: ${data.to}`);
    if (data.moveDate) mv.push(`Wunschtermin: ${data.moveDate}`);
    if (data.size) mv.push(`Wohnfläche: ${data.size} m²`);
    if (data.floor) mv.push(`Etage/Aufzug: ${data.floor}`);
    if (mv.length) {
      lines.push('— Umzugsdetails —');
      lines.push(...mv);
    }
  }

  // Clearance details
  if (data.service === 'Entrümpelung' || data.service === 'Beides') {
    const cl = [];
    if (data.objektart) cl.push(`Objektart: ${data.objektart}`);
    if (data.flaeche) cl.push(`Fläche: ${data.flaeche} m²`);
    if (data.entsorgung) cl.push(`Besonderheiten: ${data.entsorgung}`);
    if (cl.length) {
      lines.push('— Entrümpelung —');
      lines.push(...cl);
    }
  }

  // Common
  if (data.message) lines.push(`Hinweis: ${data.message}`);
  const contact = [];
  if (data.name) contact.push(`Name: ${data.name}`);
  if (data.phone) contact.push(`Telefon: ${data.phone}`);
  if (data.email) contact.push(`E-Mail: ${data.email}`);
  if (contact.length) {
    lines.push('— Kontakt —');
    lines.push(...contact);
  }

  const text = encodeURIComponent(lines.join('\n'));
  const waNumber = '4915221582878'; // E.164 ohne Plus
  const waLink = `https://wa.me/${waNumber}?text=${text}`;

  // Reset form & open WhatsApp
  leadForm.reset();
  updateServiceGroups?.();
  statusBox.textContent = 'Weiterleitung zu WhatsApp…';
  statusBox.classList.add('success');

  // Open in same tab for mobile, new tab for desktop
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = waLink;
  } else {
    window.open(waLink, '_blank', 'noopener');
  }
});

// Modals (defensive selectors in case elements are not on the page)
const imprintModal = document.getElementById('imprintModal');
const privacyModal = document.getElementById('privacyModal');
document.getElementById('open-imprint')?.addEventListener('click', (e) => { e.preventDefault(); imprintModal?.showModal(); });
document.getElementById('open-privacy')?.addEventListener('click', (e) => { e.preventDefault(); privacyModal?.showModal(); });
document.getElementById('open-privacy2')?.addEventListener('click', (e) => { e.preventDefault(); privacyModal?.showModal(); });
document.getElementById('open-privacy3')?.addEventListener('click', (e) => { e.preventDefault(); privacyModal?.showModal(); });

// Cookie banner
const cookieBanner = document.getElementById('cookieBanner');
const acceptBtn = document.getElementById('acceptCookies');
if (cookieBanner && acceptBtn) {
  if (!localStorage.getItem('cookiesAccepted')) {
    cookieBanner.style.display = 'block';
  }
  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', '1');
    cookieBanner.style.display = 'none';
  });
}
