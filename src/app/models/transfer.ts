import {User} from './user';

export class Transfer {
  id: number;
  user: User;
  cause: number;
  new_date: string;
  old_date: string;
  auto_date: string;
  comment: string;
}
