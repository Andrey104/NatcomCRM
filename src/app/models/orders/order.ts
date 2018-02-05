import {Client} from "../client";
import {OrderAction} from "./order_action";
import {OrderResult} from "./order_result";

export class Orders {
  results: OrderResult[];
  next: string;
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
}

 {
            "id": 31,
            "auto_date": "2017-12-18T14:13:26.291444Z",
            "status": 0,
            "comment": "order comment",
            "info": "information",
            "source": "Natcom",
            "fio": "FIO",
            "phone": "453543",
            "email": "bas@gmail.com",
            "client": {
                "id": 3,
                "fio": "",
                "email": null,
                "phones": [
                    {
                        "id": 5,
                        "client": 3,
                        "number": "453543",
                        "comment": null
                    }
                ]
            },
            "company": {
                "id": 1,
                "name": "Натком",
                "symbol": "Н"
            },
            "actions": []
        },*/
