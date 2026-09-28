"use client";

import { useMemo, useState } from "react";
import { categories, products, whatsapp } from "../data/menu";

const money = (n) => `Bs ${Number(n).toFixed(0)}`;

function londonStatus() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  const serviceDay = [4, 5, 6].includes(day);
  const open = serviceDay && hour >= 18.5;
  return { serviceDay, open };
}

export default function Home() {
  const [active, setActive] = useState("desayunos");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const activeCategory = categories.find((c) => c.id === active);
  const london = londonStatus();

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const categoryMatch = p.category === active || (p.alsoIn || []).includes(active);
      const searchMatch = !q || `${p.name} ${p.description || ""}`.toLowerCase().includes(q);
      return categoryMatch && searchMatch;
    });
  }, [active, query]);

  const canOrder = (product) => product.category !== "london-meat" || london.open;
  const add = (product, variant = null) => {
    const price = variant?.price ?? product.price;
    if (price == null || !canOrder(product)) return;
    const key = `${product.id}:${variant?.name || "base"}`;
    setCart((current) => {
      const found = current.find((item) => item.key === key);
      if (found) return current.map((item) => item.key === key ? { ...item, qty: item.qty + 1 } : item);
      return [...current, { key, product, variant, price, qty: 1 }];
    });
  };
  const changeQty = (key, delta) => setCart((current) => current.map((item) => item.key === key ? { ...item, qty: item.qty + delta } : item).filter((item) => item.qty > 0));
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const units = cart.reduce((sum, item) => sum + item.qty, 0);

  function sendWhatsApp() {
    if (!cart.length) return;
    const lines = cart.map((item) => `${item.qty} × ${item.product.name}${item.variant ? ` (${item.variant.name})` : ""} — ${money(item.price * item.qty)}`);
    const text = `Hola, quiero realizar este pedido:\n\n${lines.join("\n")}\n\nTOTAL: ${money(total)}`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  }

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="London Coffee">
          <img src="/london-logo.png" alt="London Coffee" />
        </a>
        <div className="service-status"><span /> Pedido por WhatsApp</div>
      </header>

      <section className="hero" id="top">
        <div className="hero-rule"><span /> NUESTRA CARTA <span /></div>
        <h1>Comer bien.<br /><em>Disfrutar mejor.</em></h1>
        <p>Una selección para empezar el día, acompañar el café y compartir.</p>
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar en la carta" aria-label="Buscar en la carta" />
          {query && <button className="clear-search" onClick={() => setQuery("")} aria-label="Limpiar búsqueda">×</button>}
        </div>
      </section>

      <div className="content-grid">
        <aside className="category-panel">
          <span className="panel-label">CARTA</span>
          <nav className="categories">
            {categories.map((category) => (
              <button key={category.id} className={active === category.id ? "active" : ""} onClick={() => { setActive(category.id); setQuery(""); }}>
                <span>{category.name}</span><small>{products.filter((p) => p.category === category.id || (p.alsoIn || []).includes(category.id)).length}</small>
              </button>
            ))}
          </nav>
        </aside>

        <section className="menu-content">
          <div className="section-head">
            <div><span className="kicker">SELECCIÓN</span><h2>{activeCategory?.name}</h2></div>
            <span className="result-count">{visible.length} opciones</span>
          </div>

          {active === "london-meat" && (
            <div className={`service-banner ${london.open ? "is-open" : ""}`}>
              <div><span className="live-dot" /><strong>{london.open ? "Disponible ahora" : "Servicio nocturno"}</strong></div>
              <span>Jueves · viernes · sábado · desde 18:30</span>
            </div>
          )}

          <div className="products">
            {visible.length === 0 ? <div className="empty-state"><strong>No encontramos ese producto.</strong><span>Prueba con otro término.</span></div> : visible.map((product, index) => {
              const orderable = canOrder(product) && product.price != null;
              return <article className={`product-card ${!orderable ? "is-disabled" : ""}`} key={product.id}>
                <div className="product-index">{String(index + 1).padStart(2, "0")}</div>
                <div className="product-info"><h3>{product.name}</h3>{product.description && <p>{product.description}</p>}{!orderable && product.category === "london-meat" && <small className="availability-note">Disponible desde las 18:30</small>}{!orderable && product.price == null && <small className="availability-note">Precio por confirmar</small>}</div>
                <div className="product-action">
                  {product.variants ? <button className="select-btn" onClick={() => setSelected(product)} disabled={!canOrder(product)}>Elegir <span>+</span></button> : product.price != null ? <><strong className="price">{money(product.price)}</strong><button className="add-btn" onClick={() => add(product)} disabled={!orderable} aria-label={`Agregar ${product.name}`}>+</button></> : <span className="pending">Consultar</span>}
                </div>
              </article>;
            })}
          </div>
        </section>
      </div>

      {cart.length > 0 && <button className="cart-bar" onClick={() => setCartOpen(true)}><span><b>{units}</b> {units === 1 ? "producto" : "productos"}</span><strong>{money(total)} <i>→</i></strong></button>}

      {cartOpen && <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && setCartOpen(false)}><section className="sheet" role="dialog" aria-modal="true" aria-label="Tu pedido"><div className="sheet-head"><div><span className="kicker">RESUMEN</span><h2>Tu pedido</h2></div><button onClick={() => setCartOpen(false)} aria-label="Cerrar">×</button></div><div className="cart-list">{cart.map((item) => <div className="cart-row" key={item.key}><div className="cart-name"><strong>{item.product.name}</strong>{item.variant && <small>{item.variant.name}</small>}</div><div className="qty-control"><button onClick={() => changeQty(item.key, -1)}>−</button><span>{item.qty}</span><button onClick={() => changeQty(item.key, 1)}>+</button></div><strong className="line-total">{money(item.price * item.qty)}</strong></div>)}</div><div className="sheet-total"><span>Total</span><strong>{money(total)}</strong></div><button className="order-btn" onClick={sendWhatsApp}>ENVIAR PEDIDO <span>POR WHATSAPP ↗</span></button><small className="order-note">Se abrirá WhatsApp para confirmar con London Coffee.</small></section></div>}

      {selected && <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && setSelected(null)}><section className="sheet variant-sheet" role="dialog" aria-modal="true" aria-label={selected.name}><div className="sheet-head"><div><span className="kicker">ELIGE UNA OPCIÓN</span><h2>{selected.name}</h2></div><button onClick={() => setSelected(null)} aria-label="Cerrar">×</button></div>{selected.description && <p className="modal-description">{selected.description}</p>}<div className="variants">{selected.variants.map((variant) => <button key={variant.name} onClick={() => { add(selected, variant); setSelected(null); }}><span>{variant.name}</span><strong>{money(variant.price)}</strong><i>+</i></button>)}</div></section></div>}
    </main>
  );
}
