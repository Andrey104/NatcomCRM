export class Phone {
  id: number;
  client: number;
  number: string;
  comment: string;

  constructor(number: string, comment: string) {
    this.number = number;
    this.checkComment(comment);
  }

  checkComment(comment) {
    if (comment !== null) {
      this.comment = comment;
    } else {
      this.comment = null;
    }
  }
}

