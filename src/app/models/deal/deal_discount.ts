import {User} from '../user';

export class DealDiscount {
  id: number;
  user: User;
  before: string;
  after: string;
  comment: string;
  auto_date: string;
}
