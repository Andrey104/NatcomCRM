import {Client} from '../client';

export class NewDeal {
  company: number;
  payment: boolean;
  description: string;
  address: string;
  address_comment: string;
  clients: any[] = [];

  constructor(company: number, payment: boolean, description: string,
              address: string, addressComment: string, clients: Client[]) {
    this.company = company;
    this.payment = payment;
    this.description = description;
    this.address = address;
    this.address_comment = addressComment;
    for (const client of clients) {
      this.clients.push({client: client.id});
    }
  }
}
