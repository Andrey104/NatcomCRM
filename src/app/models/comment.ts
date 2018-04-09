import {User} from './user';

export class OurComment {
  id: number;
  user: User;
  auto_date: string;
  comment_type: number;
  text: string;
  file: string;
}
