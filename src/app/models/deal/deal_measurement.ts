import {Worker} from '../worker';
import {Company} from '../company';
import {Client} from '../client';
import {Transfer} from '../transfer';
import {OurComment} from '../comment';

export class DealMeasurement {
  id: number;
  pictures: object;
  clients: Client[];
  actions: object;
  transfers: Transfer[];
  comments: OurComment[];
  address: string;
  address_comment: string;
  company: Company;
  non_cash: boolean;
  auto_date: string;
  date: string;
  status: number;
  time: string;
  sum: number;
  prepayment: number;
  worker: Worker;
  deal: number;
  color: number;
}
