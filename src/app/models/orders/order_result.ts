import {Client} from '../client';
import {OrderAction} from './order_action';
import {Company} from '../company';

export class OrderResult {
  id: number;
  auto_date: string;
  task_date: string;
  status: number;
  comment: string;
  info: string;
  source: string;
  company: Company;
  fio: string;
  phone: string;
  email: string;
  client: Client;
  actions: OrderAction[];
}
