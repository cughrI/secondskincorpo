// This beginner version saves demo data in this browser using localStorage.
// It is useful for practice, but it is not secure for a real business website.
const app = document.querySelector('#app');
const nav = document.querySelector('#main-nav');
const toast = document.querySelector('#toast');
const ADMIN_EMAIL = 'admin@pumarasgroup.com'; // Demo admin account email
let currentUser = JSON.parse(localStorage.getItem('pumarasUser') || 'null');
let toastTimer;

const starterServices = [
  { title: 'Business Strategy', description: 'Make confident decisions with clear priorities, thoughtful planning, and a practical path to sustainable growth.', icon: '↗' },
  { title: 'Operations & Growth', description: 'Build smoother systems and stronger teams so your business can grow without losing what makes it special.', icon: '◈' },
  { title: 'Digital Transformation', description: 'Put the right technology and digital experiences to work for your people and your customers.', icon: '⌘' }
];
const esc = text => String(text || '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
function getList(key, fallback = []) { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
function saveList(key, list) { localStorage.setItem(key, JSON.stringify(list)); }
async function passwordHash(password) {
  // A small demo hash keeps the original password out of localStorage.
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
}
function flash(message) { toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 3000); }
function message(form, text, type = '') { const output = form.querySelector('.form-message'); if (output) { output.textContent = text; output.className = `form-message ${type}`; } }
function setNav() {
  document.querySelector('#nav-auth').innerHTML = currentUser
    ? `<a class="nav-login" href="#dashboard">${esc(currentUser.name)}</a><button class="button button-small" id="logout-button" type="button">Log out <span>↗</span></button>`
    : '<a class="nav-login" href="#login">Log in</a><a class="button button-small" href="#signup">Get started <span>↗</span></a>';
  document.querySelectorAll('[data-link]').forEach(link => link.classList.toggle('active', link.dataset.link === (location.hash.slice(1) || 'home')));
}
function cards(services = getList('pumarasServices', starterServices)) {
  return services.map((service, i) => `<article class="service-card"><span class="service-number">0${i + 1} / SERVICE</span><div class="service-icon" aria-hidden="true">${esc(service.icon || '◈')}</div><h3>${esc(service.title)}</h3><p>${esc(service.description)}</p></article>`).join('');
}
function show(html) { app.innerHTML = html; window.scrollTo(0, 0); }
function home() {
  const welcome = sessionStorage.getItem('showWelcome') === 'yes' && currentUser;
  sessionStorage.removeItem('showWelcome');
  show(`<section class="hero reveal"><div><div class="eyebrow">Independent business partners</div><h1>Clarity for<br>what’s <em>next.</em></h1><p class="hero-copy">We help ambitious businesses find their next chapter, make thoughtful moves, and turn good ideas into lasting progress.</p><div class="hero-actions"><a class="button" href="#contact">Let’s talk <span>↗</span></a><a class="text-link" href="#services">Explore our services <span>→</span></a></div></div><div class="hero-visual"><img class="hero-photo" src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85" alt="A light-filled studio workspace"><div class="photo-caption">GOOD WORK STARTS WITH A CLEAR VIEW.</div><div class="floating-card"><strong>People<br>first.</strong><span>Progress with purpose</span></div></div></section>${welcome ? `<section class="welcome-banner" style="text-align:center;padding:20px">Welcome back, ${esc(currentUser.name.split(' ')[0])}!</section>` : ''}<section class="trust-strip"><strong>Thoughtful by design</strong><span>•</span><strong>Built for people</strong><span>•</span><strong>Focused on progress</strong></section><section class="section"><div class="section-heading"><div><div class="eyebrow">What we do</div><h2>Make your next move<br>your best one.</h2></div><p>Good advice should make a difference you can see. We work alongside you to solve today’s challenges and open up tomorrow’s opportunities.</p></div><div class="service-grid">${cards()}</div><div style="margin-top:28px"><a class="text-link" href="#services">See all services <span>→</span></a></div></section><section class="section split"><div class="split-art" role="img" aria-label="Colleagues sharing ideas around a table"></div><div class="split-copy"><div class="eyebrow">A different kind of partner</div><h2>Good work starts with a good relationship.</h2><p>We take time to understand your business and bring clear, practical thinking to the work that matters most.</p><a class="button" href="#about">Get to know us <span>↗</span></a></div></section>`);
}
function about() { show(`<section class="page-shell reveal"><div class="page-heading"><div class="eyebrow">About Second Skin Corpo</div><h1>Meet our group.</h1><p>We’re the people behind Second Skin Corpo.</p></div><div class="about-layout"><img class="about-image" src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=85" alt="A collaborative team meeting"><div class="prose"><div class="eyebrow">Our members</div><h2>Second Skin Corpo</h2><ul class="member-list"><li>CAFE, JANE MECAELLA S.</li><li>BAQUIAL, CRYSTAL LEE S.</li><li>LORINO, LYKA F.</li><li>PUMARAS, KARYN CLAIR A.</li><li>POSTRADO, MICKAELLA R.</li><li>CONTAOI, YANA ZERLINE N.</li></ul></div></div><div class="values"><article class="value"><h3>Start with people</h3><p>We listen carefully and build real relationships.</p></article><article class="value"><h3>Make it useful</h3><p>Clear advice and achievable next steps matter.</p></article><article class="value"><h3>Look to the long term</h3><p>We care about progress that lasts.</p></article></div></section>`); }
function services() { show(`<section class="page-shell reveal"><div class="page-heading"><div class="eyebrow">How we help</div><h1>Practical support for meaningful progress.</h1><p>Bring us your big questions, your challenges, or the next opportunity you’re ready to take on.</p></div><div class="service-grid">${cards()}</div><div style="text-align:center;margin-top:42px"><a class="button" href="#contact">Talk through a challenge <span>↗</span></a></div></section>`); }
function contact() { show(`<section class="page-shell reveal"><div class="page-heading"><div class="eyebrow">Contact</div><h1>Let’s start a conversation.</h1><p>Tell us a little about what you’re working on. We’d love to hear from you.</p></div><div class="contact-layout"><aside class="contact-info"><h2>We’re all ears.</h2><p>Whether you have a clear brief or just a feeling something could be better, a good conversation is a great place to start.</p><div class="contact-detail"><strong>Email</strong><br><a href="mailto:hello@pumarasgroup.com">hello@pumarasgroup.com</a></div><div class="contact-detail"><strong>Based in</strong><br>Philippines · Working everywhere</div></aside><form class="form-card" id="contact-form"><h2>Send us a message</h2><div class="field"><label for="contact-name">Your name</label><input id="contact-name" name="name" required maxlength="100" placeholder="Your name"></div><div class="field"><label for="contact-email">Email address</label><input id="contact-email" name="email" type="email" required placeholder="you@company.com"></div><div class="field"><label for="contact-message">What’s on your mind?</label><textarea id="contact-message" name="message" required minlength="10" maxlength="5000" placeholder="A little about what you're looking for..."></textarea></div><button class="button" type="submit">Save message <span>↗</span></button><p class="form-message" aria-live="polite"></p></form></div></section>`); document.querySelector('#contact-form').addEventListener('submit', event => { event.preventDefault(); const data = new FormData(event.currentTarget); const all = getList('pumarasMessages'); all.push({ name: data.get('name'), email: data.get('email'), message: data.get('message'), date: new Date().toLocaleDateString() }); saveList('pumarasMessages', all); event.currentTarget.reset(); message(event.currentTarget, 'Thanks! Your message has been saved in this browser.', 'success'); }); }
function auth(kind) {
  const signup = kind === 'signup';
  show(`<section class="auth-shell reveal"><form class="form-card" id="auth-form"><div class="eyebrow">Pumaras Group</div><h1>${signup ? 'Create your account.' : 'Welcome back.'}</h1><p class="intro">${signup ? 'Create a demo account saved in this browser.' : 'Log in to your demo account.'}</p>${signup ? '<div class="field"><label for="auth-name">Full name</label><input id="auth-name" name="name" required minlength="2" maxlength="100" placeholder="Your name"></div>' : ''}<div class="field"><label for="auth-email">Email address</label><input id="auth-email" name="email" type="email" required placeholder="you@example.com"></div><div class="field"><label for="auth-password">Password</label><input id="auth-password" name="password" type="password" required minlength="8" placeholder="At least 8 characters"></div><button class="button" type="submit">${signup ? 'Create account' : 'Log in'} <span>↗</span></button><p class="form-message" aria-live="polite"></p><p class="form-foot">${signup ? 'Already have an account? <a href="#login">Log in</a>' : 'New here? <a href="#signup">Create an account</a>'}</p></form></section>`);
  document.querySelector('#auth-form').addEventListener('submit', async event => { event.preventDefault(); const form = event.currentTarget; const data = new FormData(form); const email = String(data.get('email')).trim().toLowerCase(); const accounts = getList('pumarasAccounts'); const hashedPassword = await passwordHash(String(data.get('password')));
    if (signup) { if (accounts.some(account => account.email === email)) return message(form, 'That email is already registered. Please log in.', 'error'); const account = { name: String(data.get('name')).trim(), email, passwordHash: hashedPassword }; accounts.push(account); saveList('pumarasAccounts', accounts); currentUser = { name: account.name, email }; localStorage.setItem('pumarasUser', JSON.stringify(currentUser)); sessionStorage.setItem('showWelcome', 'yes'); location.hash = '#home'; }
    else { const account = accounts.find(item => item.email === email && item.passwordHash === hashedPassword); if (!account) return message(form, 'Email or password is incorrect.', 'error'); currentUser = { name: account.name, email: account.email }; localStorage.setItem('pumarasUser', JSON.stringify(currentUser)); sessionStorage.setItem('showWelcome', 'yes'); location.hash = '#home'; }
  });
}
function dashboard() {
  if (!currentUser) { location.hash = '#login'; return; }
  const admin = currentUser.email === ADMIN_EMAIL;
  show(`<section class="dashboard reveal"><div class="dash-top"><div><div class="eyebrow">Your account</div><h1>Hello, ${esc(currentUser.name.split(' ')[0])}.</h1></div><a class="button" href="#home">Back to home <span>↗</span></a></div><section class="dash-card"><h2>Account details</h2><div class="profile-grid"><div class="profile-item"><span>Full name</span><strong>${esc(currentUser.name)}</strong></div><div class="profile-item"><span>Email address</span><strong>${esc(currentUser.email)}</strong></div><div class="profile-item"><span>Account type</span><strong>${admin ? 'Demo administrator' : 'Member'}</strong></div></div></section>${admin ? `<section class="dash-card"><h2>Demo administrator tools</h2><p>Add or remove services stored in this browser.</p><form id="service-form" class="service-admin-form"><div><label for="service-title">Service name</label><input id="service-title" name="title" required placeholder="Service name"></div><div><label for="service-description">Description</label><input id="service-description" name="description" required placeholder="Short description"></div><div><label for="service-icon">Icon</label><input id="service-icon" name="icon" placeholder="◈"></div><button class="button button-small" type="submit">Add service <span>+</span></button></form><div id="admin-services"></div><h2 style="margin-top:28px">Saved contact messages</h2><div id="admin-messages" class="admin-table-wrap"></div></section>` : ''}</section>`);
  if (admin) { document.querySelector('#service-form').addEventListener('submit', event => { event.preventDefault(); const data = new FormData(event.currentTarget); const list = getList('pumarasServices', starterServices); list.push({ title: data.get('title'), description: data.get('description'), icon: data.get('icon') || '◈' }); saveList('pumarasServices', list); dashboard(); }); drawAdmin(); }
}
function drawAdmin() {
  const services = getList('pumarasServices', starterServices); const target = document.querySelector('#admin-services');
  target.innerHTML = `<div class="admin-table-wrap"><table><thead><tr><th>Service</th><th>Description</th><th></th></tr></thead><tbody>${services.map((item, i) => `<tr><td>${esc(item.title)}</td><td>${esc(item.description)}</td><td><button class="table-action" data-remove="${i}" type="button">Delete</button></td></tr>`).join('')}</tbody></table></div>`;
  target.querySelectorAll('[data-remove]').forEach(button => button.addEventListener('click', () => { const list = getList('pumarasServices', starterServices); list.splice(Number(button.dataset.remove), 1); saveList('pumarasServices', list); dashboard(); }));
  const messages = getList('pumarasMessages'); document.querySelector('#admin-messages').innerHTML = messages.length ? `<table><thead><tr><th>From</th><th>Email</th><th>Message</th><th>Date</th></tr></thead><tbody>${messages.map(item => `<tr><td>${esc(item.name)}</td><td>${esc(item.email)}</td><td>${esc(item.message)}</td><td>${esc(item.date)}</td></tr>`).join('')}</tbody></table>` : 'No messages saved yet.';
}
function render() {
  setNav(); const page = location.hash.slice(1) || 'home';
  const pages = { home, about, services, contact, login: () => auth('login'), signup: () => auth('signup'), dashboard };
  if (page === 'admin') return dashboard();
  (pages[page] || (() => show('<section class="page-shell page-heading"><h1>Page not found.</h1><a class="button" href="#home">Back home</a></section>')))();
  setNav();
}
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#menu-toggle').addEventListener('click', event => { const open = nav.classList.toggle('open'); event.currentTarget.setAttribute('aria-expanded', String(open)); });
nav.addEventListener('click', event => {
  if (event.target.closest('a')) nav.classList.remove('open');
  if (event.target.closest('#logout-button')) { currentUser = null; localStorage.removeItem('pumarasUser'); sessionStorage.removeItem('showWelcome'); location.hash = '#home'; flash('You have been logged out.'); setNav(); }
});
window.addEventListener('hashchange', render);
render();
