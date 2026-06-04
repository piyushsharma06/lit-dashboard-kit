import { LitElement, html, css } from 'lit';

/**
 * StatCard — displays a KPI metric with trend indicator
 * @attr {string} label - Metric label
 * @attr {string} value - Metric value
 * @attr {string} trend - 'up' | 'down' | 'neutral'
 * @attr {string} delta - Change text e.g. "+12%"
 * @attr {string} icon - Emoji or symbol
 */
export class StatCard extends LitElement {
  static properties = {
    label: { type: String },
    value: { type: String },
    trend: { type: String },
    delta: { type: String },
    icon:  { type: String },
  };

  static styles = css`
    :host {
      display: block;
      font-family: 'Inter', 'Segoe UI', sans-serif;
    }
    .card {
      background: var(--card-bg, #ffffff);
      border: 1px solid var(--border-color, #e5e7eb);
      border-radius: 12px;
      padding: 20px 24px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
      transition: box-shadow 0.2s ease;
    }
    .card:hover {
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .label {
      font-size: 13px;
      font-weight: 500;
      color: var(--text-muted, #6b7280);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .icon {
      font-size: 20px;
      background: var(--icon-bg, #f3f4f6);
      border-radius: 8px;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .value {
      font-size: 28px;
      font-weight: 700;
      color: var(--text-primary, #111827);
      margin-bottom: 8px;
    }
    .delta {
      font-size: 13px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .delta.up   { color: #10b981; }
    .delta.down { color: #ef4444; }
    .delta.neutral { color: #6b7280; }
  `;

  get _arrow() {
    if (this.trend === 'up')   return '↑';
    if (this.trend === 'down') return '↓';
    return '→';
  }

  render() {
    return html`
      <div class="card">
        <div class="header">
          <span class="label">${this.label}</span>
          <span class="icon">${this.icon || '📊'}</span>
        </div>
        <div class="value">${this.value}</div>
        <div class="delta ${this.trend || 'neutral'}">
          ${this._arrow} ${this.delta || ''}
        </div>
      </div>
    `;
  }
}

customElements.define('stat-card', StatCard);
