export class Task {
  name = 'new task';
  date = new Date();

  constructor(name: string, date: Date) {
    this.name = name;
    this.date = date;
  }
}
