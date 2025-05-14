// interface ItemWithId {
//   id: number;
//   [prop: string]: any;
// }

export class LoopHandler {
  private queue: number[] = [];
  private current: number;

  constructor() {}

  add(id: number) {
    this.queue.push(id);
  }

  remove(idToRemove: number) {
    this.queue = this.queue.filter((id) => id !== idToRemove);
  }

  start() {
    if (!this.queue.length) {
      console.error(`No items in queue`);
      return;
    }
    this.current = this.queue[0];
  }

  next() {
    const nextItem = this.queue[this.current + 1];

    if (nextItem) {
      this.current = this.current + 1;
      return nextItem;
    } else {
      this.current = 0;
      return this.queue[0];
    }
  }
}
