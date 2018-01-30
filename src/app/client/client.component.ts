import {Component, Input, OnInit} from '@angular/core';
import {UtilsService} from "../services/utils.service";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() client;
  @Input() lastPage;


  nameFormat(name: String){
    if (name === null){
      name = "Нет имени";
    }
    if (name === ""){
      name = "Нет имени";
    }
    return name;
  }



}
