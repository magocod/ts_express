export class CounterService {
  constructor(private count = 0) {}

  increment(): number {
    this.count++;
    return this.count;
  }

  decrement(): number {
    this.count--;
    return this.count;
  }

  getCount(): number {
    return this.count;
  }
}

export const counterService = new CounterService();
