// pokemon-search.js

class PokemonSearch extends HTMLElement {
  constructor() {
    super();

    // Attach a shadow DOM tree to this instance
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['title', 'label', 'placeholder', 'button-text'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Re-render the component when an attribute changes
    this.render();
  }

  connectedCallback() {
    // Initialize the component
    this.render();
    this.addEventListeners();
  }

  render() {
    // Clear any existing content
    this.shadowRoot.innerHTML = '';

    // Create a template
    const template = document.createElement('template');

    template.innerHTML = `
      <style>
        /* Embedded styles */
        .search-container {
          max-width: 400px;
          margin: 0 auto;
          font-family: Arial, sans-serif;
        }

        .search-container h2 {
          text-align: center;
          color: var(--title-color, #333);
        }

        .search-form {
          display: flex;
          flex-direction: column;
        }

        .search-form label {
          margin-bottom: 5px;
          font-weight: bold;
        }

        .search-form input {
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .search-form button {
          padding: 10px;
          background-color: var(--button-bg-color, #007bff);
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .search-form button:hover {
          background-color: var(--button-hover-bg-color, #0056b3);
        }

        .result {
          margin-top: 20px;
        }

        .alert {
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 10px;
        }

        .alert-success {
          background-color: #d4edda;
          color: #155724;
        }

        .alert-error {
          background-color: #f8d7da;
          color: #721c24;
        }

        .card {
          padding: 15px;
          border: 1px solid #ccc;
          border-radius: 4px;
          text-align: center;
        }

        .card img {
          max-width: 100%;
          height: auto;
        }

        .card h3 {
          margin-top: 10px;
          text-transform: capitalize;
        }

        .card p {
          margin: 5px 0;
        }
      </style>

      <div class="search-container">
        <h2>${this.getAttribute('title') || 'Pokémon Search'}</h2>
        <form class="search-form">
          <label for="search-input">${this.getAttribute('label') || 'Enter Pokémon Name or ID'}</label>
          <input type="text" id="search-input" placeholder="${this.getAttribute('placeholder') || 'e.g., pikachu'}" required>
          <button type="submit">${this.getAttribute('button-text') || 'Search'}</button>
        </form>
        <div class="result" id="result"></div>
      </div>
    `;

    // Attach the template content to the shadow DOM
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  addEventListeners() {
    const form = this.shadowRoot.querySelector('.search-form');
    const input = this.shadowRoot.getElementById('search-input');
    const resultDiv = this.shadowRoot.getElementById('result');

    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent form from submitting

      // Get the input value
      const query = input.value.trim().toLowerCase();

      // Clear previous results
      resultDiv.innerHTML = '';

      // Validate input
      if (query === '') {
        this.showMessage('Please enter a valid Pokémon name or ID.', 'error');
        return;
      }

      // Show loading message
      this.showMessage('Loading...', 'success');

      // Fetch data from the PokéAPI
      try {
        const data = await this.fetchData(query);

        // Display the data
        this.displayResult(data);
      } catch (error) {
        this.showMessage(error.message, 'error');
      }
    });
  }

  async fetchData(query) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error('Pokémon not found.');
    }

    const data = await response.json();
    return data;
  }

  displayResult(data) {
    const resultDiv = this.shadowRoot.getElementById('result');

    // Clear previous messages
    resultDiv.innerHTML = '';

    const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');

    const content = `
      <div class="card">
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <h3>${data.name}</h3>
        <p><strong>ID:</strong> ${data.id}</p>
        <p><strong>Type:</strong> ${types}</p>
        <p><strong>Height:</strong> ${data.height}</p>
        <p><strong>Weight:</strong> ${data.weight}</p>
      </div>
    `;

    resultDiv.innerHTML = content;
  }

  showMessage(message, type) {
    const resultDiv = this.shadowRoot.getElementById('result');

    const messageDiv = document.createElement('div');
    messageDiv.className = `alert ${type === 'error' ? 'alert-error' : 'alert-success'}`;
    messageDiv.textContent = message;

    // Clear previous messages
    resultDiv.innerHTML = '';
    resultDiv.appendChild(messageDiv);
  }
}

customElements.define('pokemon-search', PokemonSearch);

