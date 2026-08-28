// EDITABLE PERSONAL FILE: add photos, memories, jokes, songs here.
const PERSONAL = { friendName: 'Supreeti', nickname: 'Supu', years: 8 };

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const toast = (message) => { const node = $('#toast'); node.textContent = message; node.classList.add('show'); setTimeout(() => node.classList.remove('show'), 2200); };
$('#menuButton').addEventListener('click', () => { const open = $('#navLinks').classList.toggle('open'); $('#menuButton').setAttribute('aria-expanded', open); $('#menuButton').setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
$$('.nav-links a').forEach((link) => link.addEventListener('click', () => { $('#navLinks').classList.remove('open'); $('#menuButton').setAttribute('aria-expanded', 'false'); }));

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: .12 });
$$('.reveal').forEach((item) => observer.observe(item));

const matchValues = ['📞', '📞', '👜', '👜', '🐈', '🐈'];
let firstTile = null; let lockBoard = false; let matched = 0;
const matchGrid = $('#matchGrid');
[...matchValues].sort(() => Math.random() - .5).forEach((value) => {
	const tile = document.createElement('button'); tile.className = 'match-tile'; tile.textContent = '?'; tile.dataset.value = value; tile.setAttribute('aria-label', 'Hidden memory');
	tile.addEventListener('click', () => {
		if (lockBoard || tile.classList.contains('flipped') || tile.classList.contains('matched')) return;
		tile.textContent = value; tile.classList.add('flipped');
		if (!firstTile) { firstTile = tile; return; }
		if (firstTile.dataset.value === tile.dataset.value) { firstTile.classList.add('matched'); tile.classList.add('matched'); matched += 1; firstTile = null; $('#matchScore').textContent = `${matched} / 3`; $('#matchResult').textContent = matched === 3 ? 'Archive unlocked. You win.' : 'A match. Suspiciously good.'; return; }
		lockBoard = true; setTimeout(() => { firstTile.textContent = '?'; tile.textContent = '?'; firstTile.classList.remove('flipped'); tile.classList.remove('flipped'); firstTile = null; lockBoard = false; }, 700);
	}); matchGrid.appendChild(tile);
});

$$('.joke-chip').forEach((chip) => {
	chip.addEventListener('click', () => { const messages = { 'Kusu ko khutta': 'THE LEGEND RETURNS.', TYENSYE: 'You weren’t supposed to find this.', 'bag lai falafal': 'A historical event, apparently.' }; $('#jokeResult').textContent = messages[chip.textContent] || 'Classified.'; });
	chip.addEventListener('dragstart', (event) => event.dataTransfer.setData('text/plain', chip.textContent));
});
$('#jokeStage').addEventListener('dragover', (event) => event.preventDefault());
$('#jokeStage').addEventListener('drop', (event) => { event.preventDefault(); const text = event.dataTransfer.getData('text/plain'); const chip = $$('.joke-chip').find((item) => item.textContent === text); if (chip) { chip.style.left = `${event.offsetX - 35}px`; chip.style.top = `${event.offsetY - 15}px`; $('#jokeResult').textContent = 'Artifact relocated. Science advances.'; } });

const memoryText = { purse: ['01', 'The day Kavya’s chakra became a purse storage facility.', 'Class 8. Kavya’s chakra. A purse somehow ended up inside it. Nobody questioned the logic. We simply accepted the chaos.'], bag: ['02', 'The Great Bag Falafal™', 'The bag was thrown. Chaos happened. History was made.'], study: ['03', 'We actually studied. Allegedly.', 'Those calls started with academics and ended everywhere else.'], tour: ['04', 'The Tour Incident™', 'The tour. Abhipsa. The fight. Need I say more?'], nawang: ['05', 'The Nawang Battle', 'Casualties: dignity. Winner: questionable.'] };
$$('.archive-item').forEach((item) => item.addEventListener('click', () => { $$('.archive-item').forEach((other) => other.classList.remove('active')); item.classList.add('active'); const [number, title, description] = memoryText[item.dataset.memory]; $('#incidentPanel').innerHTML = `<span class="incident-label">INCIDENT REPORT / ${number}</span><h3>${title}</h3><p>${description}</p><button class="tiny-button" id="incidentButton">file remains open</button>`; $('#incidentButton').addEventListener('click', () => toast('Neither do I.')); }));
$('#incidentButton').addEventListener('click', () => toast('Neither do I.'));

$('#chaosButton').addEventListener('click', () => { document.body.classList.add('chaos'); $('#chaosMeter').style.width = '100%'; $('#chaosResult').textContent = 'CHAOS MODE: active for 5 seconds.'; setTimeout(() => { document.body.classList.remove('chaos'); $('#chaosMeter').style.width = '4%'; $('#chaosResult').textContent = 'Okay that’s enough.'; }, 5000); });
$$('.wall-photo').forEach((photo) => photo.addEventListener('click', () => { $('#lightboxImage').src = photo.dataset.image; $('#lightboxImage').alt = photo.querySelector('img').alt; $('#lightboxCaption').textContent = photo.dataset.caption; $('#lightbox').classList.add('visible'); }));
$('#closeLightbox').addEventListener('click', () => $('#lightbox').classList.remove('visible')); $('#lightbox').addEventListener('click', (event) => event.target.id === 'lightbox' && $('#lightbox').classList.remove('visible'));
$('#envelope').addEventListener('click', () => { const section = $('.letter-section'); section.classList.toggle('open'); $('#envelope').setAttribute('aria-expanded', section.classList.contains('open')); });
$('#lastButton').addEventListener('click', () => { $('.finale').classList.add('revealed'); $('#lastButton').textContent = 'told you so ↓'; });
$('#replay').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

let heartClicks = 0; $('#heartButton').addEventListener('click', () => { heartClicks += 1; if (heartClicks === 8) { $('#surprise').classList.add('visible'); document.body.classList.add('chaos'); toast('8 years. Still not enough.'); } else toast(`${8 - heartClicks} more...`); });
$('#closeSurprise').addEventListener('click', () => { $('#surprise').classList.remove('visible'); document.body.classList.remove('chaos'); });
document.addEventListener('keydown', (event) => { if (event.key.toLowerCase() === 's') toast('S for Supu. Obviously.'); if (event.key === 'Escape') { $('#lightbox').classList.remove('visible'); $('#surprise').classList.remove('visible'); } });
