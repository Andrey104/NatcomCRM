import {DealAction} from './deal_action';
import {DealMeasurement} from './deal_measurement';
import {Company} from '../company';
import {User} from '../user';
import {DealMount} from './deal_mount';
import {Payment} from '../payment';
import {DealDiscount} from './deal_discount';

export class DealResult {
  id: number;
  clients: object; // add class
  measurements: DealMeasurement[];
  description: string;
  mounts: DealMount[];
  discounts: DealDiscount[];
  comments: object[];
  payments: Payment[];
  order_actions: DealAction[]; // !!!!!!!!!!!!!!!!!!!!add class
  actions: DealAction[];
  user: User;
  offer: string;
  sum: number;
  status: number;
  address_comment: string;
  address: string;
  auto_date: string;
  auto_change_date: string;
  contract: boolean;
  task_date: string;
  non_cash: boolean;
  order: number;
  company: Company; // NO
  worker: object; // !!!!!!!
}
