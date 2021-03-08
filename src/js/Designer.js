import { Worker } from './Worker.js';
export class Designer extends Worker {
  constructor(worker, role) {
    super(worker);
    this.salary += 300;
    this.role = 'Designer';
  }
}
