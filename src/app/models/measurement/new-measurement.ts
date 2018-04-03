export class NewMeasurement {
  payment_type: number;
  date: string;
  time: string;
  description: string;

  constructor(payment_type: number, date: string, time: string, description: string) {
    this.payment_type = payment_type;
    this.date = date;
    this.checkTime(time);
    this.checkDescription(description);
  }

  private checkTime(time: string) {
    if (time === '') {
      this.time = null;
    } else {
      this.time = time;
    }
  }

  private checkDescription(description: string) {
    if (description === '') {
      this.description = null;
    } else {
      this.description = description;
    }
  }
}
