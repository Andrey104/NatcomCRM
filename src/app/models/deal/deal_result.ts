import {DealAction} from './deal_action';
import {DealMeasurement} from './deal_measurement';

export class DealResult {
  id: number;
  sum: number;
  status: number;
  address_comment: string;
  address: string;
  auto_date: string;
  contract: boolean;
  task_date: string;
  order: object; //!!!!!!!!!!!!!!!!!!!!add class
  user: number;
  company: object; //NO
  worker: string; //!!!!!!!
  clients: object; //WTF!!!!!!!!!!!!!!!!!!!!!!!!!!!
  payments: object; //!!!!!
  measurments: DealMeasurement[];
  mounts: object;
  comments: object;
  discussions: object;
  actions: DealAction[];
  discounts: object;
}
