const container = document.querySelector('.container');
const teamSize = 8;
const team = [];
class Person {
  constructor(user) { // surname, weight, height, age, dni, sex, role='Doesn´t have a role') {
    this.name = user.name.first;
    this.surname = user.name.last;
    this.age = user.dob.age;
    this.email = user.email;
    this.userName = user.login.username;
    this.userPass = user.login.password;
    this.phone = user.phone;
    this.location = { country: user.location.country, city: user.location.city, postCode: user.location.postcode };
    this.profilePic = user.picture.large;
  }
}

class Worker extends Person {
  constructor(person, salary) {
    super(person);
    this.salary = 1000;
  }
}

class Developer extends Worker {
  constructor(worker, role) {
    super(worker);
    this.salary += 500;
    this.role = 'Developer';
  }
}

class Designer extends Worker {
  constructor(worker, role) {
    super(worker);
    this.salary += 300;
    this.role = 'Designer';
  }
}

const createUser = () => {
  const newUser = fetch('https://randomuser.me/api/') // Se hace una petición al servidor
    .then((response) => response.json()) // Devuelve una promesa, que es una respuesta del sevidor a la que ejecutamos el método JSON para que procese
    .then((data) => {
      const user = data.results[0]; // Hay que quitar el rollo de developer porque el constructor de person se espera el data.results[0]
      return user;
    });
  return newUser;
};

const addDeveloperToTeam = (userData, team) => {
  const user = new Developer(userData);
  team.push(user);
  return user;
};

const addDesignerToTeam = (userData, team) => {
  const user = new Designer(userData);
  team.push(user);
  return user;
};

const printUser = (user) => {
  container.innerHTML += `
  <img class="picture" src="${user.profilePic}" alt="Picture of ${user.name}">
  <div class = "data">
      <div class="name">
      ${user.name} ${user.surname}
      </div>
      <div class="email">
      <i class="far fa-envelope"></i> ${user.email}
      </div>
      <div class="credentials">
      <i class="far fa-user"></i> ${user.userName} <i class="fas fa-key"></i> ${user.userPass}
      </div>
      <div class="age">
        <strong>Age</strong>: ${user.age}
      </div>
      <div class="phone">
      <i class="fas fa-phone"></i> ${user.phone}
      </div>
      <div class="country">
      <i class="fas fa-map-marker-alt"></i> ${user.location.country} <i class="fas fa-city"></i> ${user.location.city}  <i class="fas fa-mail-bulk"></i> ${user.location.postCode}
      </div>
      <div class="salary">
      <i class="fas fa-dollar-sign"></i> ${user.salary}
      </div>
      <div class="role">
      <i class="fas fa-network-wired"></i> ${user.role}
      </div>
     </div>
  `;
};

for (let i = 0; i < 4; i++) {
  createUser().then(data => {
    // console.log(data);
    if (i % 2 === 0) {
      const user = addDesignerToTeam(data, team);
      printUser(user);
    } else {
      const user = addDeveloperToTeam(data, team);
      printUser(user);
    }
  });
  /* fetch('https://randomuser.me/api/') // Se hace una petición al servidor
    .then((response) => response.json()) // Devuelve una promesa, que es una respuesta del sevidor a la que ejecutamos el método JSON para que procese
    .then((data) => {
      if (i % 2 === 0) {
        const user = addDeveloperToTeam(data.results[0], team);
        printUser(user);
      } else {
        const user = addDesignerToTeam(data.results[0], team);
        printUser(user);
      }
    }); */
}

console.log(team);
