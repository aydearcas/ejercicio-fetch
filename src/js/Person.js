export class Person {
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
