const API_ROOT = 'https://api.tcgdex.net/v2/de';
const SETS = [
  { id: 'sv10.5b', kind: 'black', label: 'Schwarze Blitze' },
  { id: 'sv10.5w', kind: 'white', label: 'Weiße Flammen' },
];
const EXTRA_CARDS = [
  {id:'extra-svp-208',apiId:'svp-208',code:'SVP 208',name:'Victini',kind:'promo',group:'Schwarze Blitze',note:'Unova Victini Illustration Collection',images:['https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/tpci/SVP/SVP_208_R_DE_LG.png','https://assets.tcgdex.net/de/sv/svp/208/high.webp','https://assets.tcgdex.net/en/sv/svp/208/high.webp']},
  {id:'extra-svp-209',apiId:'svp-209',code:'SVP 209',name:'Voltolos',kind:'promo',group:'Schwarze Blitze',note:'Schwarze Blitze Elite-Trainer-Box',images:['https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/tpci/SVP/SVP_209_R_DE_LG.png','https://assets.tcgdex.net/de/sv/svp/209/high.webp','https://assets.tcgdex.net/en/sv/svp/209/high.webp']},
  {id:'extra-svp-210',apiId:'svp-210',code:'SVP 210',name:'Boreos',kind:'promo',group:'Weiße Flammen',note:'Weiße Flammen Elite-Trainer-Box',images:['https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/tpci/SVP/SVP_210_R_DE_LG.png','https://www.lotticards.de/media/image/product/214651/lg/boreos-svp-de-210-promo.jpg','https://assets.tcgdex.net/de/sv/svp/210/high.webp']},
  {id:'extra-svp-211',apiId:'svp-211',code:'SVP 211',name:'Morbitesse',kind:'promo',group:'Weiße Flammen',note:'Weiße Flammen Tech-Sticker-Kollektion',images:['https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/tpci/SVP/SVP_211_R_DE_LG.png','https://assets.tcgdex.net/de/sv/svp/211/high.webp','https://assets.tcgdex.net/en/sv/svp/211/high.webp']},
  {id:'extra-svp-212',apiId:'svp-212',code:'SVP 212',name:'Zytomega',kind:'promo',group:'Schwarze Blitze',note:'Schwarze Blitze Tech-Sticker-Kollektion',images:['https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/tpci/SVP/SVP_212_R_DE_LG.png','https://assets.tcgdex.net/de/sv/svp/212/high.webp','https://assets.tcgdex.net/en/sv/svp/212/high.webp']},
  {id:'extra-sve-017',code:'SVE 017',name:'Basis-Pflanzen-Energie',kind:'energy',group:'Beide Editionen',images:['https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/tpci/SVE/SVE_017_R_DE_LG.png','https://assets.tcgdex.net/de/sv/sve/017/high.webp','https://assets.tcgdex.net/en/sv/sve/017/high.webp']},
  {id:'extra-sve-018',code:'SVE 018',name:'Basis-Feuer-Energie',kind:'energy',group:'Beide Editionen',images:['https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/tpci/SVE/SVE_018_R_DE_LG.png','https://assets.tcgdex.net/de/sv/sve/018/high.webp','https://assets.tcgdex.net/en/sv/sve/018/high.webp']},
  {id:'extra-sve-019',code:'SVE 019',name:'Basis-Wasser-Energie',kind:'energy',group:'Beide Editionen',images:['https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/tpci/SVE/SVE_019_R_DE_LG.png','https://www.deckshop.de/cdn/shop/files/PXL_20250830_183746320_ae3cb080-9094-4674-8aa0-0a7743e21bb2.jpg?v=1757608074&width=1946','https://assets.tcgdex.net/de/sv/sve/019/high.webp']},
  {id:'extra-sve-020',code:'SVE 020',name:'Basis-Elektro-Energie',kind:'energy',group:'Beide Editionen',images:['https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/tpci/SVE/SVE_020_R_DE_LG.png','https://assets.tcgdex.net/de/sv/sve/020/high.webp','https://assets.tcgdex.net/en/sv/sve/020/high.webp']},
  {id:'extra-sve-021',code:'SVE 021',name:'Basis-Psycho-Energie',kind:'energy',group:'Beide Editionen',images:['https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/tpci/SVE/SVE_021_R_DE_LG.png','https://assets.tcgdex.net/de/sv/sve/021/high.webp','https://assets.tcgdex.net/en/sv/sve/021/high.webp']},
  {id:'extra-sve-022',code:'SVE 022',name:'Basis-Kampf-Energie',kind:'energy',group:'Beide Editionen',images:['https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/tpci/SVE/SVE_022_R_DE_LG.png','https://assets.tcgdex.net/de/sv/sve/022/high.webp','https://assets.tcgdex.net/en/sv/sve/022/high.webp']},
  {id:'extra-sve-023',code:'SVE 023',name:'Basis-Finsternis-Energie',kind:'energy',group:'Beide Editionen',images:['https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/tpci/SVE/SVE_023_R_DE_LG.png','https://assets.tcgdex.net/de/sv/sve/023/high.webp','https://assets.tcgdex.net/en/sv/sve/023/high.webp']},
  {id:'extra-sve-024',code:'SVE 024',name:'Basis-Metall-Energie',kind:'energy',group:'Beide Editionen',images:['https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/tpci/SVE/SVE_024_R_DE_LG.png','https://assets.tcgdex.net/de/sv/sve/024/high.webp','https://assets.tcgdex.net/en/sv/sve/024/high.webp']}
];

const CARD_VARIANTS = [
  {id:'variant-blk-001-poster',setKind:'black',localId:'001',name:'Serpifeu',label:'Poster Collection – Spezial-Holo',origin:'Unova Poster Collection',note:'Gleiche Kartennummer, besondere Holo-Ausführung aus dem deutschen Produkt.'},
  {id:'variant-wht-011-poster',setKind:'white',localId:'011',name:'Floink',label:'Poster Collection – Spezial-Holo',origin:'Unova Poster Collection',note:'Gleiche Kartennummer, besondere Holo-Ausführung aus dem deutschen Produkt.'},
  {id:'variant-wht-021-poster',setKind:'white',localId:'021',name:'Ottaro',label:'Poster Collection – Spezial-Holo',origin:'Unova Poster Collection',note:'Gleiche Kartennummer, besondere Holo-Ausführung aus dem deutschen Produkt.'},
  {id:'variant-blk-012-pokeball',setKind:'black',localId:'012',name:'Victini',label:'Premium-Pokéball-Variante',origin:'Unova Victini Illustration Collection',note:'Produkt-exklusive Pokéball-Parallelkarte mit derselben Setnummer.'}
];

const STORAGE_KEY = 'pokemon-black-white-owned-v1';
const DETAIL_CACHE_KEY = 'pokemon-black-white-detail-cache-v1';
const ALBUM_CACHE_KEY = 'pokemon-black-white-album-cache-v7';
const DB_NAME = 'pokemon-kartenalbum-v7';
const DB_VERSION = 1;
const OWNED_STORE = 'owned';
const OFFLINE_CACHE = 'pokemon-kartenalbum-content-v7';
const REQUEST_TIMEOUT_MS = 15000;

const state = {
  cards: [],
  sets: [],
  owned: new Set(readJSON(STORAGE_KEY, [])),
  db: null,
  detailCache: readJSON(DETAIL_CACHE_KEY, {}),
  setFilter: 'all',
  ownershipFilter: 'all',
  search: '',
  activeCardId: null,
};

const ids = [
  'statusPanel','statusText','gallery','emptyGallery','checklist','emptyChecklist','extrasCards','extrasSummary','findCards','emptyFind','searchInput','clearSearch',
  'ownedCount','totalCount','blackProgress','whiteProgress','progressRing','progressPercent','progressMessage','progressHero',
  'allTabCount','ownedTabCount','missingTabCount','resultCount','cardDialog','closeDialog','detailImage','detailImageWrap',
  'detailSet','detailName','detailNumber','detailMeta','detailDescription','detailVariants','detailOwnedButton','detailOwnedText','statsButton',
  'statsDialog','closeStats','statsContent','exportButton','importInput','setsShortcut','offlineButton','offlineStatus','storageStatus'
];
const el = Object.fromEntries(ids.map(id => [id, document.getElementById(id)]));



function openDB() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) { resolve(null); return; }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(OWNED_STORE)) db.createObjectStore(OWNED_STORE, { keyPath: 'id' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function idbGetOwned(db) {
  return new Promise((resolve, reject) => {
    if (!db) { resolve(null); return; }
    const tx = db.transaction(OWNED_STORE, 'readonly');
    const request = tx.objectStore(OWNED_STORE).getAll();
    request.onsuccess = () => resolve(request.result.map(item => item.id));
    request.onerror = () => reject(request.error);
  });
}

function idbSetOwned(db, id, owned) {
  return new Promise((resolve, reject) => {
    if (!db) { resolve(); return; }
    const tx = db.transaction(OWNED_STORE, 'readwrite');
    const store = tx.objectStore(OWNED_STORE);
    if (owned) store.put({ id, savedAt: Date.now() }); else store.delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

function idbReplaceOwned(db, ids) {
  return new Promise((resolve, reject) => {
    if (!db) { resolve(); return; }
    const tx = db.transaction(OWNED_STORE, 'readwrite');
    const store = tx.objectStore(OWNED_STORE);
    store.clear();
    ids.forEach(id => store.put({ id, savedAt: Date.now() }));
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function initPersistentStorage() {
  try {
    state.db = await openDB();
    const fromDB = await idbGetOwned(state.db);
    if (Array.isArray(fromDB) && fromDB.length) {
      state.owned = new Set(fromDB);
    } else if (state.owned.size && state.db) {
      await idbReplaceOwned(state.db, [...state.owned]);
    }
    if (navigator.storage?.persist) {
      try { await navigator.storage.persist(); } catch {}
    }
    if (el.storageStatus) el.storageStatus.textContent = state.db ? 'Sammlungsstand wird dauerhaft auf diesem Gerät gespeichert.' : 'Sammlungsstand wird lokal gespeichert (Browser-Fallback).';
  } catch (error) {
    console.warn('IndexedDB nicht verfügbar:', error);
    if (el.storageStatus) el.storageStatus.textContent = 'Sammlungsstand wird lokal gespeichert (Browser-Fallback).';
  }
}

function readJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function writeJSON(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch (error) { console.warn('Lokaler Speicher nicht verfügbar:', error); }
}
async function writeOwned(changedId = null, owned = null) {
  writeJSON(STORAGE_KEY, [...state.owned]);
  try {
    if (changedId !== null) await idbSetOwned(state.db, changedId, owned);
    else await idbReplaceOwned(state.db, [...state.owned]);
  } catch (error) { console.warn('Besitzstand konnte nicht in IndexedDB geschrieben werden:', error); }
}
function normalized(text = '') { return String(text).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss').toLowerCase(); }
function setLabel(kind) { return kind === 'black' ? 'Schwarze Blitze' : 'Weiße Flammen'; }
function imageUrl(base, quality = 'low') {
  if (!base) return '';
  if (/\.(webp|png|jpe?g)$/i.test(base)) return base;
  return `${base}/${quality}.webp`;
}

function imageFallbackAttr(urls) { return attr(JSON.stringify((urls || []).filter(Boolean))); }
function applyImageFallback(img) {
  let urls=[];
  try { urls=JSON.parse(img.dataset.sources || '[]'); } catch {}
  let index=Number(img.dataset.sourceIndex || 0)+1;
  while(index < urls.length && !urls[index]) index++;
  if(index < urls.length) { img.dataset.sourceIndex=String(index); img.src=urls[index]; return; }
  img.onerror=null; img.closest('.extra-image-wrap,.variant-image-wrap')?.classList.add('image-missing');
}
function variantKey(card) { return `${card.setKind}:${localNumber(card)}`; }
function variantsForCard(card) { return CARD_VARIANTS.filter(v => `${v.setKind}:${v.localId}` === variantKey(card)); }
function variantImageSources(variant, card) {
  const baseLow=imageUrl(card?.image,'low'), baseHigh=imageUrl(card?.image,'high');
  return [baseHigh,baseLow].filter(Boolean);
}

function localNumber(card) { return String(card.localId ?? card.number ?? '').padStart(3, '0'); }
function numberValue(card) {
  const n = parseInt(String(card.localId ?? card.number ?? '').replace(/\D/g, ''), 10);
  return Number.isFinite(n) ? n : 99999;
}
function escapeHTML(value = '') {
  return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
function attr(value = '') { return escapeHTML(value); }
function compareCards(a, b) {
  if (a.setKind !== b.setKind) return a.setKind === 'black' ? -1 : 1;
  return numberValue(a) - numberValue(b) || String(a.name).localeCompare(String(b.name), 'de');
}

async function apiGet(path) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(`${API_ROOT}${path}`, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
      cache: 'no-store',
    });
    if (!response.ok) throw new Error(`TCGdex antwortet mit HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') throw new Error('Die Online-Quelle antwortet gerade zu langsam.');
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

function normalizeSet(raw, expected) {
  const set = raw?.data ?? raw;
  if (!set || !Array.isArray(set.cards)) throw new Error(`${expected.label} enthält keine lesbare Kartenliste.`);
  const official = set.cardCount?.official ?? 86;
  return {
    ...set,
    id: expected.id,
    name: expected.label,
    setKind: expected.kind,
    cards: set.cards.map(card => ({
      ...card,
      setId: expected.id,
      setName: expected.label,
      setKind: expected.kind,
      setOfficialCount: official,
    })),
  };
}

function useAlbumData(payload) {
  if (!payload?.cards?.length) return false;
  state.cards = payload.cards.slice().sort(compareCards);
  state.sets = payload.sets || [];
  renderAll();
  return true;
}

function showLoading(message) {
  el.statusPanel.hidden = false;
  el.statusPanel.classList.remove('error');
  el.statusText.textContent = message;
  const loader = el.statusPanel.querySelector('.loader');
  if (loader) loader.hidden = false;
}
function showError(message) {
  el.statusPanel.hidden = false;
  el.statusPanel.classList.add('error');
  el.statusText.textContent = message;
  const loader = el.statusPanel.querySelector('.loader');
  if (loader) loader.hidden = true;
}

async function loadData() {
  const cached = readJSON(ALBUM_CACHE_KEY, null);
  const hadCache = useAlbumData(cached);
  if (hadCache) {
    el.statusPanel.hidden = true;
  } else {
    showLoading('Die beiden Editionen werden direkt geladen. Beim ersten Start kann das einen Moment dauern.');
  }

  try {
    const rawSets = await Promise.all(SETS.map(set => apiGet(`/sets/${encodeURIComponent(set.id)}`)));
    const fullSets = rawSets.map((raw, index) => normalizeSet(raw, SETS[index]));
    const cards = fullSets.flatMap(set => set.cards).sort(compareCards);
    if (!cards.length) throw new Error('Es wurden keine Karten geliefert.');

    state.sets = fullSets;
    state.cards = cards;
    writeJSON(ALBUM_CACHE_KEY, { savedAt: Date.now(), sets: fullSets, cards });
    el.statusPanel.hidden = true;
    renderAll();
  } catch (error) {
    console.error('Karten konnten nicht geladen werden:', error);
    if (!hadCache) {
      showError(`Karten konnten nicht geladen werden. ${error.message} Bitte die Seite einmal neu laden.`);
    }
  }
}

function baseFilteredCards() {
  const q = normalized(state.search.trim());
  return state.cards.filter(card => {
    if (state.setFilter !== 'all' && card.setKind !== state.setFilter) return false;
    if (!q) return true;
    const hay = normalized([
      card.name, card.localId, card.rarity, card.category, card.setName,
      ...(card.types || []), ...(card.stage ? [card.stage] : [])
    ].join(' '));
    return hay.includes(q);
  });
}
function filteredCards() {
  return baseFilteredCards().filter(card => {
    if (state.ownershipFilter === 'owned') return state.owned.has(card.id);
    if (state.ownershipFilter === 'missing') return !state.owned.has(card.id);
    return true;
  });
}
function ownershipCounts(cards = baseFilteredCards()) {
  const owned = cards.filter(card => state.owned.has(card.id)).length;
  return { all: cards.length, owned, missing: cards.length - owned };
}
function renderAll() { renderCounts(); renderGallery(); renderChecklist(); renderExtras(); renderFindCards(); renderStats(); }

function renderCounts() {
  const total = state.cards.length;
  const owned = state.cards.filter(card => state.owned.has(card.id)).length;
  const pct = total ? Math.round(owned / total * 100) : 0;
  el.ownedCount.textContent = owned;
  el.totalCount.textContent = total;
  el.progressPercent.textContent = `${pct}%`;
  el.progressRing.style.setProperty('--progress', `${pct * 3.6}deg`);
  el.progressMessage.textContent = pct === 100 ? 'Sammlung vollständig.' : pct >= 75 ? 'Fast geschafft.' : pct > 0 ? 'Die Sammlung wächst.' : 'Viel Spaß beim Sammeln!';

  for (const kind of ['black', 'white']) {
    const cards = state.cards.filter(card => card.setKind === kind);
    const have = cards.filter(card => state.owned.has(card.id)).length;
    el[kind === 'black' ? 'blackProgress' : 'whiteProgress'].textContent = `${have} / ${cards.length}`;
  }
  const counts = ownershipCounts();
  el.allTabCount.textContent = counts.all;
  el.ownedTabCount.textContent = counts.owned;
  el.missingTabCount.textContent = counts.missing;
}

function renderGallery() {
  const cards = filteredCards();
  el.emptyGallery.hidden = cards.length > 0;
  el.resultCount.textContent = cards.length ? `${cards.length} Karten` : '';
  el.gallery.innerHTML = cards.map(card => {
    const owned = state.owned.has(card.id);
    return `<article class="card-tile ${owned ? 'owned' : ''}">
      <button class="card-open" type="button" data-card-id="${attr(card.id)}" aria-label="${attr(card.name)} ansehen">
        <span class="card-image-shell"><img loading="lazy" decoding="async" src="${attr(imageUrl(card.image, 'low'))}" alt="${attr(card.name)}"></span>
        <span class="card-caption">
          <span class="card-title">${escapeHTML(card.name)}</span>
          <span class="card-meta"><span><i class="set-dot ${card.setKind}"></i>${escapeHTML(localNumber(card))}/${String(card.setOfficialCount || 86).padStart(3,'0')}</span><span>${escapeHTML(card.rarity || '')}</span></span>
        </span>
      </button>
      <button class="card-status" type="button" data-toggle-owned="${attr(card.id)}" aria-pressed="${owned}" aria-label="${owned ? 'Als fehlend markieren' : 'Als gesammelt markieren'}"><span class="mini-check"></span><span>${owned ? 'Da' : 'Fehlt'}</span></button>
    </article>`;
  }).join('');
}

function renderChecklist() {
  const cards = filteredCards();
  el.emptyChecklist.hidden = cards.length > 0;
  el.checklist.innerHTML = ['black', 'white'].map(kind => ({ kind, cards: cards.filter(card => card.setKind === kind) }))
    .filter(group => group.cards.length)
    .map(group => `<section class="check-group">
      <h3 class="check-group-title"><i class="set-dot ${group.kind}"></i>${setLabel(group.kind)}</h3>
      <div class="checklist">${group.cards.map(card => {
        const owned = state.owned.has(card.id);
        const denom = String(card.setOfficialCount || 86).padStart(3, '0');
        return `<button class="check-row ${owned ? 'owned' : ''}" type="button" data-check-id="${attr(card.id)}" aria-pressed="${owned}">
          <span class="check-box"></span><span class="check-number">${escapeHTML(localNumber(card))}/${denom}</span><span class="check-name">${escapeHTML(card.name)}</span><span class="check-rarity">${escapeHTML(card.rarity || '')}</span>
        </button>`;
      }).join('')}</div>
    </section>`).join('');
}

function toggleOwned(id, force) {
  const next = force ?? !state.owned.has(id);
  if (next) state.owned.add(id); else state.owned.delete(id);
  writeOwned(id, next);
  renderAll();
  if (state.activeCardId === id && el.cardDialog.open) updateDetailOwnedButton();
}

async function openCard(id) {
  const card = state.cards.find(item => item.id === id);
  if (!card) return;
  state.activeCardId = id;
  el.detailName.textContent = card.name;
  el.detailSet.textContent = setLabel(card.setKind);
  el.detailNumber.textContent = `${localNumber(card)}/${String(card.setOfficialCount || 86).padStart(3,'0')}`;
  el.detailImage.onerror=null; el.detailImage.removeAttribute('data-sources'); el.detailImage.src = imageUrl(card.image, 'high');
  el.detailImage.alt = card.name;
  el.detailImageWrap.classList.remove('zoomed');
  el.detailMeta.innerHTML = '<div class="meta-item"><span>Status</span><strong>Details werden geladen …</strong></div>';
  el.detailDescription.innerHTML = '';
  renderCardVariants(card);
  updateDetailOwnedButton();
  if (!el.cardDialog.open) el.cardDialog.showModal();

  try {
    let detail = state.detailCache[id];
    if (!detail) {
      const raw = await apiGet(`/cards/${encodeURIComponent(id)}`);
      detail = raw?.data ?? raw;
      state.detailCache[id] = detail;
      writeJSON(DETAIL_CACHE_KEY, state.detailCache);
    }
    if (state.activeCardId === id) renderCardDetail(detail);
  } catch (error) {
    console.warn('Kartendetails nicht verfügbar:', error);
    if (state.activeCardId === id) {
      el.detailMeta.innerHTML = '';
      el.detailDescription.innerHTML = '<p>Die ausführlichen Kartendaten konnten gerade nicht geladen werden. Bild und Sammlungsstatus funktionieren trotzdem.</p>';
    }
  }
}

function renderCardDetail(detail) {
  const meta = [
    ['Seltenheit', detail.rarity], ['Kategorie', detail.category], ['KP', detail.hp],
    ['Typ', (detail.types || []).join(', ')], ['Stufe', detail.stage], ['Illustration', detail.illustrator]
  ].filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== '');
  el.detailMeta.innerHTML = meta.map(([label, value]) => `<div class="meta-item"><span>${escapeHTML(label)}</span><strong>${escapeHTML(value)}</strong></div>`).join('');

  const parts = [];
  if (detail.description) parts.push(`<h3>Beschreibung</h3><p>${escapeHTML(detail.description)}</p>`);
  if (detail.abilities?.length) {
    parts.push('<h3>Fähigkeiten</h3>');
    for (const ability of detail.abilities) parts.push(`<div class="attack"><div class="attack-head"><span>${escapeHTML(ability.name || 'Fähigkeit')}</span><span>${escapeHTML(ability.type || '')}</span></div><div class="attack-text">${escapeHTML(ability.effect || '')}</div></div>`);
  }
  if (detail.attacks?.length) {
    parts.push('<h3>Attacken</h3>');
    for (const attack of detail.attacks) parts.push(`<div class="attack"><div class="attack-head"><span>${escapeHTML(attack.name || 'Attacke')}</span><span>${escapeHTML(attack.damage ?? '')}</span></div><div class="attack-text">${escapeHTML(attack.effect || '')}</div></div>`);
  }
  if (detail.effect) parts.push(`<h3>Effekt</h3><p>${escapeHTML(detail.effect)}</p>`);
  el.detailDescription.innerHTML = parts.join('') || '<p>Für diese Karte liegen keine weiteren Beschreibungstexte vor.</p>';
}

function renderCardVariants(card) {
  if(!el.detailVariants)return; const variants=variantsForCard(card); if(!variants.length){el.detailVariants.innerHTML='';return;}
  el.detailVariants.innerHTML=`<details class="variant-details"><summary>Weitere deutsche Varianten <span>${variants.length}</span></summary><div class="variant-list">${variants.map(v=>{const have=state.owned.has(v.id),sources=variantImageSources(v,card),q=encodeURIComponent(`Pokémon ${v.name} ${v.localId}/086 ${v.label} deutsch`);return `<article class="variant-card"><div class="variant-image-wrap"><img src="${attr(sources[0]||'')}" data-sources='${imageFallbackAttr(sources)}' data-source-index="0" onerror="applyImageFallback(this)" alt="${attr(v.name+' '+v.label)}" loading="lazy"></div><div class="variant-copy"><strong>${escapeHTML(v.label)}</strong><span>${escapeHTML(v.origin)}</span><small>${escapeHTML(v.note)}</small><a href="https://www.ebay.de/sch/i.html?_nkw=${q}" target="_blank" rel="noopener">Angebote suchen</a></div><button type="button" class="variant-own ${have?'is-owned':''}" data-variant-owned="${attr(v.id)}">${have?'Da ✓':'Fehlt'}</button></article>`}).join('')}</div></details>`;
} 
function updateDetailOwnedButton() {
  const owned = state.owned.has(state.activeCardId);
  el.detailOwnedButton.setAttribute('aria-pressed', String(owned));
  el.detailOwnedText.textContent = owned ? 'Gesammelt' : 'Fehlt';
}



function extraImageSources(extra) { return (extra.images || []).filter(Boolean); }
async function openExtra(id) {
  const extra=EXTRA_CARDS.find(x=>x.id===id); if(!extra)return;
  state.activeCardId=id;
  el.detailName.textContent=extra.name;
  el.detailSet.textContent=extra.kind==='promo' ? 'Deutsche Promo' : 'Holo-Basisenergie';
  el.detailNumber.textContent=extra.code;
  const sources=extraImageSources(extra);
  el.detailImage.dataset.sources=JSON.stringify(sources); el.detailImage.dataset.sourceIndex='0'; el.detailImage.onerror=()=>applyImageFallback(el.detailImage); el.detailImage.src=sources[0]||''; el.detailImage.alt=extra.name;
  el.detailImageWrap.classList.remove('zoomed');
  el.detailMeta.innerHTML=`<div class="meta-item"><span>Herkunft</span><strong>${escapeHTML(extra.note||extra.group)}</strong></div><div class="meta-item"><span>Kennung</span><strong>${escapeHTML(extra.code)}</strong></div>`;
  el.detailDescription.innerHTML='<p>Kartendetails werden geladen …</p>';
  el.detailVariants.innerHTML=''; updateDetailOwnedButton(); if(!el.cardDialog.open)el.cardDialog.showModal();
  if(extra.apiId){
    try{let detail=state.detailCache[extra.apiId]; if(!detail){const raw=await apiGet(`/cards/${encodeURIComponent(extra.apiId)}`); detail=raw?.data??raw; state.detailCache[extra.apiId]=detail; writeJSON(DETAIL_CACHE_KEY,state.detailCache);} if(state.activeCardId===id)renderExtraDetail(extra,detail);}catch(e){if(state.activeCardId===id)el.detailDescription.innerHTML=`<p>${escapeHTML(extra.note||'Deutsche Zusatzkarte zu Schwarze Blitze / Weiße Flammen.')}</p>`;}
  } else el.detailDescription.innerHTML='<p>Spezielle Holo-Basisenergie aus den Produkten Schwarze Blitze & Weiße Flammen.</p>';
}
function renderExtraDetail(extra,detail){
  const meta=[['Seltenheit',detail.rarity],['Kategorie',detail.category],['KP',detail.hp],['Typ',(detail.types||[]).join(', ')],['Illustration',detail.illustrator]].filter(([,v])=>v!=null&&String(v).trim());
  meta.unshift(['Herkunft',extra.note||extra.group],['Kennung',extra.code]);
  el.detailMeta.innerHTML=meta.map(([l,v])=>`<div class="meta-item"><span>${escapeHTML(l)}</span><strong>${escapeHTML(v)}</strong></div>`).join('');
  const parts=[]; if(detail.description)parts.push(`<h3>Beschreibung</h3><p>${escapeHTML(detail.description)}</p>`); if(detail.abilities?.length){parts.push('<h3>Fähigkeiten</h3>');detail.abilities.forEach(a=>parts.push(`<div class="attack"><div class="attack-head"><span>${escapeHTML(a.name||'Fähigkeit')}</span></div><div class="attack-text">${escapeHTML(a.effect||'')}</div></div>`));} if(detail.attacks?.length){parts.push('<h3>Attacken</h3>');detail.attacks.forEach(a=>parts.push(`<div class="attack"><div class="attack-head"><span>${escapeHTML(a.name||'Attacke')}</span><span>${escapeHTML(a.damage??'')}</span></div><div class="attack-text">${escapeHTML(a.effect||'')}</div></div>`));}
  el.detailDescription.innerHTML=parts.join('')||`<p>${escapeHTML(extra.note||'Deutsche Zusatzkarte zu Schwarze Blitze / Weiße Flammen.')}</p>`;
}
function renderExtras() {
 if(!el.extrasCards)return; const owned=EXTRA_CARDS.filter(x=>state.owned.has(x.id)).length;
 el.extrasSummary.innerHTML=`<strong>${owned} von ${EXTRA_CARDS.length}</strong><span>deutsche Extras gesammelt</span>`;
 const groups=[['Promos – Schwarze Blitze',EXTRA_CARDS.filter(x=>x.kind==='promo'&&x.group==='Schwarze Blitze')],['Promos – Weiße Flammen',EXTRA_CARDS.filter(x=>x.kind==='promo'&&x.group==='Weiße Flammen')],['Holo-Basisenergien – beide Editionen',EXTRA_CARDS.filter(x=>x.kind==='energy')]];
 el.extrasCards.innerHTML=groups.map(([title,cards])=>`<section class="extra-group"><h3>${escapeHTML(title)}</h3><div class="extra-grid">${cards.map(x=>{const have=state.owned.has(x.id),q=encodeURIComponent(`Pokémon ${x.name} ${x.code} deutsch`),cm=encodeURIComponent(`${x.name} ${x.code}`),sources=extraImageSources(x);return `<article class="extra-card ${have?'owned':''}"><button class="extra-open" type="button" data-extra-open="${attr(x.id)}"><div class="extra-image-wrap"><img src="${attr(sources[0]||'')}" data-sources='${imageFallbackAttr(sources)}' data-source-index="0" alt="${attr(x.name)}" loading="lazy" onerror="applyImageFallback(this)"><span>${escapeHTML(x.code)}</span></div><div class="extra-meta"><strong>${escapeHTML(x.name)}</strong><b>${escapeHTML(x.code)}</b>${x.note?`<small>${escapeHTML(x.note)}</small>`:''}</div></button><button class="extra-own ${have?'is-owned':''}" data-extra-owned="${attr(x.id)}">${have?'Da ✓':'Fehlt'}</button><div class="extra-market"><a href="https://www.ebay.de/sch/i.html?_nkw=${q}" target="_blank" rel="noopener">eBay</a><a href="https://www.cardmarket.com/de/Pokemon/Products/Search?searchString=${cm}" target="_blank" rel="noopener">Cardmarket</a></div></article>`}).join('')}</div></section>`).join('');
}
function marketplaceQuery(card) {
  const edition = card.setKind === 'black' ? 'Schwarze Blitze' : 'Weiße Flammen';
  return `Pokémon ${card.name} ${localNumber(card)}/086 ${edition} deutsch`;
}
function ebayUrl(card) {
  return `https://www.ebay.de/sch/i.html?_nkw=${encodeURIComponent(marketplaceQuery(card))}`;
}
function cardmarketUrl(card) {
  return `https://www.cardmarket.com/de/Pokemon/Products/Search?searchString=${encodeURIComponent(`${card.name} ${localNumber(card)}`)}`;
}
function renderFindCards() {
  if (!el.findCards || !el.emptyFind) return;
  let cards = state.cards.filter(card => !state.owned.has(card.id));
  if (state.setFilter !== 'all') cards = cards.filter(card => card.setKind === state.setFilter);
  const q = normalized(state.search.trim());
  if (q) cards = cards.filter(card => normalized(`${card.name} ${localNumber(card)} ${setLabel(card.setKind)} ${card.rarity || ''}`).includes(q));
  cards.sort(compareCards);
  el.emptyFind.hidden = cards.length !== 0;
  el.findCards.innerHTML = cards.map(card => {
    const denom = card.setCardCount?.official || 86;
    return `<article class="find-card">
      <button class="find-preview" type="button" data-open-card="${attr(card.id)}" aria-label="${attr(card.name)} ansehen">
        <img src="${attr(imageUrl(card.image, 'low'))}" alt="${attr(card.name)}" loading="lazy">
      </button>
      <div class="find-info">
        <div class="find-set"><i class="set-dot ${card.setKind}"></i>${escapeHTML(setLabel(card.setKind))}</div>
        <strong>${escapeHTML(card.name)}</strong>
        <span>${escapeHTML(localNumber(card))}/${escapeHTML(denom)}</span>
        <div class="market-actions">
          <a class="market-button ebay" href="${attr(ebayUrl(card))}" target="_blank" rel="noopener noreferrer">eBay suchen</a>
          <a class="market-button cardmarket" href="${attr(cardmarketUrl(card))}" target="_blank" rel="noopener noreferrer">Cardmarket</a>
        </div>
      </div>
      <button class="found-button" type="button" data-toggle-owned="${attr(card.id)}">Jetzt da</button>
    </article>`;
  }).join('');
}

function renderStats() {
  if (!state.cards.length) { el.statsContent.innerHTML = ''; return; }
  const groups = [
    ['Gesamt', state.cards],
    ['Schwarze Blitze', state.cards.filter(card => card.setKind === 'black')],
    ['Weiße Flammen', state.cards.filter(card => card.setKind === 'white')],
  ];
  el.statsContent.innerHTML = groups.map(([label, cards]) => {
    const have = cards.filter(card => state.owned.has(card.id)).length;
    const pct = cards.length ? Math.round(have / cards.length * 100) : 0;
    return `<div class="stats-progress"><div class="stats-progress-top"><span>${escapeHTML(label)}</span><span>${have} / ${cards.length}</span></div><div class="progress-track"><span style="width:${pct}%"></span></div><div class="progress-note">${pct}% vollständig · ${cards.length - have} fehlen noch</div></div>`;
  }).join('');
}

function setActiveButtons(container, selector, value, attrName) {
  container.querySelectorAll(selector).forEach(button => button.classList.toggle('active', button.dataset[attrName] === value));
}

document.getElementById('setFilter').addEventListener('click', event => {
  const button = event.target.closest('button[data-set]');
  if (!button) return;
  state.setFilter = button.dataset.set;
  setActiveButtons(event.currentTarget, 'button[data-set]', state.setFilter, 'set');
  renderAll();
});
document.getElementById('ownershipFilter').addEventListener('click', event => {
  const button = event.target.closest('button[data-owned]');
  if (!button) return;
  state.ownershipFilter = button.dataset.owned;
  setActiveButtons(event.currentTarget, 'button[data-owned]', state.ownershipFilter, 'owned');
  renderAll();
});
el.searchInput.addEventListener('input', () => { state.search = el.searchInput.value; renderAll(); });
el.clearSearch.addEventListener('click', () => { el.searchInput.value = ''; state.search = ''; el.searchInput.focus(); renderAll(); });
el.gallery.addEventListener('click', event => {
  const toggle = event.target.closest('[data-toggle-owned]');
  if (toggle) { toggleOwned(toggle.dataset.toggleOwned); return; }
  const open = event.target.closest('[data-card-id]');
  if (open) openCard(open.dataset.cardId);
});

if (el.extrasCards) el.extrasCards.addEventListener('click', event => { const b=event.target.closest('[data-extra-owned]'); if(b) toggleOwned(b.dataset.extraOwned); });
if (el.findCards) el.findCards.addEventListener('click', event => {
  const toggle = event.target.closest('[data-toggle-owned]');
  if (toggle) { toggleOwned(toggle.dataset.toggleOwned); return; }
  const open = event.target.closest('[data-open-card]');
  if (open) openCard(open.dataset.openCard);
});

el.checklist.addEventListener('click', event => {
  const button = event.target.closest('[data-check-id]');
  if (button) toggleOwned(button.dataset.checkId);
});
el.detailOwnedButton.addEventListener('click', () => state.activeCardId && toggleOwned(state.activeCardId));
el.closeDialog.addEventListener('click', () => el.cardDialog.close());
el.cardDialog.addEventListener('close', () => { state.activeCardId = null; el.detailImageWrap.classList.remove('zoomed'); });
let lastTap = 0;
el.detailImageWrap.addEventListener('click', () => {
  const now = Date.now();
  if (now - lastTap < 340) el.detailImageWrap.classList.toggle('zoomed');
  lastTap = now;
});
for (const trigger of [el.statsButton, el.progressHero]) trigger.addEventListener('click', () => { renderStats(); el.statsDialog.showModal(); });
el.closeStats.addEventListener('click', () => el.statsDialog.close());
el.setsShortcut.addEventListener('click', () => document.getElementById('setFilter').scrollIntoView({ behavior: 'smooth', block: 'center' }));
document.querySelector('.bottom-nav').addEventListener('click', event => {
  const button = event.target.closest('button[data-view]');
  if (!button) return;
  document.querySelectorAll('.view').forEach(view => view.classList.toggle('active', view.id === button.dataset.view));
  document.querySelectorAll('.bottom-nav button').forEach(item => item.classList.toggle('active', item === button));
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

el.exportButton.addEventListener('click', () => {
  const data = { app: 'pokemon-kartenalbum', version: 1, exportedAt: new Date().toISOString(), owned: [...state.owned] };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `pokemon-sammlung-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
el.importInput.addEventListener('change', async () => {
  const file = el.importInput.files?.[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    if (!Array.isArray(data.owned)) throw new Error('Ungültige Datei');
    state.owned = new Set(data.owned);
    await writeOwned();
    renderAll();
    el.statsDialog.close();
  } catch {
    alert('Diese Sicherungsdatei konnte nicht gelesen werden.');
  } finally {
    el.importInput.value = '';
  }
});



async function cacheResponse(cache, url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok && response.type !== 'opaque') throw new Error(`HTTP ${response.status}`);
    await cache.put(url, response.clone());
    return true;
  } catch (error) {
    console.warn('Offline-Download fehlgeschlagen:', url, error);
    return false;
  }
}

async function runPool(items, worker, concurrency = 6) {
  let index = 0;
  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (index < items.length) {
      const current = items[index++];
      await worker(current);
    }
  });
  await Promise.all(runners);
}

async function prepareOfflineAlbum() {
  if (!('caches' in window)) {
    el.offlineStatus.textContent = 'Offline-Speicherung wird in diesem Browser nicht unterstützt.';
    return;
  }
  if (!state.cards.length) {
    el.offlineStatus.textContent = 'Bitte warte zuerst, bis die Karten geladen sind.';
    return;
  }
  el.offlineButton.disabled = true;
  const cache = await caches.open(OFFLINE_CACHE);
  const tasks = [];
  SETS.forEach(set => tasks.push({ type: 'api', url: `${API_ROOT}/sets/${encodeURIComponent(set.id)}` }));
  state.cards.forEach(card => {
    tasks.push({ type: 'api', url: `${API_ROOT}/cards/${encodeURIComponent(card.id)}` });
    const low = imageUrl(card.image, 'low');
    if (low) tasks.push({ type: 'image', url: low });
  });
  EXTRA_CARDS.forEach(extra => extraImageSources(extra).slice(0,2).forEach(url => tasks.push({ type: 'image', url })));
  let done = 0;
  let failed = 0;
  const update = () => {
    const pct = Math.round(done / tasks.length * 100);
    el.offlineStatus.textContent = `Offline-Album wird gespeichert: ${pct}% (${done} von ${tasks.length})`;
  };
  update();
  await runPool(tasks, async task => {
    const ok = await cacheResponse(cache, task.url, task.type === 'image' ? { mode: 'no-cors' } : { headers: { Accept: 'application/json' } });
    if (!ok) failed++;
    done++;
    update();
  }, 6);
  localStorage.setItem('pokemon-offline-ready-v7', JSON.stringify({ savedAt: Date.now(), failed, total: tasks.length }));
  el.offlineStatus.textContent = failed ? `Offline-Album gespeichert. ${failed} Dateien konnten nicht geladen werden; online werden sie später ergänzt.` : 'Offline bereit: Karten, Bilder und Beschreibungen sind auf diesem Gerät gespeichert.';
  el.offlineButton.textContent = 'Offline-Album aktualisieren';
  el.offlineButton.disabled = false;
}

function updateOfflineStatus() {
  if (!el.offlineStatus) return;
  const ready = readJSON('pokemon-offline-ready-v7', null);
  if (ready) {
    const date = new Date(ready.savedAt);
    el.offlineStatus.textContent = `Offline-Album vorhanden · zuletzt gespeichert ${date.toLocaleDateString('de-DE')}.`;
    el.offlineButton.textContent = 'Offline-Album aktualisieren';
  } else {
    el.offlineStatus.textContent = 'Noch nicht vollständig offline gespeichert. Das Album funktioniert online bereits normal.';
  }
}

el.offlineButton?.addEventListener('click', prepareOfflineAlbum);

if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('./sw.js').catch(error => console.warn('Service Worker:', error));
}

(async () => {
  await initPersistentStorage();
  updateOfflineStatus();
  await loadData();
  renderAll();
})();
