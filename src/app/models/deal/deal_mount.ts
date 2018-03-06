import {Company} from '../company';
import {User} from '../user';

export class DealMount {
  id: number;
  actions: object;
  stages: object;
  comments: object;
  company: Company;
  date_mount: string;
  date: string;
  status: number;
  deal: number;
  user: User;
}
