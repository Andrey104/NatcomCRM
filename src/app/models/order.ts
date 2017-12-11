import {Client} from "./client";
import {OrderAction} from "./order_action";

export class Order {
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



/*{
  "id": 1,
  "auto_date": "2017-01-01T00:00",
  "status": 1,
  "comment": "order comment",
  "info": "information",
  "source": "Natcom",
  "company": 1,
  "fio": "FIO",
  "phone": 911,
  "email": "bas@gmail.com",
  "client": {
    "id": 1,
    "fio": "FIO",
    "email": "bas@gmail.com",
    "phones": [
      {
        "id": 1,
        "client": 1,
        "number": 911,
        "comment": "my phone"
      }
    ]
  },
  "actions": [
    {
      "id": 1,
      "user": "admin",
      "type": 1,
      "cause": 1,
      "comment": "action",
      "order": 1
    }
  ]
}*/
