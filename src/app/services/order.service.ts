import {HttpClient} from '@angular/common/http';

export class OrderService {

  constructor(private http: HttpClient) {
  }

  getOrders() {
    /*
 http
   .get<>('/data.json', {observe: 'response'})
   .subscribe(resp => {
     // Here, resp is of type HttpResponse<MyJsonData>.
     // You can inspect its headers:
     console.log(resp.headers.get('X-Custom-Header'));
     // And access the body directly, which is typed as MyJsonData as requested.
     console.log(resp.body.someField);
   });*/
  }


}
