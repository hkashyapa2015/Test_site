/* Shared logic: storage, cart, totals, header/footer, pickup slots */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const inr = n => "₹" + Math.round(n).toLocaleString("en-IN");
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const store = {
  get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  del(k) { try { localStorage.removeItem(k); } catch {} }
};

/* ---------- Cart ---------- */
const getCart = () => store.get("cc_cart", []);
const saveCart = c => { store.set("cc_cart", c); updateBadge(); };
const cartCount = () => getCart().reduce((n, l) => n + l.qty, 0);
const findItem = id => ITEMS.find(i => i.id === id);

function addToCart(line) {
  const cart = getCart();
  const key = [line.id, line.variant || "", (line.addons || []).slice().sort().join("+"), line.message || ""].join("|");
  const existing = cart.find(l => l.key === key);
  if (existing) existing.qty += line.qty;
  else cart.push({ ...line, key });
  saveCart(cart);
  toast(`Added ${line.name} to cart`);
}

function changeQty(key, delta) {
  let cart = getCart();
  const l = cart.find(x => x.key === key);
  if (!l) return;
  l.qty += delta;
  if (l.qty <= 0) cart = cart.filter(x => x.key !== key);
  saveCart(cart);
}

function removeLine(key) { saveCart(getCart().filter(l => l.key !== key)); }

function applyCoupon(code, subtotal) {
  const c = COUPONS[(code || "").toUpperCase().trim()];
  if (!c) return { ok: false, msg: "Invalid coupon code", discount: 0 };
  if (subtotal < c.min) return { ok: false, msg: `Add items worth ${inr(c.min - subtotal)} more to use this coupon`, discount: 0 };
  let d = c.type === "pct" ? subtotal * c.value / 100 : c.value;
  if (c.max) d = Math.min(d, c.max);
  return { ok: true, msg: c.label, discount: Math.round(d) };
}

function totals(cart = getCart(), code = store.get("cc_coupon", "")) {
  const subtotal = cart.reduce((s, l) => s + l.unit * l.qty, 0);
  const cp = code && subtotal ? applyCoupon(code, subtotal) : { ok: false, discount: 0, msg: "" };
  const discount = cp.ok ? cp.discount : 0;
  const taxable = Math.max(subtotal - discount, 0);
  const gst = Math.round(taxable * GST_RATE);
  const packaging = subtotal ? PACKAGING_FEE : 0;
  return { subtotal, discount, gst, packaging, total: taxable + gst + packaging, coupon: cp.ok ? code.toUpperCase() : "", couponMsg: cp.msg, couponOk: cp.ok };
}

/* ---------- Outlet ---------- */
const getOutlet = () => OUTLETS.find(o => o.id === store.get("cc_outlet", "")) || null;
const setOutlet = id => { store.set("cc_outlet", id); };

/* ---------- Time helpers ---------- */
const toMin = hhmm => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };
const fmt12 = d => d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });
const fmtHHMM = hhmm => { const d = new Date(); d.setHours(0, toMin(hhmm), 0, 0); return fmt12(d); };

function isOpenNow(o) {
  const n = new Date(), m = n.getHours() * 60 + n.getMinutes();
  return m >= toMin(o.open) && m < toMin(o.close);
}

function pickupSlots(o) {
  const out = [];
  const now = new Date();
  const build = (offset, label) => {
    const base = new Date(now); base.setDate(base.getDate() + offset); base.setHours(0, 0, 0, 0);
    let start = toMin(o.open) + 30;
    if (offset === 0) {
      const nm = now.getHours() * 60 + now.getMinutes() + PREP_MINUTES + 10;
      start = Math.max(start, Math.ceil(nm / 15) * 15);
    }
    for (let m = start; m <= toMin(o.close) - 15; m += 15) {
      const d = new Date(base); d.setMinutes(m);
      out.push({ value: d.toISOString(), label: `${label}, ${fmt12(d)}` });
    }
  };
  build(0, "Today");
  build(1, "Tomorrow");
  return out;
}

/* ---------- UI chrome ---------- */
function updateBadge() { $$(".cart-badge").forEach(b => { const n = cartCount(); b.textContent = n; b.hidden = !n; }); }

function toast(msg) {
  let t = $("#toast");
  if (!t) { t = document.createElement("div"); t.id = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add("show");
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 1800);
}

function renderChrome(active) {
  const o = getOutlet();
  const link = (href, label, key) => `<a href="${href}" class="${active === key ? "active" : ""}">${label}</a>`;
  $("#site-header").innerHTML = `
    <div class="wrap bar">
      <a href="index.html" class="logo">${esc(BRAND.name)}</a>
      <nav class="nav">${link("index.html", "Home", "home")}${link("menu.html", "Menu", "menu")}${link("outlets.html", "Outlets", "outlets")}</nav>
      <a href="outlets.html" class="pill" title="Change pickup outlet">📍 ${o ? esc(o.name) : "Choose outlet"}</a>
      <a href="cart.html" class="cart-btn" aria-label="Cart">🛍️<span class="cart-badge" hidden>0</span></a>
    </div>`;
  $("#site-footer").innerHTML = `
    <div class="wrap foot">
      <div><strong>${esc(BRAND.name)}</strong><br><span class="muted">${esc(BRAND.tagline)}</span></div>
      <div class="muted">${esc(BRAND.phone)}<br>${esc(BRAND.email)}</div>
      <div class="muted small">Demo site with dummy content.<br>No real orders or payments are processed.</div>
    </div>`;
  updateBadge();
}
