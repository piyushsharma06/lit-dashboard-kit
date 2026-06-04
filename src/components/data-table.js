import { LitElement, html, css } from 'lit';

/**
 * DataTable — sortable, paginated data table component
 * @prop {Array}  columns - [{ key, label, sortable }]
 * @prop {Array}  rows    - Array of row objects
 * @prop {number} pageSize - Rows per page (default 5)
 */
export class DataTable extends LitElement {
  static properties = {
    columns:  { type: Array },
    rows:     { type: Array },
    pageSize: { type: Number },
    _page:    { type: Number, state: true },
    _sortKey: { type: String, state: true },
    _sortDir: { type: String, state: true },
  };

  static styles = css`
    :host { display: block; font-family: 'Inter', 'Segoe UI', sans-serif; }
    .wrapper {
      border: 1px solid var(--border-color, #e5e7eb);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: var(--card-bg, #fff);
    }
    thead { background: var(--table-head-bg, #f9fafb); }
    th {
      padding: 12px 16px;
      text-align: left;
      font-size: 12px;
      font-weight: 600;
      color: var(--text-muted, #6b7280);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid var(--border-color, #e5e7eb);
      user-select: none;
    }
    th.sortable { cursor: pointer; }
    th.sortable:hover { color: var(--accent, #6366f1); }
    td {
      padding: 14px 16px;
      font-size: 14px;
      color: var(--text-primary, #374151);
      border-bottom: 1px solid var(--border-color, #f3f4f6);
    }
    tr:last-child td { border-bottom: none; }
    tr:hover td { background: var(--row-hover, #f9fafb); }
    .badge {
      display: inline-block;
      padding: 2px 10px;
      border-radius: 99px;
      font-size: 12px;
      font-weight: 500;
    }
    .badge.success { background: #d1fae5; color: #065f46; }
    .badge.warning { background: #fef3c7; color: #92400e; }
    .badge.danger  { background: #fee2e2; color: #991b1b; }
    .pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: var(--card-bg, #fff);
      border-top: 1px solid var(--border-color, #e5e7eb);
      font-size: 13px;
      color: var(--text-muted, #6b7280);
    }
    .page-btns { display: flex; gap: 6px; }
    button {
      border: 1px solid var(--border-color, #e5e7eb);
      background: #fff;
      border-radius: 6px;
      padding: 4px 12px;
      cursor: pointer;
      font-size: 13px;
      color: var(--text-primary, #374151);
      transition: background 0.15s;
    }
    button:hover:not(:disabled) { background: var(--accent, #6366f1); color: #fff; border-color: var(--accent, #6366f1); }
    button:disabled { opacity: 0.4; cursor: not-allowed; }
  `;

  constructor() {
    super();
    this.columns  = [];
    this.rows     = [];
    this.pageSize = 5;
    this._page    = 0;
    this._sortKey = null;
    this._sortDir = 'asc';
  }

  _sort(key) {
    if (this._sortKey === key) {
      this._sortDir = this._sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this._sortKey = key;
      this._sortDir = 'asc';
    }
    this._page = 0;
  }

  get _sorted() {
    if (!this._sortKey) return [...this.rows];
    return [...this.rows].sort((a, b) => {
      const v1 = a[this._sortKey], v2 = b[this._sortKey];
      const cmp = v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
      return this._sortDir === 'asc' ? cmp : -cmp;
    });
  }

  get _paged() {
    const start = this._page * this.pageSize;
    return this._sorted.slice(start, start + this.pageSize);
  }

  get _totalPages() { return Math.ceil(this.rows.length / this.pageSize); }

  _renderCell(row, col) {
    const val = row[col.key];
    if (col.badge) {
      const cls = col.badge[val] || '';
      return html`<span class="badge ${cls}">${val}</span>`;
    }
    return html`${val}`;
  }

  render() {
    return html`
      <div class="wrapper">
        <table>
          <thead>
            <tr>
              ${this.columns.map(col => html`
                <th class="${col.sortable ? 'sortable' : ''}"
                    @click="${col.sortable ? () => this._sort(col.key) : null}">
                  ${col.label}
                  ${col.sortable && this._sortKey === col.key
                    ? html`<span>${this._sortDir === 'asc' ? ' ↑' : ' ↓'}</span>` : ''}
                </th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${this._paged.map(row => html`
              <tr>${this.columns.map(col => html`<td>${this._renderCell(row, col)}</td>`)}</tr>
            `)}
          </tbody>
        </table>
        <div class="pagination">
          <span>Showing ${this._page * this.pageSize + 1}–${Math.min((this._page + 1) * this.pageSize, this.rows.length)} of ${this.rows.length}</span>
          <div class="page-btns">
            <button ?disabled="${this._page === 0}" @click="${() => this._page--}">← Prev</button>
            <button ?disabled="${this._page >= this._totalPages - 1}" @click="${() => this._page++}">Next →</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('data-table', DataTable);
