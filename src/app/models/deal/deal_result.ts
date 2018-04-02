import {DealAction} from './deal_action';
import {DealMeasurement} from './deal_measurement';
import {Company} from '../company';
import {User} from '../user';
import {DealMount} from './deal_mount';
import {Payment} from '../payment';
import {DealDiscount} from './deal_discount';
import {ClientsList} from '../clients/clients-list';

export class DealResult {
  id: number;
  clients: ClientsList[];
  measurements: DealMeasurement[];
  description: string;
  mounts: DealMount[];
  discounts: DealDiscount[];
  comments: object[];
  payments: Payment[];
  order_actions: DealAction[];
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
  payment_type: number;
  order: number;
  company: Company;
  worker: object;
}
