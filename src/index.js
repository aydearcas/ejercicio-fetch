const container = document.querySelector('.container'); // Se hace referencia al div class='container' del html
fetch('https://randomuser.me/api/') // Se hace una petición al servidor
  .then((response) => response.json()) // Devuelve una promesa, que es una respuesta del sevidor a la que ejecutamos el método JSON para que procese
  .then((data) => {
    const user = data.results[0];
    container.innerHTML = `
      <img class="picture" src="${user.picture.large}" alt="Picture of ${user.name.first}">
      <div class = "data">
        <div class="name">
        ${user.name.title} ${user.name.first} ${user.name.last}
        </div>
        <div class="email">
        <i class="far fa-envelope"></i> ${user.email}
        </div>
        <div class="credentials">
        <i class="far fa-user"></i> ${user.login.username} <i class="fas fa-key"></i> ${user.login.password}
        </div>
        <div class="age">
          <strong>Age</strong>: ${user.dob.age}
        </div>
        <div class="phone">
        <i class="fas fa-phone"></i> ${user.phone}
        </div>
        <div class="country">
        <i class="fas fa-map-marker-alt"></i> ${user.location.country} <strong>City</strong>: ${user.location.city}  <strong>Postalcodeeeeeeeee</strong>: ${user.location.postcode}
        </div>
       </div> 
    `;
    console.log(user);
  }); // Obtenemos los datos de la promesa que nos envía el response.json()
