import { LitElement, html, css } from 'lit';

/**
 * SidebarNav — collapsible navigation sidebar
 * @prop {Array}  items   - [{ icon, label, href, active, badge }]
 * @prop {string} brand   - App/brand name
 * @attr {boolean} collapsed - Collapsed state
 */
export class SidebarNav extends LitElement {
  static properties = {
    items:     { type: Array },
    brand:     { type: String },
    collapsed: { type: Boolean, reflect: true },
  };

  static styles = css`
    :host { display: block; font-family: 'Inter', 'Segoe UI', sans-serif; }
    nav {
      background: var(--sidebar-bg, #1e1b4b);
      color: #fff;
      height: 100vh;
      width: var(--sidebar-width, 240px);
      display: flex;
      flex-direction: column;
      transition: width 0.25s ease;
      overflow: hidden;
    }
    :host([collapsed]) nav { width: 64px; }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 20px 16px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      font-size: 16px;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
    }
    .brand-icon {
      min-width: 32px; height: 32px;
      background: var(--accent, #6366f1);
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      font-size: 16px;
    }
    .brand-text { opacity: 1; transition: opacity 0.2s; }
    :host([collapsed]) .brand-text { opacity: 0; }
    .menu { flex: 1; padding: 12px 8px; overflow-y: auto; }
    .menu-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 8px;
      cursor: pointer;
      text-decoration: none;
      color: rgba(255,255,255,0.65);
      font-size: 14px;
      font-weight: 500;
      transition: background 0.15s, color 0.15s;
      white-space: nowrap;
      overflow: hidden;
      position: relative;
      margin-bottom: 2px;
    }
    .menu-item:hover { background: rgba(255,255,255,0.08); color: #fff; }
    .menu-item.active { background: var(--accent, #6366f1); color: #fff; }
    .item-icon { min-width: 20px; font-size: 18px; text-align: center; }
    .item-label { transition: opacity 0.2s; }
    :host([collapsed]) .item-label { opacity: 0; }
    .badge {
      margin-left: auto;
      background: #ef4444;
      color: #fff;
      font-size: 11px;
      font-weight: 600;
      padding: 1px 7px;
      border-radius: 99px;
      transition: opacity 0.2s;
    }
    :host([collapsed]) .badge { opacity: 0; }
    .toggle-btn {
      margin: 8px;
      padding: 10px;
      border: none;
      background: rgba(255,255,255,0.06);
      color: rgba(255,255,255,0.7);
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      transition: background 0.15s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .toggle-btn:hover { background: rgba(255,255,255,0.12); color: #fff; }
  `;

  constructor() {
    super();
    this.items = [];
    this.brand = 'Dashboard';
    this.collapsed = false;
  }

  _toggle() { this.collapsed = !this.collapsed; }

  render() {
    return html`
      <nav>
        <div class="brand">
          <div class="brand-icon">⚡</div>
          <span class="brand-text">${this.brand}</span>
        </div>
        <div class="menu">
          ${this.items.map(item => html`
            <a class="menu-item ${item.active ? 'active' : ''}" href="${item.href || '#'}">
              <span class="item-icon">${item.icon}</span>
              <span class="item-label">${item.label}</span>
              ${item.badge ? html`<span class="badge">${item.badge}</span>` : ''}
            </a>
          `)}
        </div>
        <button class="toggle-btn" @click="${this._toggle}">
          ${this.collapsed ? '→' : '←'}
        </button>
      </nav>
    `;
  }
}

customElements.define('sidebar-nav', SidebarNav);
