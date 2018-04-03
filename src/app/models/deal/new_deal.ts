import {Client} from '../clients/client';

export class NewDeal {
  company: number;
  payment_type: number;
  description: string;
  address: string;
  address_comment: string;
  clients: any[] = [];

  constructor(company: number, payment: number, description: string,
              address: string, addressComment: string, clients: Client[]) {
    this.company = company;
    this.payment_type = payment;
    this.addDescription(description);
    this.checkAddress(address);
    this.addressComment(addressComment);
    for (const client of clients) {
      this.clients.push({client: client.id});
    }
  }

  private checkAddress(address: string) {
    if (address === '') {
      this.address = null;
    } else {
      this.address = address;
    }
  }

  private addDescription(description: string) {
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
