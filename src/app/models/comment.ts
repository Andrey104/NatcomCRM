import {User} from './user';

export class OurComment {
  id: number;
  user: User;
  auto_date: string;
  text: string;
  read: boolean;
}
