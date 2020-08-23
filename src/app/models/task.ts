export class Task {
  title: string;
  date: Date;
  ecd: Date;
  description: string;
  order: number;
  status: string;

  constructor(title?: string, date?: Date, ecd?: Date,
              description?: string, order?: number, staus?: string) {

    this.title = title;
    this.date = date;
    this.ecd = ecd;
    this.description = description;
    this.order = order;
    this.status = staus;
  }
}
