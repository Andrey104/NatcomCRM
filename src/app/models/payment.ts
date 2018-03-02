import {User} from './user';

export class Payment {
  id: number;
  user: User;
  auto_date: string;
  date: string;
  sum: string;
  non_cash: boolean;
  receiver: string;
  comment: string;
}
