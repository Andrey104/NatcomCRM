import {User} from '../user';

export class DealDiscount {
  id: number;
  user: User;
  before: number;
  after: number;
  comment: string;
  auto_date: string;
}
