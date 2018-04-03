import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {log} from 'util';
import {BrigadesService} from '../../../../services/brigades.service';
import {Brigade} from '../../../../models/brigades/brigade';

@Component({
  selector: 'app-brigade-list',
  templateUrl: './brigade-list.component.html',
  styleUrls: ['./brigade-list.component.css']
})
export class BrigadeListComponent implements OnInit {
  brigades: Brigade[];
  constructor(private brigadeService: BrigadesService) {
  }
  @Input() open;
  @Output() onClose = new EventEmitter<Brigade>();

  ngOnInit() {
    this.show();
  }
  show() {
    this.load(null);
  }
  close(brigade?: Brigade) {
    this.onClose.emit(brigade);
  }
  load(page?: number): void {
    if (page == null) {
      page = 1;
      this.brigadeService.getBrigades()
        .subscribe(brigades => {
          this.brigades = brigades.results;
          if (brigades.next != null) {
            this.load(page + 1);
          }
        }, error2 => {
          log(error2);
        });
    } else {
      this.brigadeService.getBrigades(page.toString())
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
}
