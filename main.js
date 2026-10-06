document.getElementById('yr').textContent = new Date().getFullYear();

// Build the gallery from gallery.js
(function () {
  const grid = document.getElementById('galleryGrid');
  const photos = window.GALLERY || [];
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCap');

  photos.forEach((p, i) => {
    const li = document.createElement('li');
    if (p.wide) li.className = 'wide';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Open photo: ' + (p.caption || 'gallery photo'));
    const img = document.createElement('img');
    img.src = p.src;
    img.alt = p.caption || '';
    if (i > 5) img.loading = 'lazy';
    btn.appendChild(img);
    if (p.caption) {
      const cap = document.createElement('span');
      cap.className = 'cap';
      cap.textContent = p.caption;
      btn.appendChild(cap);
    }
    btn.addEventListener('click', () => {
      lbImg.src = p.src;
      lbImg.alt = p.caption || '';
      lbCap.textContent = p.caption || '';
      lb.showModal();
    });
    li.appendChild(btn);
    grid.appendChild(li);
  });

  // Empty slots invite more photos while the gallery is small
  for (let i = photos.length; i < 3; i++) {
    const li = document.createElement('li');
    li.className = 'slot';
    li.innerHTML = '<span>Photo coming soon</span>';
    grid.appendChild(li);
  }

  document.getElementById('lbClose').addEventListener('click', () => lb.close());
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
})();

// Mobile menu
(function () {
  const btn = document.getElementById('menuBtn');
  const list = document.getElementById('navList');
  btn.addEventListener('click', () => {
    const open = list.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    btn.textContent = open ? 'Close' : 'Menu';
  });
  list.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    list.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = 'Menu';
  }));
})();

// Contact form opens the visitor's email app with the message filled in
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target;
  const subject = encodeURIComponent('Project inquiry from ' + f.name.value);
  const body = encodeURIComponent(f.message.value + '\n\n' + f.name.value + '\n' + f.email.value);
  window.location.href = 'mailto:hello@marco.example?subject=' + subject + '&body=' + body;
});
