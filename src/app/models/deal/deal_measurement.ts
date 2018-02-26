import {Worker} from '../worker';

export class DealMeasurement {
  id: number;
  pictures: object;
  clients: object;
  actions: object;
  transfers: object;
  address: string;
  address_comment: string;
  company: object;
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
