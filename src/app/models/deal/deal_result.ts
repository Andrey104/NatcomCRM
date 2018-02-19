import {DealAction} from './deal_action';
import {DealMeasurement} from './deal_measurement';
import {Company} from '../company';
import { DealComment } from './deal_comment';

export class DealResult {
  id: number;
  clients: object; // add clacc
  measurments: DealMeasurement[];
  mounts: object;
  discounts: object;
  comments: object;
  payments: object; // !!!!!
  order_action: object; // !!!!!!!!!!!!!!!!!!!!add class
  actions: DealAction[];
  user: object;
  offer: string;
  sum: number;
  status: number;
  address_comment: string;
  address: string;
  auto_date: string;
  contract: boolean;
  task_date: string;
  non_cash: boolean;
  order: number;
  company: Company; // NO
  worker: object; // !!!!!!!
}
