import {Picture} from '../picture';
import {Client} from '../client';
import {Action} from '../action';
import {Transfer} from '../transfer';
import {OurComment} from '../comment';
import {Company} from '../company';
import {Worker} from '../worker';

export class MeasurementResult {
  id: number;
  pictures: Picture[];
  clients: Client[];
  actions: Action[];
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
  sum: string;
  prepayment: string;
  worker: Worker;
  deal: number;
  color: number;
}