import {Phone} from '../phone';
import {UserDeals} from '../deal/user_deals';

export class Client {
  id: number;
  fio: string;
  email: string;
  phones: Phone[];
  deals: UserDeals[];

  constructor(fio: string, email: string, phones: Phone[]) {
    this.fio = fio;
    this.checkEmail(email);
    this.phones = phones;
  }

  private checkEmail(email: string) {
    if (email === '') {
      this.email = null;
    } else {
      this.email = email;
    }
  }
}
