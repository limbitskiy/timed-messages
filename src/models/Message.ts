export class Message {
  public id: number;
  public text: string;
  public _createdAt: Date;

  constructor({ id, text }: { id: number; text: string }) {
    this.id = id;
    this.text = text;
    this._createdAt = new Date();
  }

  get createdAtDate() {
    return this._createdAt.toLocaleDateString("ru-RU");
  }

  get createdAtTime() {
    return this._createdAt.toLocaleTimeString("ru-RU");
  }
}
