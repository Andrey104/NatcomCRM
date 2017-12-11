import {Phone} from "./phone";

export class Client {
  id: number;
  fio: string;
  email: string;
  phones: Phone[];
}

/*"client": {
    "id": 1,
    "fio": "FIO",
    "email": "bas@gmail.com",
    "phones": [
      {
        "id": 1,
        "client": 1,
        "number": 911,
        "comment": "my phone"
      },
      {
        "id": 2,
        "client": 1,
        "number": 911,
        "comment": "my phone"
      }
    ]
  },*/
