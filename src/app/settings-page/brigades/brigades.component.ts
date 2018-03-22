import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {log} from 'util';
import {Brigade} from '../../models/brigades/brigade';
import {BrigadesService} from '../../services/brigades.service';

@Component({
  selector: 'app-brigades',
  templateUrl: './brigades.component.html',
  styleUrls: ['../settings-page.component.css']
})
export class BrigadesComponent implements OnInit {
  brigades: Object[];
  modalState: { open: Boolean, brigade?: Brigade } = {open: false, brigade: null};
  modal: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  constructor(private brigadesService: BrigadesService) {
  }
  ngOnInit() {
    this.show();
  }
  show() {
    this.load(null);
  }

  load(page?: number): void {
    if (page == null) {
      page = 1;
      this.brigadesService.getBrigades()
        .subscribe(brigades => {
          this.brigades = brigades.results;
          if (brigades.next != null) {
            this.load(page + 1);
          }
        }, error2 => {
          log(error2);
        });
    } else {
      this.brigadesService.getBrigades(page.toString())
        .subscribe(brigades => {
          this.brigades = this.brigades.concat(brigades.results);
          if (brigades.next != null) {
            this.load(page + 1);
          }
        }, error2 => {
          log(error2);
        });
    }
  }

  openModal(brigade?: Brigade) {
    if (brigade === null) {
      this.modalState = {open: true, brigade: null};
      this.modal.next(true);
    } else {
      this.modalState = {open: true, brigade: brigade};
      this.modal.next(true);
    }
  }

  modalClose(successfully) {
    if (successfully) {
      this.show();
    }
    this.modalState.open = false;
    this.modal.next(false);
  }

}
