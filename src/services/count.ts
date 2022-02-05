import { Transaction } from "../models";

export class Counter {
  private readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name
  }

  callModel(): Promise<number> {
    // verify model
    return Transaction.count();
  }
}

export default new Counter("default");
