import {Client} from '../clients/client';

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
    this.addDescription(description);
    this.address = address;
    this.addressComment(addressComment);
    for (const client of clients) {
      this.clients.push({client: client.id});
    }
  }

  private addDescription(description: string) {
    console.log(description);
    if (description === '') {
      this.description = null;
    } else {
      this.description = description;
    }
  }

  private addressComment(addressComment: string) {
    if (addressComment === '') {
      this.address_comment = null;
    } else {
      this.address_comment = addressComment;
    }
  }
}
