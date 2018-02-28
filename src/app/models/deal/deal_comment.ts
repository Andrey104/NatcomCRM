import {User} from '../user';

export class DealComment {
  id: number;
  user: User;
  auto_date: string;
  date: string;
  text: string;
  read: boolean;
}
