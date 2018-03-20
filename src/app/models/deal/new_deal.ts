import {Client} from '../client';

export class NewDeal {
  company: number;
  payment: boolean;
  address: string;
  address_comment: string;
  clients: any[] = [];

  constructor(company: number, payment: boolean, address: string, addressComment: string, clients: Client[]) {
    this.company = company;
    this.payment = payment;
    this.address = address;
    this.address_comment = addressComment;
    for (const client of clients) {
      this.clients.push({client: client.id});
    }
  }
}
