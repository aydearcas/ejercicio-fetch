import { Person } from './Person.js';
export class Worker extends Person {
  constructor(person, salary) {
    super(person);
    this.salary = 1000;
  }
}
