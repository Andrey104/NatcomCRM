import {Worker} from '../worker';
import {Company} from '../company';
import {Client} from '../client';
import {Transfer} from '../transfer';
import {OurComment} from '../comment';
import {Picture} from '../picture';
import {User} from '../user';

export class DealMeasurement {
  id: number;
  deal_user: User;
  reject_id: number;
  pictures: Picture[];
  clients: Client[];
  actions: object;
  transfers: Transfer[];
  comments: OurComment[];
  address: string;
  address_comment: string;
  company: Company;
  non_cash: boolean;
  auto_date: string;
  description: string;
  date: string;
  status: number;
  time: string;
  sum: number;
  prepayment: number;
  worker: Worker;
  deal: number;
  color: number;
}
