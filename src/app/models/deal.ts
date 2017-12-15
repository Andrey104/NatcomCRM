import {Client} from "./client";
import {OrderAction} from "./order_action";

export class Deal {
  id: number;
  auto_date: string;
  status: number;
  comment: string;
  info: string;
  source: string;
  company: object;
  fio: string;
  phone: string;
  email: string;
  client: Client;
  actions: OrderAction[];
}
