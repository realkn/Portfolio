
const galleryEl = document.getElementById('gallery');
const catSelect = document.getElementById('categorySelect');
const searchInput = document.getElementById('searchInput');
const yearEl = document.getElementById('year');
const menuBtn = document.getElementById('menuBtn');
const navList = document.getElementById('navList');

yearEl.textContent = new Date().getFullYear();
menuBtn.addEventListener('click', ()=> navList.classList.toggle('open'));

let items = [];

// Load data.json
fetch('data.json').then(r=>r.json()).then(data=>{
  items = data.items;
  renderGallery(items);
});

function renderGallery(list){
  galleryEl.innerHTML = '';
  if(!list.length){
    galleryEl.innerHTML = '<p class="muted">No items to show.</p>';
    return;
  }
  list.forEach((it, idx)=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.tabIndex = 0;
    card.innerHTML = `
      <img loading="lazy" src="${it.thumb}" alt="${escapeHtml(it.title)}" />
      <div class="meta">
        <h3>${escapeHtml(it.title)}</h3>
        <p>${escapeHtml(it.category)} · ${escapeHtml(it.year || '')}</p>
      </div>
    `;
    card.addEventListener('click', ()=> openLightbox(idx));
    card.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') openLightbox(idx) });
    galleryEl.appendChild(card);
  });
}

// Filters
catSelect.addEventListener('change', applyFilters);
searchInput.addEventListener('input', applyFilters);

function applyFilters(){
  const cat = catSelect.value;
  const q = searchInput.value.trim().toLowerCase();
  const filtered = items.filter(it=>{
    const okCat = cat === 'all' ? true : it.category === cat;
    const okQ = !q || (it.title + ' ' + (it.tags||'')).toLowerCase().includes(q);
    return okCat && okQ;
  });
  renderGallery(filtered);
}

// Lightbox
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbTitle = document.getElementById('lbTitle');
const lbDesc = document.getElementById('lbDesc');
const lbTags = document.getElementById('lbTags');
const closeLb = document.getElementById('closeLb');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

function openLightbox(idx){
  currentIndex = idx;
  showItem(items[idx]);
  lb.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function closeLightbox(){
  lb.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}
closeLb.addEventListener('click', closeLightbox);
lb.addEventListener('click', (e)=>{ if(e.target === lb) closeLightbox() });
prevBtn.addEventListener('click', ()=>{ currentIndex = (currentIndex -1 + items.length)%items.length; showItem(items[currentIndex]); });
nextBtn.addEventListener('click', ()=>{ currentIndex = (currentIndex+1)%items.length; showItem(items[currentIndex]); });

function showItem(it){
  lbImg.src = it.image || it.thumb;
  lbImg.alt = it.title;
  lbTitle.textContent = it.title;
  lbDesc.textContent = it.description || '';
  lbTags.textContent = (it.tags || '').split(',').map(s=>s.trim()).filter(Boolean).join(' · ');
}

// small helper
function escapeHtml(str){ return String(str).replace(/[&<>"']/g, s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s])); }

// Keyboard nav
document.addEventListener('keydown', (e)=>{
  if(lb.getAttribute('aria-hidden') === 'false'){
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowLeft') prevBtn.click();
    if(e.key === 'ArrowRight') nextBtn.click();
  }
});
