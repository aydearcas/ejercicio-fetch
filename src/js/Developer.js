import { Worker } from './Worker.js';
export class Developer extends Worker {
  constructor(worker, role) {
    super(worker);
    this.salary += 500;
    this.role = 'Developer';
  }
}
