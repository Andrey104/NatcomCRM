import {Company} from '../company';
import {User} from '../user';
import {OurComment} from '../comment';

export class DealMount {
  id: number;
  actions: object;
  stages: object;
  comments: OurComment[];
  company: Company;
  date_mount: string;
  date: string;
  status: number;
  deal: number;
  user: User;
}
