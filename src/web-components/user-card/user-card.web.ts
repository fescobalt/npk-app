class UserCard extends HTMLElement {
  static get observedAttributes() {
    return ['info', 'type'];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        :host([type='quotes']) .card {
          border: 2px dotted orange;
        }
        :host([type="todos"]) .card {
          border: 2px dotted lightblue;
        }
        .card {
          margin: 0.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          padding: 1rem;
          background: var(--bg);
          // border: 1px solid var(--text);
          min-width: 240px;
          max-width: 500px;
        }
        .info {
          border-radius: 4px;
          padding: 0.5rem;
          background: var(--text);
          color: var(--bg);
        }
      </style>
      <div class="card">
        <div class="info">
        </div>
      </div>
    `;
    this.updateFields();
  }

  attributeChangedCallback() {
    this.updateFields();
  }

  connectedCallback() {
    this.updateFields();
  }

  updateFields() {
    const shadow = this.shadowRoot;
    const info = shadow?.querySelector('.info') as HTMLElement;
    
    info.textContent = this.getAttribute('info') ?? '';
  }
}

export function defineComponent() {
  customElements.define('user-card', UserCard);
}