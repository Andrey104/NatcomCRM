import {User} from '../user';

export class OrderAction {
  id: number;
  user: User;
  type: number;
  cause: number;
  comment: string;
  order: number;
  auto_date: string;
}

/*"actions": [
    {
      "id": 1,
      "user": "admin",
      "type": 1,
      "cause": 1,
      "comment": "action",
      "order": 1
    }
  ]*/
