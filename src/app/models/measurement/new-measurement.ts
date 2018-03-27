export class NewMeasurement {
  non_cash: boolean;
  date: string;
  time: string;
  description: string;

  constructor(non_cash: number, date: string, time: string, description: string) {
    this.checkNonCash(non_cash);
    this.date = date;
    this.checkTime(time);
    this.checkDescription(description);
  }

  private checkNonCash(non_cash) {
    // проверить при пустом поле
    if (non_cash === '') {
      this.non_cash = null;
    } else {
      this.non_cash = non_cash;
    }
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
