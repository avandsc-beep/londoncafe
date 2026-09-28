 "use client";

import { useMemo, useState } from "react";
import { categories, products, whatsapp } from "../data/menu";

const money = (n) => `Bs ${Number(n).toFixed(0)}`;

function isLondonOpen() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes()/60;
  return [4,5,6].includes(day) && hour >= 18.5;
}

export default function Home() {
  const [active, setActive] = useState("desayunos");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);

  const visible = useMemo(() => products.filter(p => {
    const categoryMatch = p.category === active || (p.alsoIn || []).includes(active);
    const searchMatch = `${p.name} ${p.description}`.toLowerCase().includes(query.toLowerCase());
    return categoryMatch && searchMatch;
  }), [active, query]);

  function add(product, variant = null) {
    const price = variant?.price ?? product.price;
    if (price == null) return;
    setCart(c => [...c, { id: crypto.randomUUID(), product, variant, price, qty: 1 }]);
  }

  function remove(id) {
    setCart(c => c.filter(x => x.id !== id));
  }

  const total = cart.reduce((s, x) => s + x.price * x.qty, 0);
  const units = cart.reduce((s, x) => s + x.qty, 0);

  function sendWhatsApp() {
    if (!cart.length) return;
    const lines = cart.map(x => `${x.qty} × ${x.product.name}${x.variant ? ` (${x.variant.name})` : ""} — ${money(x.price*x.qty)}`);
    const text = `Hola, quiero realizar este pedido:%0A%0A${encodeURIComponent(lines.join("\n"))}%0A%0ATOTAL: ${encodeURIComponent(money(total))}`;
    window.open(`https://wa.me/${whatsapp}?text=${text}`, "_blank");
  }

  return (
    <main>
      <header className="hero">
        <div className="eyebrow">MENÚ DIGITAL</div>
        <h1>Cafetería</h1>
        <p>Algo rico está por venir.</p>
        <div className="search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar en el menú..." /></div>
      </header>

      <nav className="categories">
        {categories.map(c => (
          <button key={c.id} className={active===c.id ? "active":""} onClick={()=>setActive(c.id)}>
            {c.name}
          </button>
        ))}
      </nav>

      {active === "london-meat" && (
        <div className="schedule">
          <span>JUEVES · VIERNES · SÁBADO</span>
          <strong>Desde las 18:30</strong>
          {!isLondonOpen() && <small>La carta está visible, pero el pedido estará disponible dentro del horario.</small>}
        </div>
      )}

      <section className="menu">
        <div className="section-title">
          <span>SELECCIÓN</span>
          <h2>{categories.find(c=>c.id===active)?.name}</h2>
        </div>

        <div className="products">
          {visible.map(p => (
            <article className="product" key={p.id}>
              <div>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
              </div>
              <div className="product-action">
                {p.variants ? (
                  <button className="choose" onClick={()=>setSelected(p)}>Elegir <span>→</span></button>
                ) : p.price != null ? (
                  <>
                    <strong>{money(p.price)}</strong>
                    <button className="plus" onClick={()=>add(p)}>+</button>
                  </>
                ) : (
                  <small className="pending">Precio pendiente</small>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {cart.length > 0 && (
        <button className="cart-bar" onClick={()=>document.getElementById("cart").showModal()}>
          <span>🛒 {units} {units===1?"producto":"productos"}</span>
          <strong>{money(total)} →</strong>
        </button>
      )}

      <dialog id="cart" className="dialog">
        <div className="dialog-head"><h2>Tu pedido</h2><button onClick={()=>document.getElementById("cart").close()}>×</button></div>
        <div className="cart-list">
          {cart.map(x=>(
            <div className="cart-row" key={x.id}>
              <div><strong>{x.product.name}</strong><small>{x.variant?.name || ""}</small></div>
              <div><strong>{money(x.price*x.qty)}</strong><button onClick={()=>remove(x.id)}>×</button></div>
            </div>
          ))}
        </div>
        <div className="total"><span>Total</span><strong>{money(total)}</strong></div>
        <button className="order" onClick={sendWhatsApp}>ENVIAR PEDIDO POR WHATSAPP</button>
      </dialog>

      {selected && (
        <dialog open className="dialog">
          <div className="dialog-head"><h2>{selected.name}</h2><button onClick={()=>setSelected(null)}>×</button></div>
          <p className="modal-description">{selected.description}</p>
          <div className="variants">
            {selected.variants.map(v=>(
              <button key={v.name} onClick={()=>{add(selected,v);setSelected(null)}}><span>{v.name}</span><strong>{money(v.price)}</strong></button>
            ))}
          </div>
        </dialog>
      )}
    </main>
  );
}