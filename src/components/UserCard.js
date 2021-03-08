import { Developer } from '../js/Developer.js';
import { Designer } from '../js/Designer.js';

class UserCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  createUser() {
    const newUser = fetch('https://randomuser.me/api/') // Se hace una petición al servidor
      .then((response) => response.json()) // Devuelve una promesa, que es una respuesta del sevidor a la que ejecutamos el método JSON para que procese
      .then((data) => {
        const user = data.results[0]; // Hay que quitar el rollo de developer porque el constructor de person se espera el data.results[0]
        return user;
      });
    return newUser;
  }

  addDeveloperToTeam(userData, team) {
    const user = new Developer(userData);
    team.push(user);
    return user;
  }

  addDesignerToTeam(userData, team) {
    const user = new Designer(userData);
    team.push(user);
    return user;
  }

  get styles() {
    return `
    @import "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.2/css/all.min.css";
    :host {
      --card-width: 500px;
    
      background: linear-gradient(200deg, #f3f3f3, #cfcfcf);
      box-shadow: 5px 5px 5px rgba(0 0 0 / 50%);
      width: var(--card-width);
      display: grid;
      grid-template-columns: 175px 1fr;
      padding: 15px;
      margin: auto;
      border: 1px solid black;
    }
    
    .data {
      font-family: 'Montserrat', sans-serif;
      font-size: 1rem;
    }
    
    .data strong {
      font-weight: 700;
    }
    
    .picture {
      margin: 16px;
      border-radius: 50%;
      width: 128px;
      height: 128px;
    }
    
    .name {
      font-weight: 900;
      font-size: 1.75rem;
      margin-bottom: 10px;
    }
    
    .email {
      color: blueviolet;
    }
    
    .salary {
      color: green;
    }
    
    .role {
      color: hotpink;
    }
    
    .far,
    .fas {
      color: black;
    }
    `;
  }

  connectedCallback() {
    this.team = [];
    this.createUser().then(data => {
      this.user = this.addDesignerToTeam(data, this.team);
      this.render();
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <img class="picture" src="${this.user.profilePic}" alt="Picture of ${this.user.name}">
      <div class="data">
        <div class="name">
          ${this.user.name} ${this.user.surname}
        </div>
        <div class="email">
          <i class="far fa-envelope"></i> ${this.user.email}
        </div>
        <div class="credentials">
          <i class="far fa-user"></i> ${this.user.userName} <i class="fas fa-key"></i> ${this.user.userPass}
        </div>
        <div class="age">
          <strong>Age</strong>: ${this.user.age}
        </div>
        <div class="phone">
          <i class="fas fa-phone"></i> ${this.user.phone}
        </div>
        <div class="country">
          <i class="fas fa-map-marker-alt"></i> ${this.user.location.country} <i class="fas fa-city"></i> ${this.user.location.city} <i
            class="fas fa-mail-bulk"></i> ${this.user.location.postCode}
        </div>
        <div class="salary">
          <i class="fas fa-dollar-sign"></i> ${this.user.salary}
        </div>
        <div class="role">
          <i class="fas fa-network-wired"></i> ${this.user.role}
        </div>
      </div>`;
  }
}

customElements.define('user-card', UserCard);
