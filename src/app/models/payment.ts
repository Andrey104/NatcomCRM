import {User} from './user';

export class Payment {
  id: number;
  user: User;
  auto_date: string;
  date: string;
  sum: string;
  payment_type: number;
  receiver: string;
  comment: string;
}
