import {stringDistance} from 'codelyzer/util/utils';

export class Phone {
 id: number;
 client: number;
 number: string;
 comment: string;

 constructor(number: string, comment: string) {
    this.number = number;
    this.comment = comment;
 }
}

/*"phones": [
      {
        "id": 1,
        "client": 1,
        "number": 911,
        "comment": "my phone"
      }
    ]*/
