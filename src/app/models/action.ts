import {User} from './user';

export class Action {
  id: number;
  user: User;
  type: number;
  cause: number;
  auto_date: string;
  comment: string;
  action: string;
}
