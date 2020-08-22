export class Task {
  title: string;
  date: Date;
  ecd: Date;
  description: string;
  order: number;

  constructor(title?: string, date?: Date, ecd?: Date,
              description?: string, order?: number) {

    this.title = title;
    this.date = date;
    this.ecd = ecd;
    this.description = description;
    this.order = order;
  }
}
