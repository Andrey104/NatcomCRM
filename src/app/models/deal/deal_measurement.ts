import {Worker} from '../worker';
import {Company} from '../company';
import {Transfer} from '../transfer';
import {OurComment} from '../comment';
import {Picture} from '../picture';
import {User} from '../user';
import {ClientsList} from '../clients/clients-list';


export class DealMeasurement {
  id: number;
  deal_user: User;
  reject_id: number;
  pictures: Picture[];
  clients: ClientsList[];
  actions: object;
  transfers: Transfer[];
  comments: OurComment[];
  address: string;
  address_comment: string;
  company: Company;
  payment_type: number;
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
  worker_reject_cause: number;
  manager_reject_cause: number;
}
